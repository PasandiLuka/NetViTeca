# DER (Diagrama entidad-relacion)

~~~mermaid
erDiagram

    USUARIO {
        int Id PK
        string FullName
        string Phone
        string Email
        string Password
        string Username
        bool ReceiveNotifications
    }

    GENERO {
        int Id PK
        string Name
    }

    LIBRO {
        int Id PK
        int PageCount
        string Title
        string Editorial
        string Author
        datetime CreatedAt
        int GenreId FK
        string Description
        string Image
        string Url
    }

    BIBLIOTECA {
        int BookId PK, FK
        int UserId PK, FK
    }

    %% Relaciones
    GENERO ||--o{ LIBRO : "tiene"
    USUARIO ||--o{ BIBLIOTECA : "posee"
    LIBRO ||--o{ BIBLIOTECA : "está en"
~~~