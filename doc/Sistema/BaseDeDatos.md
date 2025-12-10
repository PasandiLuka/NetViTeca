# Arquitectura de Base de Datos 🗄️

NetViTeca utiliza Entity Framework Core como ORM para la gestión de entidades, creación del modelo relacional y generación automática de la base de datos mediante migraciones.
La base de datos objetivo es MySQL, aunque la abstracción mediante EF permite compatibilidad con otros proveedores.

La estructura se basa en un modelo relacional simple y optimizado, adecuado para operaciones CRUD típicas de una biblioteca digital.

## Diagrama lógico del modelo 📌

Usuario (1)───(N) Biblioteca (N)───(1) Libro (N)───(1) Genero

## Tablas principales

- Usuario → datos de autenticación y perfil.

- Genero → clasificación literaria.

- Libro → metadatos del libro.

- Biblioteca → relación Usuario–Libro

## 🧱 Tablas y Descripción

---

### 1. Usuario

Representa a los usuarios registrados en el sistema.

| Campo    | Tipo | Descripción     |
| ------------ | -------- | ------------------- |
| Id       | INT (PK) | Identificador único |
| FullName | VARCHAR  | Nombre completo     |
| Username | VARCHAR  | Alias del usuario   |
| Email    | VARCHAR  | Correo único        |
| Password | VARCHAR  | Hash SHA-256        |
| Phone    | VARCHAR  | Teléfono (opcional) |

> ⚠️ *En el proyecto real el hash se genera del lado del backend.*

---

## 2. Genero

Catálogo de categorías literarias.

| Campo | Tipo | Descripción   |
| --------- | -------- | ----------------- |
| Id    | INT (PK) | Identificador     |
| Name  | VARCHAR  | Nombre del género |

---

## 3. Libro

Entidad principal que representa un libro en la biblioteca.

| Campo       | Tipo | Descripción               |
| --------------- | -------- | ----------------------------- |
| Id          | INT (PK) | Identificador                 |
| GenreId     | INT (FK) | Relación a `Genero`           |
| Title       | VARCHAR  | Título del libro              |
| Editorial   | VARCHAR  | Editorial                     |
| Author      | VARCHAR  | Autor                         |
| CreatedAt   | DATE     | Fecha original de publicación |
| PageCount   | INT      | Cantidad de páginas           |
| Description | TEXT     | Descripción                   |
| Image       | VARCHAR  | URL de imagen                 |
| Url         | VARCHAR  | Enlace al PDF o lectura       |

---

## 4. Biblioteca

Representa qué libros tiene cada usuario.

| Campo  | Tipo | Descripción      |
| ---------- | -------- | -------------------- |
| UserId | INT (FK) | Relación a `Usuario` |
| BookId | INT (FK) | Relación a `Libro`   |

---

## Script SQL de Ejemplo 🗃️ 

Este script permite popular la base de datos con datos iniciales (seeds).
Si usás EF Core, estos inserts pueden migrarse a ModelBuilder.Seed() o ejecutarse manualmente.

```sql

-- USERS
INSERT INTO Usuario (Id, FullName, Username, Email, Password, Phone) VALUES 
(1, 'Lucca Pazanddi', 'LUKITA7956', 'lukita@gmail.com', SHA2('luka1234', 256), '1123456789'),
(2, 'Sebaz Serpa', 'SEBITA7956', 'sebita@gmail.com', SHA2('seba1234', 256), '1231234324');

-- GENRES
INSERT INTO Genero (Id, Name) VALUES 
(1, 'Fantasia'),
(2, 'Clásicos'),
(3, 'Infantil'),
(4, 'Distopico'),
(5, 'Aventura'),
(6, 'Realismo Mágico'),
(7, 'Novela'),
(8, 'Ciencia Ficción');

-- BOOKS
INSERT INTO Libro (Id, GenreId, Title, Editorial, Author, CreatedAt, PageCount, Description, Image, Url) VALUES
(1, 2, 'Don Quijote de la Mancha', 'Francisco de Robles', 'Miguel de Cervantes', '1605-01-16', 863,
'La historia narra las aventuras del hidalgo Don Quijote...',
'https://upload.wikimedia.org/wikipedia/commons/6/6b/Quijote_1855.jpg',
'https://cvc.cervantes.es/literatura/lee/coleccion/pdf/quijote.pdf'),
(2, 8, '1984', 'Secker & Warburg', 'George Orwell', '1949-06-08', 328,
'Una novela distópica...',
'https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg',
'https://www.ciudadseva.com/texto/1984/'),
(3, 2, 'Hamlet', 'Nicholas Ling', 'William Shakespeare', '1603-07-26', 160,
'Tragedia sobre el príncipe Hamlet...',
'https://upload.wikimedia.org/wikipedia/commons/2/20/Hamlet_Q1_title_page.jpg',
'https://www.gutenberg.org/files/1524/1524-pdf.pdf'),
(4, 5, 'Crimen y castigo', 'The Russian Messenger', 'Fiódor Dostoievski', '1866-01-01', 671,
'Un drama psicológico...',
'https://upload.wikimedia.org/wikipedia/commons/4/47/Crimeandpunishmentcover.png',
'https://www.gutenberg.org/cache/epub/2554/pg2554-pdf.pdf'),
(5, 2, 'La Odisea', 'Antigua Grecia', 'Homero', '0700-01-01', 500,
'Poema épico...',
'https://upload.wikimedia.org/wikipedia/commons/5/5a/Francesco_Hayez_1813_Odisseo_nella_grotta_di_Polimemo.jpg',
'https://www.gutenberg.org/cache/epub/1727/pg1727-pdf.pdf');

-- LIBRARY
INSERT INTO Biblioteca (UserId, BookId) VALUES 
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5);
```

## Migraciones y ORM 🛠️ 

NetViTeca utiliza EF Core para:

- Creación del schema.

- Relaciones entre entidades.

- Migraciones versionadas.

- Queries asincrónicas en Repositorios y Servicios.

Ejemplo típico:

dotnet ef migrations add InitialCreate
dotnet ef database update