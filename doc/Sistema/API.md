# API 

Base URL (desarrollo)

```
http://localhost:5017
```

> Nota: el frontend usa `VITE_API_URL` para configurar la URL del backend.

---

## Resumen

La API de NetViTeca se organiza en módulos registrados por `AppEndpoints.MapAllEndpoints()` y expone los grupos:

* `/api/usuarios` — gestión y autenticación de usuarios
* `/api/libros` — gestión y consulta de libros
* `/api/generos` — gestión de géneros
* `/api/bibliotecas` — asociación de libros a usuarios (colecciones)

Los handlers usan servicios (ej.: `IUsuarioService`, `ILibroService`, `IGeneroService`, `IBibliotecaService`). Las respuestas estándar se envuelven en el tipo `Result<T>` y se transforman a `IResult` mediante el helper extension `.ToMinimalResult()` (esto normaliza OK / Created / BadRequest / NotFound).

---

## Autenticación y autorización

* El login se expone en `POST /api/usuarios/login`.
* En la versión actual tu proyecto sí soporta autenticación (en el frontend se gestionan sesiones). Si el backend emite JWT (o se decide implementarlo), las peticiones protegidas deberán incluir:

```
Authorization: Bearer <token>
```

* En la documentación de cada endpoint indico si debería estar protegido (POST/PUT/DELETE normalmente).

---

## Formato general de errores

Cuando hay fallo, el backend responde con la estructura `Result` transformada por `ToMinimalResult()`. Un fallo típico tiene la forma:

```json
{
  "success": false,
  "message": "Descripción del error",
  "errors": [ "detalle 1", "detalle 2" ]
}
```

Códigos típicos:

* `200 OK` — operación exitosa
* `201 Created` — recurso creado
* `400 Bad Request` — validación
* `401 Unauthorized` — credenciales inválidas / sin token
* `403 Forbidden` — permiso insuficiente
* `404 Not Found` — no existe
* `500 Internal Server Error` — fallo servidor

---

# Endpoints (detallados)

> NOTA: los nombres exactos de DTO que usa el backend aparecen en los handlers: `UsuarioCreacionRequestDTO`, `UsuarioLoginRequestDTO`, `UsuarioActualizacionRequestDTO`, `AltaLibroRequest`, `AltaGeneroRequest`, `AsignarLibrosRequest`, etc. Los ejemplos JSON abajo están construidos siguiendo esos DTOs (ajustalos si tus DTOs tienen campos adicionales).

---

## /api/usuarios (Usuarios)

### POST `/api/usuarios/registro`

Descripción: Registrar nuevo usuario.
Body (ejemplo):

```json
{
  "username": "jdoe",
  "email": "jdoe@example.com",
  "password": "Secreto123"
}
```

Respuestas:

* `201 Created` — usuario creado (el `Result` con DTO de respuesta simplificado: nombre de usuario, email, id).
* `400` — validación (email ya existe, contraseñas inválidas, etc.)

---

### POST `/api/usuarios/login`

Descripción: Autenticar usuario.
Body (ejemplo):

```json
{
  "email": "jdoe@example.com",
  "password": "Secreto123"
}
```

Respuestas:

* `200 OK` — retorna `Result<UsuarioResponseDTO>` (nombreUsuario, correo, opcionalmente token si se implementa).
* `401 Unauthorized` — credenciales incorrectas.

Nota: El backend actual devuelve un `UsuarioResponseDTO` si el login es exitoso. Si se decide emitir JWT, el `UsuarioResponseDTO` puede incluir un `token` o el servicio de autenticación puede devolver un objeto con token + user.

---

### PUT `/api/usuarios/{id}`

Descripción: Actualizar perfil de usuario (nombre completo, teléfono, etc.).
Headers: `Authorization: Bearer <token>` (recomendado)
Path params: `id` (int)
Body (ejemplo):

```json
{
  "fullname": "Juan Pérez",
  "phone": "1122334455"
}
```

Respuestas:

* `200 OK` — usuario actualizado
* `400/401/403/404` — según caso

---

## /api/generos (Géneros)

### GET `/api/generos`

Descripción: Obtener todos los géneros.
Respuestas:

* `200 OK` — array de géneros. Ejemplo:

```json
[
  { "id": 1, "name": "Novela" },
  { "id": 2, "name": "Infantil" }
]
```

---

### POST `/api/generos`

