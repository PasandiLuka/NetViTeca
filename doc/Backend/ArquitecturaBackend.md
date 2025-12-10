# Arquitectura del Backend 🏗️
Este documento describe en detalle la arquitectura real del backend de NetViTeca, basada en los proyectos incluidos en la solución y el código existente.
Incluye capas, responsabilidades, dependencias, decisiones de diseño y el flujo interno de ejecución.

---

# Estructura Real de Proyectos 📁

La solución está organizada en 5 capas principales, cada una representada por un proyecto separado:

```
NetViTeca.sln
│
├── NetViTeca.Api           → Capa de presentación (endpoints / Minimal API)
├── NetViTeca.Core          → Modelos, DTOs, Result<T>, interfaces, utilidades
├── NetViTeca.Services      → Lógica de negocio (I*Service)
├── NetViTeca.Data          → EF Core, DbContext, Configs, Migrations
└── NetViTeca.Repositorios  → Repositorios ADO.NET (RepoLibro, RepoUsuario, etc.)
```

---

# Descripción de cada capa 🧩

---

## 1. NetViTeca.Api — Presentación 

🔹 Qué contiene

* Endpoints por módulo (LibroEndpoints, UsuarioEndpoints, GeneroEndpoints, etc.)
* `Program.cs` y configuración de servicios
* Middlewares
* Entradas/salidas HTTP
* Adaptación de `Result<T>` a respuestas HTTP con `ToMinimalResult()`

🔹 Responsabilidad

* Ser la puerta de entrada del sistema.
* Validación mínima del request.
* Invocar servicios.
* Devolver HTTP estandarizados.

🔹 Nunca debe contener

* Lógica de negocio.
* Consultas SQL.
* Acceso directo a la BD.

---

## 2. NetViTeca.Core — Dominio y contratos

🔹 Qué contiene

* Entidades del dominio (Libro, Usuario, Biblioteca, Genero, etc.)
* DTOs de entrada/salida
* Interfaces:

  * `I*Service`
  * `IRepo*` (si existen)
* Sistema de errores:

  * `Result<T>`
  * `EResultType`
* Utilidades del dominio (PasswordUtils)

🔹 Responsabilidad
Definir qué hace el sistema, no cómo lo hace.

🔹 Regla clara

> Core no referencia a ninguna otra capa.

---

## 3. NetViTeca.Services — Lógica de negocio

🔹 Qué contiene

* Implementaciones de servicios:

  * `LibroService`
  * `UsuarioService`
  * `GeneroService`
  * `BibliotecaService`
* Validaciones de negocio
* Orquestación entre repos/EF
* Uso de `PasswordUtils`
* Decisiones que terminan en un `Result<T>`

🔹 Ejemplos de tareas típicas

* Validar que el usuario existe antes de loguear.
* Verificar disponibilidad antes de prestar un libro.
* Realizar cálculos.
* Combinar información de distintas fuentes.

🔹 Puede utilizar

* Repositorios ADO.NET
* DbContext (EF Core)

Ambos están soportados.

---

## 4. NetViTeca.Data — EF Core

🔹 Qué contiene

* `NetViTecaDbContext`
* Configs de entidades (Fluent API)
* Migrations del proyecto
* Configuración MySQL (Pomelo)

🔹 Responsabilidad

* Mapeo entidad ↔ tabla
* Persistencia con EF Core
* Control de esquema mediante migrations

---

## 5️⃣ NetViTeca.Repositorios — ADO.NET (Acceso directo)

🔹 Qué contiene

* `RepoBaseAdo.cs`
* `RepoLibro.cs`
* `RepoUsuario.cs`
* `RepoGenero.cs`
* `RepoBiblioteca.cs`

🔹 Responsabilidad

* Proveer consultas SQL de bajo nivel.
* Ser alternativa a EF Core donde se requiera:

  * mayor performance,
  * queries complejas,
  * control manual de SQL.

🔹 Comentarios
Esta capa existe en paralelo con EF Core.
La arquitectura del proyecto soporta dos formas válidas de persistencia.

---

# Dependencias Entre Capas  ⚙️

Representación visual:

```
Cliente (Frontend)
     ↓
 NetViTeca.Api (HTTP)
     ↓
 NetViTeca.Services (negocio)
   ↙          ↘
ADO.NET      Entity Framework
(NetViTeca.Repositorios)   (NetViTeca.Data)
     ↓                     ↓
                 MySQL
```

Reglas:

* `Api` → depende de `Services` y `Core`
* `Services` → depende de `Core`, `Data` y/o `Repositorios`
* `Core` → no depende de nadie
* `Data` → depende de `Core`
* `Repositorios` → depende de `Core`

---

# Registro de Servicios (ejemplo real) ⚙️

En `Program.cs`:

```csharp
// DbContext EF Core
builder.Services.AddDbContext<NetViTecaDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Servicios de negocio
builder.Services.AddScoped<ILibroService, LibroService>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IGeneroService, GeneroService>();
builder.Services.AddScoped<IBibliotecaService, BibliotecaService>();

// Repositorios ADO.NET
builder.Services.AddScoped<IRepoLibro, RepoLibro>();
builder.Services.AddScoped<IRepoUsuario, RepoUsuario>();
builder.Services.AddScoped<IRepoGenero, RepoGenero>();
builder.Services.AddScoped<IRepoBiblioteca, RepoBiblioteca>();

// Swagger, CORS, AutoMapper, etc.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

---

# Decisiones de Diseño Importantes 🎯

### Arquitectura híbrida

El backend soporta dos formas de acceso a datos:

1. EF Core (alta productividad, migrations, LINQ)
2. ADO.NET (control manual y mayor rendimiento en algunos casos)

Ambas convivirán sin problema si se respetan las interfaces del Core.

---

### Minimal API (sin Controllers)

Se adoptó el enfoque moderno de Minimal APIs, agrupando endpoints por módulo:

```
LibroEndpoints
UsuarioEndpoints
GeneroEndpoints
BibliotecaEndpoints
AuthEndpoints (si aplica)
```

Esto permite:

* arranque más rápido,
* menos boilerplate,
* código más directo.

---

### Result<T> como estándar de errores

Toda la lógica de negocio devuelve:

```
Result<T>
```

Con estados como:

* `Success`
* `NotFound`
* `Invalid`
* `Conflict`
* `Error`

Y luego se transforma a HTTP mediante:

```
result.ToMinimalResult()
```

Esto garantiza consistencia total entre módulos.

---

# Flujo completo de una operación 🔄

Ejemplo: *Crear un nuevo Libro*

1. `LibroEndpoints` recibe el HTTP POST
2. Valida request básico
3. Llama a `ILibroService.CreateAsync(dto)`
4. El servicio valida reglas de negocio
5. Llama a EF Core o a Repo ADO
6. Devuelve un `Result<LibroResponse>`
7. El endpoint responde HTTP 200/400/404/etc.

---

# Conclusión

La arquitectura del backend está diseñada para:

* Escalar sin romper capas,
* Separar lo técnico de lo conceptual,
* Soportar múltiples proveedores de datos,
* Mantener reglas de negocio en un único lugar (Services),
* Tener documentación alineada con la realidad del código.
