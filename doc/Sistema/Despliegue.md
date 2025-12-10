#  Despliegue de NetViTeca 🚀

Este documento describe el proceso recomendado para desplegar NetViTeca, incluyendo el Backend en .NET, el Front-End web y la base de datos utilizada por la API.
El objetivo es permitir una instalación clara y profesional tanto en entornos de desarrollo como en producción.

---

# Estructura del Proyecto 🧩

```
NetViTeca/
│── Backend/       → API en .NET con arquitectura por capas
│── Front-End/     → Interfaz web
│── doc/           → Documentación del proyecto
│── README.md      → Descripción general
```

---

# 1. Requisitos Previos ⚙️

### Backend (.NET)

* `.NET 8 SDK`
* `SQL Server` / `LocalDB`
* Herramienta CLI `dotnet`

### Front-End

Dependiendo del stack usado (lo verifico si querés subir el package.json), asumimos:

* `Node.js 18+`
* `npm` o `yarn`

### Opcionales para producción

* Docker
* Servidor Linux o Windows
* Nginx o Apache para servir Front-End
* Reverse Proxy si se usa HTTPS

---

# 2. Configuración de Base de Datos 🗄️

La API necesita una base de datos SQL Server.

1. Crear una DB llamada:

```
NetViTecaDB
```

2. Ejecutar las migraciones (si existen) o ejecutar el script SQL manual que tengas.

3. Configurá la cadena en:

```
Backend/NetViTeca.Api/appsettings.json
```

Ejemplo:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=NetViTecaDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

---

# 3. Despliegue del Backend (.NET) 🟦

### Ejecutar en entorno local ▶️

Desde la carpeta Backend:

```bash
dotnet restore
dotnet build
dotnet run
```

La API quedará disponible en:

```
https://localhost:7022
http://localhost:5022
```

*(Los puertos pueden variar según el launchSettings.json real.)*

---

### Opcional: Ejecutar con Docker 📦

Crear imagen:

```bash
docker build -t netviteca-api .
```

Ejecutar contenedor:

```bash
docker run -d -p 8080:8080 --name netviteca netviteca-api
```

Si querés, te genero un `Dockerfile` profesional basado en tu proyecto.

---

# 4. Despliegue del Front-End 🌐

### Ejecutar en desarrollo ▶️

Desde `/Front-End`:

```bash
npm install
npm run dev
```

### Build para producción ▶️

```bash
npm run build
```

El resultado quedará en la carpeta:

```
/Front-End/dist
```

Esta carpeta puede ser servida por:

* Nginx
* Apache
* GitHub Pages
* Vercel
* Netlify

---

# 5. Conectar Front-End con la API 🔀 

En tu Front-End (según framework), configurá la URL base de la API:

Ejemplo:

```ts
const API_URL = "http://localhost:5022/api"; // o la URL de tu servidor
```

En producción cambiaría a:

```
https://api.netviteca.com
```

---

# 6. Despliegue en Producción 🧱

### Modelo recomendado

* API → Contenedor Docker en un servidor Linux
* Base de datos → SQL Server en Azure o VPS
* Front-End → Servido por Nginx (estático)
* Certificados SSL → Let’s Encrypt

### Flujo típico:

1. Hacer build del backend → Publicarlo

   ```bash
   dotnet publish -c Release -o publish
   ```

2. Subir la carpeta `publish` al servidor.

3. Configurar systemd (si querés, te escribo el archivo).

4. Servir Front-End desde Nginx con reverse proxy al .NET API.

---

# 7. Pruebas del despliegue 🧪

* Acceder a:

  ```
  https://tu-dominio.com
  ```

* Ver si el Front-End carga correctamente.

* Ejecutar endpoints ejemplo:

  ```
  GET /api/libros
  POST /api/usuarios/login
  ```

* Verificar CORS

* Probar carga de imágenes y PDFs

---

# 8. Checklist Final 🏁

| Ítem                             | Estado |
| -------------------------------- | ------ |
| Base de datos creada             | ⬜      |
| Cadena de conexión configurada   | ⬜      |
| API corriendo                    | ⬜      |
| Front-End conectado a API        | ⬜      |
| HTTPS configurado                | ⬜      |
| Migraciones aplicadas            | ⬜      |
| Variables de entorno productivas | ⬜      |
