# Diagrama de clases

~~~mermaid
classDiagram

    %% =====================
    %%       CLASES
    %% =====================

    class Usuario {
        +int Id
        +string FullName
        +string Username
        +string Email
        +string Password
        +string Phone
        +bool ReceiveNotifications
    }

    class Genero {
        +int Id
        +string Name
        +ICollection~Libro~ Books
    }

    class Libro {
        +int Id
        +int GenreId
        +string Title
        +string Editorial
        +string Author
        +DateTime CreatedAt
        +int PageCount
        +string Description
        +string Image
        +string Url
    }

    class Biblioteca {
        +int BookId
        +int UserId
        +Libro Book
        +Usuario User
    }

    %% =====================
    %%    RELACIONES
    %% =====================

    Genero "1" -- "0..*" Libro : tiene
    Libro "1" -- "0..*" Biblioteca : está_en
    Usuario "1" -- "0..*" Biblioteca : posee
~~~