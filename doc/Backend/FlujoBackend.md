# Flujo del backend

## 📌 Objetivo

Describir el flujo completo de ejecución dentro del backend de NetViTeca, desde que llega una request HTTP hasta que se accede a la base de datos y se devuelve una respuesta.

Este documento explica cómo interactúan las capas:

* API (Controllers)
* Core (entidades, DTOs, validaciones y reglas)
* Services (lógica de negocio)
* Repository / Data (acceso a datos)
* ORM / EF Core (si corresponde)
* Infra / Utils (helpers, JWT, storage, etc.)

---

# 🧭 1. Flujo general de una Request

```
Cliente → API Controller → Service → Repository → Base de Datos
                                     ↓
                                 Core Models
```

### Paso a paso

1. El cliente hace una request HTTP
   (Frontend, Postman, mobile app, etc.)

2. Middleware global
   Autenticación JWT, autorización, logging, manejo de errores global.

3. Llega al Controller
   El controller:

   * Recibe parámetros del body/query
   * Valida el modelo
   * Llama al Service correspondiente

4. El Service ejecuta la lógica de negocio

   * Reglas de negocio
   * Validaciones adicionales
   * Composición de operaciones
   * Llamada a repositorios

5. El Repository ejecuta operaciones de persistencia

   * Consultas
   * Inserts
   * Updates
   * Deletes

6. El ORM (o SQL manual) interactúa con la DB

   * Construye queries
   * Mapea resultados a modelos

7. Se retorna la respuesta hacia arriba
   Repository → Service → Controller → Cliente

---

# 🧩 2. Flujo en profundidad según capas

---

## 🟦 2.1 Capa API (Controllers)

### Responsabilidades

* Recibir solicitudes HTTP
* Validar DTOs con atributos
* Mapear DTO → Core Models
* Llamar a services
* Devolver HTTP responses (200, 400, 404, 500…)

### Flujo interno

```
Request → Model Binding → Validación → Controller → Service
```

### Ejemplo

1. El usuario envía un `POST /auth/login`
2. Controller recibe `LoginRequestDto`
3. Valida parámetros
4. Llama al `AuthService.LoginAsync(dto)`
5. Devuelve JWT + datos del usuario

---

## 🟩 2.2 Capa Core

Incluye:

* Entidades principales del dominio
* DTOs
* Validadores
* Excepciones personalizadas
* Configuración del dominio

### Flujo

Controllers / Services convierten:

```
DTO → CoreModel → DTO de salida
```

### Rol en el flujo

* Estandariza estructuras
* Evita lógica de negocio dentro de API
* Define reglas del dominio

---

## 🟧 2.3 Capa Services

La parte más importante del backend.

### Responsabilidades

* Lógica de negocio
* Validaciones complejas
* Combinación de operaciones de repositorios
* Manejo de transacciones (cuando existan)
* Disparadores de eventos (email, logs, etc.)

### Flujo

```
Controller → Service → Repository
```

### Ejemplo de flujo (crear libro)

1. Controller recibe `LibroCreateDto`
2. Service valida:

   * ISBN único
   * Categoría existente
   * Reglas de disponibilidad
3. Service llama a Repository:

   ```
   _libroRepository.CreateAsync(libro)
   ```
4. Devuelve el libro creado al Controller

---

## 🟥 2.4 Capa Repository

### Responsabilidades

* Acceso a base de datos
* Consultas
* Mapeo de resultados a entidades
* Encapsular operaciones CRUD

### Flujo

```
Service → Repository → DB
```

### Tipos de repositorios encontrados

En el ZIP hay varias DLLs generadas, lo cual indica que:

* Algunos repositorios están compilados
* Otros quizás estén escritos en C# en otras carpetas (si querés, los busco uno por uno)

---

## 🟪 2.5 Capa Data / Persistence

Depende del ORM o método actual:

* EF Core
* SQL scripts
* Conexiones ADO.NET
* Configuraciones de contexto

### Flujo

Repository → ORM → SQL → Base de datos

---

# 🔐 3. Flujo de Autenticación (JWT)

Basado en lo que identifiqué en tu backend.

```
POST /auth/login
    ↓
Controller recibe credenciales
    ↓
AuthService valida usuario y contraseña
    ↓
Si es válido → genera JWT
    ↓
Controller retorna token y datos del usuario
```

Middleware de autenticación:

* Interpreta el token
* Valida su firma
* Agrega `HttpContext.User`

Middleware de autorización:

* Verifica roles o permisos
  (si existen Claims configurados)

---

# 🗂️ 4. Flujo de Casos de Uso Comunes

### 📘 Crear Libro

```
POST /libros
→ Controller valida DTO
→ Service valida negocio
→ Repository inserta
→ Devuelve libro creado
```

### 👤 Crear Usuario

```
POST /usuarios
→ Controller
→ UserService
→ UserRepository
→ Hash de contraseña
→ Insert
→ Devolver usuario
```

### 📚 Préstamo de libro

```
POST /prestamos
→ Controller
→ PrestamosService:
      - Verificar disponibilidad
      - Verificar usuario habilitado
→ PrestamosRepository crea registro
→ Actualizar estado del libro
→ Devolver préstamo
```

---

# 🧯 5. Manejo global de errores

Middleware / filtros:

* Captura exceptions
* Registra logs
* Devuelve códigos en formato estándar:

```
{
  "error": "LibroNoEncontrado",
  "message": "No existe un libro con ese ID"
}
```

