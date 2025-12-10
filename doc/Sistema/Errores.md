#  Manejo de Errores

Este documento describe cómo el backend de NetViTeca gestiona los errores y cómo se transforman en respuestas HTTP a través del adaptador central:

```
ExtensionesResult.ToMinimalResult
```

Todos los controladores utilizan este adaptador, por lo que el comportamiento es consistente en toda la API.

---

# 🧩 Modelo de Resultado

Los servicios devuelven una estructura del dominio:

```csharp
Result<T>
```

Que contiene:

| Propiedad      | Descripción                                               |
| -------------- | --------------------------------------------------------- |
| ResultType | Tipo de resultado (`Ok`, `BadRequest`, `NotFound`, etc.). |
| Message    | Mensaje explicativo opcional.                             |
| Errors     | Diccionario o lista de errores de validación.             |
| Data       | Datos devueltos en respuestas exitosas.                   |
| Bytes      | Contenido binario para descargas.                         |

---

# 🚦 Tipos de Errores Manejado por la API

A continuación se detallan todos los tipos de respuesta HTTP que el backend produce según `EResultType`.

---

## 🔍 404 — NotFound

Se devuelve cuando un recurso solicitado no existe.

### 📦 Formato devuelto

```json
{
  "message": "El recurso solicitado no existe."
}
```

### Ejemplos comunes

* ID de libro inexistente
* Usuario no encontrado
* Género no registrado

---

## 🛑 400 — BadRequest

Indica errores en los datos enviados por el cliente.
Puede aparecer de dos formas:

---

### 🅰️ 400 — BadRequest con múltiples errores

```json
{
  "errors": {
    "Email": "El correo es obligatorio",
    "Password": "Debe tener al menos 8 caracteres"
  }
}
```

Generalmente utilizado para validaciones de modelo.

---

### 🅱️ 400 — BadRequest con mensaje simple

```json
{
  "message": "El nombre del género ya existe."
}
```

Usado cuando el error es lógico y no una validación por campo:

* “El usuario ya está registrado”
* “La editorial no puede estar vacía”
* “El género ya existe”

---

## 🔐 401 — Unauthorized

El backend utiliza la respuesta estándar de .NET cuando:

* Falta el token
* El token es inválido
* El token expiró

### 📦 Formato típico

```json
{
  "type": "https://tools.ietf.org/html/rfc7235#section-3.1",
  "title": "Unauthorized",
  "status": 401,
  "traceId": "..."
}
```

---

## ⚠️ 500 — Internal Server Error

Se produce en casos excepcionales no controlados.
El adaptador devuelve simplemente:

```
StatusCode(500)
```

Sin cuerpo adicional.

### Causas comunes

* Excepciones en lógica interna
* Problemas con acceso a base de datos
* Errores inesperados en repositorios
* Tipo de resultado no contemplado por el switch

---

# 📄 Otros Tipos de Resultados (No errores, pero importantes)

---

## ✔️ 200 — OK

Cuando un servicio retorna datos exitosamente.

```json
{
  "data": { ... }
}
```

---

## 🆕 201 — Created

Se utilice cuando un recurso se crea correctamente.

```json
{
  "data": { ... }
}
```

> Nota: El backend utiliza `Created(string.Empty, data)` por lo que la cabecera *Location* no se incluye.

---

## 📦 200 — File (Descarga)

Cuando `ResultType.File` está presente se devuelve:

* `Content-Type: application/octet-stream`
* El contenido binario desde `result.Bytes`

Ideal para PDFs internos u otros archivos.

---

# 🧭 Resumen General

| Resultado del Dominio       | Código HTTP | Cuerpo devuelto       |
| --------------------------- | ----------- | --------------------- |
| Ok                      | 200         | data                  |
| Created                 | 201         | data                  |
| NotFound                | 404         | `{ message }`         |
| Unauthorized            | 401         | JSON estándar de .NET |
| BadRequest (validación) | 400         | `{ errors }`          |
| BadRequest (mensaje)    | 400         | `{ message }`         |
| File                    | 200         | bytes                 |
| Fallback                | 500         | — vació —             |
