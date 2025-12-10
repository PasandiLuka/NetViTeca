# Configuracion backend 

Este documento describe toda la configuración del backend de NetViTeca, incluyendo entorno, `appsettings`, base de datos, migraciones automáticas, seed, CORS, JSON, registro de capas, host, Swagger y ejecución general.
La idea es que este archivo reemplace a otros documentos separados: Program, Startup, Configuración de Migraciones, Configuración CORS, etc.

---

# 1. AppSettings y configuración externa

El backend utiliza `appsettings.json` como archivo de configuración central, donde se definen:

###  Logging

Control de nivel de logs para ASP.NET Core (`Information`, `Warning`, etc.).

###  AllowedHosts

Define qué hosts pueden acceder al backend (por defecto `*`).

###  ConnectionStrings

Cadena MySQL para EF Core:

```json
"ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=NetViTecaDB;Uid=root;Pwd=Darkops(1011);"
}
```

> Importante: el backend usa `ServerVersion.AutoDetect()` para detectar automáticamente la versión de MySQL y evitar configuraciones manuales.

---

# 2. Configuración central en Program.cs

Toda la configuración está en *Program.cs* debido al enfoque Minimal API.

A continuación se documentan todos los componentes en orden.

---

# 3. Configuración JSON — evitar ciclos

```csharp
builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(options =>
{
    options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
```

Esto evita errores cuando EF Core devuelve entidades con referencias cíclicas (por ejemplo, `Libro → Genero → Libros`).

Efecto: evita el clásico error *"A possible object cycle was detected"*.

---

# 4. Configuración CORS (Frontend ↔ Backend)

Se define una única política:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
```

* Origen permitido: frontend Vite
* Permite: cualquier header + método
* Se aplica dos veces (antes de endpoints y antes de HTTPS): `app.UseCors("PermitirFrontend")`

Esto asegura que Vite pueda comunicarse correctamente con el backend durante desarrollo.

---

# 5. Swagger / OpenAPI

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

Swagger solo se habilita en desarrollo:

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

---

# 6. Base de Datos — DbContext y MySQL

```csharp
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var serverVersion = ServerVersion.AutoDetect(connectionString);

builder.Services.AddDbContext<NetViTecaDbContext>(
    options => options.UseMySql(connectionString, serverVersion)
);
```

Esto habilita:

* Conexión MySQL
* Detección automática de versión
* Integración con EF Core

El contexto se crea desde `NetViTecaDbContext` (capas `Data` + `Persistencia`).

---

# 7. Inyección de dependencias — Repositorios

```csharp
builder.Services.AddScoped<IRepoBiblioteca, RepoBiblioteca>();
builder.Services.AddScoped<IRepoGenero, RepoGenero>();
builder.Services.AddScoped<IRepoLibro, RepoLibro>();
builder.Services.AddScoped<IRepoUsuario, RepoUsuario>();
```

Los repositorios representan la capa Data/Repositorios, encargada de acceso a base de datos.

---

# 8. Inyección de dependencias — Servicios (Core)

```csharp
builder.Services.AddScoped<IBibliotecaService, BibliotecaService>();
builder.Services.AddScoped<IGeneroService, GeneroService>();
builder.Services.AddScoped<ILibroService, LibroService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IEmailService, EmailService>();
```

Los servicios:

* encapsulan las reglas de negocio
* devuelven un `Result<T>`
* dependen de repositorios
* son consumidos por los endpoints

---

# 9. Host / URL del backend

```csharp
builder.WebHost.UseUrls("http://*:5017");
```

El backend escucha en:

```
http://localhost:5017
```

Y está abierto a cualquier IP local.

---

# 10. Middleware

Orden general:

1. Crear app
2. `UseCors`
3. Migraciones + seed
4. Swagger
5. `UseCors` (re-aplicar)
6. `MapAllEndpoints()`
7. `UseHttpsRedirection()`
8. `Run()`

---

# 11. Auto-Migraciones y Seed SQL

El backend incluye una extensión personalizada:

```csharp
app.ApplyMigrationsAndSeed(sqlSeedPath);
```

Que hace:

---

###  (1) Detectar migraciones aplicadas

```csharp
var applied = dbContext.Database.GetAppliedMigrations();
var pending = dbContext.Database.GetPendingMigrations();
```

---

###  (2) Ejecución automática de migraciones

```csharp
dbContext.Database.Migrate();
```

---

###  (3) Ejecutar seed SQL solo si:

* la base se crea por primera vez (`isInitialMigration == true`)

```csharp
dbContext.Database.ExecuteSqlRaw(sqlCommands);
```

---

###  (4) Resolución segura de ruta al script

Usa:

```
env.ContentRootPath
```

Lo cual evita errores al ejecutar desde CLI, IDE o publicación.

---

###  Archivo de seed configurado:

```csharp
const string sqlSeedPath = "../../../scripts/bd/MySql/00 INSERTS.sql";
```

---

# 12. Helper: ToMinimalResult()

Esta extensión convierte tu tipo dominio `Result<T>` a `IResult` (HTTP):

```csharp
public static IResult ToMinimalResult<T>(this Result<T> result)
```

Traducciones:

| ResultType   | HTTP | Acción                     |
| ------------ | ---- | -------------------------- |
| Ok           | 200  | `Results.Ok`               |
| Created      | 201  | `Results.Created`          |
| NotFound     | 404  | Mensaje                    |
| Unauthorized | 401  | Sin body                   |
| BadRequest   | 400  | Lista de errores o mensaje |
| File         | 200  | Retorna archivo binario    |

Esto garantiza una estandarización total de respuestas.

---

# 13. Registro de Endpoints

```csharp
app.MapAllEndpoints();
```

Tu backend organiza endpoints por módulos:

* `UsuarioEndpoints`
* `LibroEndpoints`
* `GeneroEndpoints`
* `BibliotecaEndpoints`

Todos se registran desde una sola extensión.

---

# 14. HTTPS + Pipeline final

```csharp
app.UseHttpsRedirection();
app.Run();
```

---

# 15. Resumen general del pipeline

```
Cargar configuración → registrar servicios → configurar DB → configurar CORS → configurar JSON → construir app →
aplicar migraciones/seed → habilitar Swagger → CORS → mapear endpoints → redirigir HTTPS → ejecutar backend
```

---