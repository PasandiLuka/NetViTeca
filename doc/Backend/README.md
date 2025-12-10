# NetViTeca – Backend

Bienvenido a la documentación técnica del Backend de NetViTeca, una plataforma desarrollada en ASP.NET Core 8 + Entity Framework Core para la gestión de usuarios, géneros y libros dentro de una biblioteca digital moderna.

Este documento funciona como punto de entrada a toda la documentación del backend y resume su arquitectura, funcionamiento, tecnologías y estructura interna.

---

## Tecnologías Principales ⚙️

| Tecnología                | Uso                                         |
| ------------------------- | ------------------------------------------- |
| C# — .NET 8           | Lógica de negocio y API REST                |
| ASP.NET Core Web API  | Exposición de endpoints, configuración HTTP |
| Entity Framework Core | ORM, consultas, migraciones                 |
| MySQL                 | Base de datos principal                     |
| JWT                   | Autenticación y protección de endpoints     |
| AutoMapper            | Mapeo entre entidades y DTOs                |
| Arquitectura en Capas | Separación por responsabilidades            |

---

## Arquitectura General del Backend 🧱

NetViTeca utiliza una arquitectura limpia basada en capas:

```
Backend/
│── NetViTeca.Api           → Controladores, endpoints, configuración de API
│── NetViTeca.Core          → Entidades, enums, interfaces, modelos Result
│── NetViTeca.Services      → Lógica de negocio, validaciones, casos de uso
│── NetViTeca.Infrastructure→ Repositorios, acceso a datos, DbContext
```

### Flujo general de una petición

```
Request → Controller → Service → Repository → DB (MySQL)
                           ↓
                       Result<T>
                           ↓
                     HTTP Response
```

✔ Controllers: validación básica y retorno HTTP
✔ Services: reglas de negocio y casos de uso
✔ Repository: acceso a MySQL vía EF Core
✔ Core: contratos, entidades, modelos base

---

## Estructura del Proyecto  📁

```
Backend/
│
├── NetViTeca.Api
│   ├── Controllers/
│   ├── DTOs/
│   ├── Config/
│   ├── Extensions/
│   ├── Program.cs
│   └── appsettings.json
│
├── NetViTeca.Core
│   ├── Entities/
│   ├── Interfaces/
│   ├── Enums/
│   ├── Models/ (Result<T>)
│   └── Exceptions/
│
├── NetViTeca.Services
│   ├── Services/ (UserService, BookService, AuthService…)
│   └── Validations/
│
└── NetViTeca.Infrastructure
    ├── Repositories/
    ├── Mappings/
    ├── Context/ (AppDbContext)
    └── Migrations/
```

---

## Cómo Ejecutar el Backend 🧪

### 1. Requisitos

* .NET 8 SDK
* MySQL 8+
* Visual Studio / VS Code
* Postman o ThunderClient (opcional)

---

### 2. Configurar cadena de conexión

En `NetViTeca.Api/appsettings.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=NetViTeca;user=root;password=tuPassword;"
}
```

---

### 3. Aplicar migraciones

```bash
cd NetViTeca.Infrastructure
dotnet ef database update
```

---

### 4. Ejecutar la API

```bash
cd NetViTeca.Api
dotnet run
```

La API se expondrá típicamente en:

```
https://localhost:7028
http://localhost:5028
```

---

## Autenticación con JWT 🔑

El backend usa:

* Login
* Registro
* Generación de tokens JWT
* Autorización en endpoints protegidos `[Authorize]`

El token debe enviarse como:

```
Authorization: Bearer <token>
```


## Modelo Result<T> 🧩

El backend usa un estándar interno:

```
Result<T> → EResultType.Ok, Created, BadRequest, NotFound, Unauthorized, File
```

Los controladores utilizan:

```csharp
result.ToMinimalResult();
```

para convertirlo en respuestas HTTP limpias.

---

## Estado Actual del Backend 🚀

* ✔ CRUD completo de Usuarios
* ✔ CRUD de Libros
* ✔ CRUD de Géneros
* ✔ Gestión de Biblioteca (asociación usuario–libro)
* ✔ Login + JWT
* ✔ Estructura en capas
* ✔ Limpieza en servicios y repositorios
* ✔ DTOs y validaciones
* ✔ Documentación completa del sistema

---

## ¿Qué sigue? 🧩

* Roles (admin / user)
* Sistema de compra futura
* Recomendaciones
* Búsqueda avanzada
* Subida de archivos (PDF)
* Logs
* Tests unitarios


# LO SIGUIENTE ES PROVOSIONAL HAY QUE CAMBIARLO:

## 📄 Documentación Detallada (Índice)

### 1. Arquitectura Interna

👉 [`Arquitectura.md`](Arquitectura.md)
Detalles sobre capas, responsabilidades, principios y diagramas.

---

### 2. API

👉 [`API.md`](API.md)
Documentación profesional de todos los endpoints reales incluyendo
controladores, rutas, métodos, parámetros y respuestas.

---

### 3. Base de Datos

👉 [`BaseDeDatos.md`](BaseDeDatos.md)
Modelo relacional, tablas, tipos de datos, relaciones y script SQL.

---

### 4. Errores del Sistema

👉 [`Errores.md`](Errores.md)
Cómo funciona el modelo de errores `Result<T>`, manejadores, códigos HTTP y estructura.

---

### 5. Despliegue

👉 [`Despliegue.md`](Despliegue.md)
Guía para ejecutar NetViTeca en producción: hosting, MySQL remoto, environment variables y builds.

---