<h1 align="center">E.T. Nº12 D.E. 1º "Libertador Gral. José de San Martín"</h1>
<p align="center">
  <img src="https://et12.edu.ar/imgs/et12.svg">
</p>

## 💻 Computación 2025



**Integrantes del grupo**: 
- Pasandi Dabek, Luka
- Zerpa Sierra, Sebastian Alberto
- Lopez, Angel Nahuel.

**Curso**: 5°7ma

# NetViTeca 📖

NetViTeca es un sistema de gestión para bibliotecas digitales que permite administrar usuarios, libros, géneros y colecciones de forma sencilla y centralizada. El backend está desarrollado en C# (.NET 8) con Entity Framework Core, utilizando MySQL como base de datos para garantizar un manejo seguro y eficiente de la información. El frontend, construido con React, Vite y TypeScript, ofrece una interfaz rápida y moderna para acceder a todas las funciones del sistema.

## Comenzando 🚀

Clonar el repositorio github, desde Github Desktop o ejecutar en la terminal o CMD:

```
git clone https://github.com/PasandiLuka/NetViTeca.git
```

### Pre-requisitos 📋

#### Editor 

- [Visual Studio Code](https://code.visualstudio.com/download)

#### Backend 🚪

- .NET 8.0 - [Descargar](https://dotnet.microsoft.com/download/dotnet/8.0)

- MySQL Server 8.0 - [Descargar](https://dev.mysql.com/downloads/installer/)


#### Frontend 🖼️

- Node.js 18+ [Descargar](https://nodejs.org/es)

## Instalacion ⬇️

### a. Configuración de la base de datos

El proyecto incluye scripts SQL dentro de Backend/scripts/bd/MySQL
```
00 INSERTS.sql
```

### b. Configurar la cadena de conexión

Edita el archivo appsettings.json dentro de:
```
Backend/src/CSharp/NetViTeca.Api/appsettings.json
```

Reemplaza la cadena por tus credenciales de MySQL:
```json
  {
    "ConnectionStrings": {
      "DefaultConnection": "Server=localhost;Database=NetViTecaDB;User=tu_usuario;Password=tu_contraseña;"
    }
  }
```

### c. Ejecutar backend.

Dentro de **Backend/src/CSharp/NetViTeca.Api** para instalar todos los paquetes requeridos:
```shell
dotnet restore
dotnet build
dotnet run
```

### d. Ejecuta frontend.
Inicia el proyecto:
```shell
cd Front-End
npm install
```

Ejecutar:
```shell
npm run dev
```

## Construido con 🛠️

### Backend 

* C# Net 8.0

* ASP.NET Core

* EntityFramework Core

### Frontend

* TypeScript + React + Vite

* TailwindCSS + Bootswatch

* Axios

### Base de datos

* MySQL 8.0

## Autores ✒️

* **Luka Pasandi** - *Desarrollo backend* - [PasandiLuka](https://github.com/PasandiLuka)
* **Sebastian Zerpa** - *Desarrollo frontend* - [Darkops56](https://github.com/Darkops56/)
* **Angel Lopez** - *Documentación* - [angelnl610](https://github.com/angelnl610/)

## Documentación 📄

- [DER + UML](PlanEstudioOctubre\Proyecto\doc\MarkDown.md)