Descripción: Crear un nuevo género.
Headers: `Authorization: Bearer <token>` (recomendado/protegido en ambientes productivos)
Body (ejemplo):

```json
{
  "Name": "Fantasía"
}
```

Respuestas:

* `201 Created` — género creado, `Result` con DTO de género.
* `400` — validación / duplicado.

---

## /api/libros (Libros)

### POST `/api/libros`

Descripción: Registrar un nuevo libro en el catálogo.
Headers: `Authorization: Bearer <token>` (recomendado)
Body (ejemplo):

```json
{
  "GenreId": 2,
  "Title": "Cien Años de Soledad",
  "Editorial": "Sudamericana",
  "Author": "Gabriel García Márquez",
  "PageCount": 417,
  "Description": "Novela...",
  "Image": "http://.../cover.jpg",
  "Url": "http://..." // opcional
}
```

Respuestas:

* `201 Created` — libro registrado (`Result<LibroResponseDTO>`).
* `400` — validación.

---

### GET `/api/libros/usuario/{userId}`

Descripción: Obtener libros que ya tiene el usuario (colección personal / mis libros).
Headers: `Authorization: Bearer <token>` (recomendado; el frontend lo usa así)
Path params: `userId` (int)
Respuestas:

* `200 OK` — array con libros del usuario. Ejemplo:

```json
[
  {
    "id": 7,
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "genre": { "id": 3, "name": "Infantil" },
    "addedAt": "2025-05-01T12:00:00Z"
  }
]
```

---

### GET `/api/libros/disponibles/{userId}`

Descripción: Obtener libros *disponibles* para el usuario (los que no tiene).
Path params: `userId` (int)
Query string opcional: `filter` (string) — el endpoint en tu código define `[FromQuery] string? filter`
Respuestas:

* `200 OK` — array de libros (mismo esquema que el detalle).
* `400/500` — según caso.

---

> Nota: En tu frontend se usan calls como `booksApi.getAvailable(id, params)` y `booksApi.getByUser(userId)`; estas rutas están exactamente mapeadas en `LibroEndpoints`.

---

## /api/bibliotecas (Biblioteca / Colecciones del usuario)

### POST `/api/bibliotecas`

Descripción: Asignar (agregar) uno o varios libros a la biblioteca (colección) de un usuario.
Body (ejemplo) – DTO `AsignarLibrosRequest`:

```json
{
  "UserId": 12,
  "BookIds": [55, 60, 72]
}
```

Comportamiento: Llama a `IBibliotecaService.RegistrarLibrosSeleccionados(userId, bookIds)` y devuelve el `Result` correspondiente.
Respuestas:

* `201 Created` / `200 OK` — asignaciones realizadas.
* `400` — validaciones (ej.: ya tiene alguno).
* `401/403` — si requiere auth y no autorizado.

---

### DELETE `/api/bibliotecas/{userId}/{bookId}`

Descripción: Remover un libro de la colección del usuario.
Path params: `userId`, `bookId`
Respuestas:

* `200 OK` / `204 No Content` — eliminación confirmada
* `404` — si no existe la asignación

---

## Modelos / DTO (nombres observados en el código)

> Usá estos nombres para mapear request/response en OpenAPI o en clientes.

* `UsuarioCreacionRequestDTO` — body para `POST /api/usuarios/registro`
* `UsuarioLoginRequestDTO` — body para `POST /api/usuarios/login`
* `UsuarioActualizacionRequestDTO` — body para `PUT /api/usuarios/{id}`
* `AltaLibroRequest` — body para `POST /api/libros`
* `AltaGeneroRequest` — body para `POST /api/generos`
* `AsignarLibrosRequest` — body para `POST /api/bibliotecas`
* `UsuarioResponseDTO` — respuesta simplificada de usuario (nombreUsuario, correo, id)
* `LibroResponseDTO`, `GeneroResponseDTO` — DTOs de respuesta para recursos

---

## Ejemplos de uso (curl / Axios)

### Login (curl)

```bash
curl -X POST http://localhost:5017/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@ejemplo.com","password":"secret"}'
```

### Obtener géneros (Axios)

```ts
const { data } = await client.get('/api/generos');
```

### Crear libro (Axios, con token)

```ts
await client.post('/api/libros', {
  GenreId: 2,
  Title: 'Nuevo Libro',
  Author: 'Autor X',
  PageCount: 200,
  Description: '...'
});
```