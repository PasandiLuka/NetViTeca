# Arquitectura General del Sistema

## 1. Estilo arquitectónico

NetViTeca se organiza en dos proyectos independientes: Front-end y backend.

## 2. Interacción entre componentes

La comunicación entre el Frontend y Backend se realiza mediante HTTP utilizando un API REST.
El Frontend consume estos endpoints mediante Axios y maneja los datos en formato JSON.

* Flujo general:
  Frontend → (HTTP Request) → API (Minimal API) → Servicios → Repositorios / EF Core → Base de datos
  Base de datos → Repositorios / EF Core → Servicios → API → Frontend

## 3. Componentes principales

### Frontend (React + Vite + TypeScript)

* Maneja la interfaz gráfica del usuario.
* Consume la API para gestionar libros, géneros, autores, usuarios, etc.
* Implementa login con JWT y almacenamiento del token.
* Organiza vistas y componentes con rutas en React Router.
* Realiza validaciones básicas de formularios.

---

# Backend (ASP.NET Core + C#)

## Arquitectura del backend

La estructura real está dividida en 5 capas, cada una representada por un proyecto de la solución:

```
NetViTeca.sln
│
├── NetViTeca.Api           → Capa de presentación (endpoints / Minimal API)
├── NetViTeca.Core          → Dominio, DTOs, Result<T>, interfaces
├── NetViTeca.Services      → Lógica de negocio
├── NetViTeca.Data          → EF Core (DbContext, Configs, Migrations)
└── NetViTeca.Repositorios  → Repositorios ADO.NET
```

### 🔹 NetViTeca.Api (Presentación)

* Endpoints organizados por módulo (LibroEndpoints, UsuarioEndpoints, GeneroEndpoints, etc.).
* Configuración de servicios, middlewares, Swagger, CORS.
* Adapta `Result<T>` a respuestas HTTP.

### 🔹 NetViTeca.Core (Dominio y contratos)

* Entidades, DTOs, interfaces (`I*Service`, `IRepo*`), utilidades.
* Sistema de errores (`Result<T>`, `EResultType`).
* No depende de ninguna otra capa.

### 🔹 NetViTeca.Services (Lógica de negocio)

* Implementaciones de los servicios: LibroService, UsuarioService, etc.
* Validaciones, orquestación, reglas de negocio.
* Puede usar EF Core o ADO.NET según convenga.

### 🔹 NetViTeca.Data (EF Core)

* DbContext, Fluent API, migrations.
* Manejo del esquema y persistencia mediante EF Core.

### 🔹 NetViTeca.Repositorios (ADO.NET)

* Repos con SQL manual (`RepoLibro`, `RepoGenero`, `RepoUsuario`, etc.).
* Alternativa a EF Core para operaciones específicas.

### Dependencias reales

```
Api → Services → (Data o Repositorios)
Core → usado por todos
Data / Repos → nunca llaman a Api o Services
```

---

## 4. Base de datos

NetViTeca utiliza MySQL como motor de base de datos.
La arquitectura soporta dos formas de persistencia:

1. EF Core (ORM principal)
2. ADO.NET (consultas SQL manuales para rendimiento o casos específicos)

EF Core permite migraciones, tracking de entidades y consultas LINQ.
Los repositorios ADO.NET permiten SQL directo cuando se necesite.

## 5. Flujo general del sistema

1. El usuario accede al Frontend.

2. Si no está autenticado, realiza login y obtiene un token JWT.

3. El Frontend envía el token en cada request.

4. El usuario puede:

   * Listar libros
   * Listar géneros
   * Registrar usuarios
   * Registrar libros
   * Editar / eliminar recursos

5. Cada acción envía una request a la API (Minimal API).

6. La API delega en servicios, los cuales usan EF Core o ADO.NET.

7. El backend responde y el Frontend actualiza la interfaz.

## 6. Separación por proyectos

El sistema está dividido físicamente en dos proyectos independientes:

* Backend (carpeta: `Backend/`)
* Frontend (carpeta: `Front-End/`)

Se comunican solo mediante la API.

## 7. Seguridad

NetViTeca utiliza JWT para manejo de sesiones y control de acceso.
El backend valida tokens y protege rutas que solo pueden usar usuarios autenticados.

---

Si querés, puedo también reformatear el archivo, pasarlo a un estilo más formal, más técnico, más visual con diagramas, etc.
