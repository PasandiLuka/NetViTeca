# Diagramas de secuencia

### Caso de uso 1: Registrarse

~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant UsuarioService
    participant UserRepository
    participant DB

    Usuario ->> API: Enviar datos de registro
    API ->> UsuarioService: RegistrarUsuario(dto)
    UsuarioService ->> UserRepository: Crear(usuario)
    UserRepository ->> DB: INSERT Usuario
    DB -->> UserRepository: OK
    UserRepository -->> UsuarioService: Usuario creado
    UsuarioService -->> API: Result.Ok()
    API -->> Usuario: Confirmación de registro
~~~

### Caso de uso 2: Inciar sesion
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant AuthService
    participant UserRepository
    participant DB

    Usuario ->> API: Enviar email y contraseña
    API ->> AuthService: Login(dto)
    AuthService ->> UserRepository: ObtenerUsuarioPorEmail(email)
    UserRepository ->> DB: SELECT Usuario WHERE Email
    DB -->> UserRepository: Usuario encontrado
    AuthService ->> AuthService: Validar contraseña
    AuthService -->> API: Result.Ok(token)
    API -->> Usuario: Sesión iniciada (token)

~~~

### Caso de uso 3: Ver catalogo de libros
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Usuario ->> API: GET /libros
    API ->> BookService: ObtenerTodos()
    BookService ->> LibroRepository: GetAll()
    LibroRepository ->> DB: SELECT * FROM Libros
    DB -->> LibroRepository: Listado de libros
    LibroRepository -->> BookService: Libros
    BookService -->> API: Result.Ok(libros)
    API -->> Usuario: Mostrar catálogo

~~~

### Caso de uso 4: Buscar libros
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Usuario ->> API: GET /libros?search=texto
    API ->> BookService: Buscar(texto)
    BookService ->> LibroRepository: Search(texto)
    LibroRepository ->> DB: SELECT * FROM Libros WHERE Title LIKE '%texto%'
    DB -->> LibroRepository: Resultados
    LibroRepository -->> BookService: Libros filtrados
    BookService -->> API: Result.Ok()
    API -->> Usuario: Mostrar resultados

~~~

### Caso de uso 5: Ver detalles de un libro
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Usuario ->> API: GET /libros/{id}
    API ->> BookService: ObtenerPorId(id)
    BookService ->> LibroRepository: GetById(id)
    LibroRepository ->> DB: SELECT * FROM Libros WHERE Id = id
    DB -->> LibroRepository: Libro encontrado
    LibroRepository -->> BookService: Libro
    BookService -->> API: Result.Ok(libro)
    API -->> Usuario: Mostrar detalles

~~~

### Caso de uso 6: Crear genero
~~~mermaid
sequenceDiagram
    actor Admin
    participant API
    participant GenreService
    participant GeneroRepository
    participant DB

    Admin ->> API: POST /generos
    API ->> GenreService: CrearGenero(dto)
    GenreService ->> GeneroRepository: Crear(genero)
    GeneroRepository ->> DB: INSERT Genero
    DB -->> GeneroRepository: OK
    GeneroRepository -->> GenreService: Genero creado
    GenreService -->> API: Result.Created()
    API -->> Admin: Confirmación de creación

~~~

### Caso de uso 7: Ver listado de generos
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant GenreService
    participant GeneroRepository
    participant DB

    Usuario ->> API: GET /generos
    API ->> GenreService: ObtenerTodos()
    GenreService ->> GeneroRepository: GetAll()
    GeneroRepository ->> DB: SELECT * FROM Generos
    DB -->> GeneroRepository: Lista de géneros
    GeneroRepository -->> GenreService: Géneros
    GenreService -->> API: Result.Ok(lista)
    API -->> Usuario: Mostrar géneros

~~~

### Caso de uso 8: Crear libro
~~~mermaid
sequenceDiagram
    actor Admin
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Admin ->> API: POST /libros
    API ->> BookService: CrearLibro(dto)
    BookService ->> LibroRepository: Crear(libro)
    LibroRepository ->> DB: INSERT Libro
    DB -->> LibroRepository: OK
    LibroRepository -->> BookService: Libro creado
    BookService -->> API: Result.Created()
    API -->> Admin: Confirmación de creación

~~~

### Caso de uso 9: Editar libro
~~~mermaid
sequenceDiagram
    actor Admin
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Admin ->> API: PUT /libros/{id}
    API ->> BookService: ActualizarLibro(id, dto)
    BookService ->> LibroRepository: GetById(id)
    LibroRepository ->> DB: SELECT * FROM Libros WHERE Id = id
    DB -->> LibroRepository: Libro encontrado
    LibroRepository -->> BookService: Libro
    BookService ->> LibroRepository: Update(libro modificado)
    LibroRepository ->> DB: UPDATE Libro
    DB -->> LibroRepository: OK
    LibroRepository -->> BookService: Libro actualizado
    BookService -->> API: Result.Ok()
    API -->> Admin: Confirmación de edición
~~~

### Caso de uso 10: Eliminar libro
~~~mermaid
sequenceDiagram
    actor Admin
    participant API
    participant BookService
    participant LibroRepository
    participant DB

    Admin ->> API: DELETE /libros/{id}
    API ->> BookService: EliminarLibro(id)
    BookService ->> LibroRepository: GetById(id)
    LibroRepository ->> DB: SELECT Libro WHERE Id
    DB -->> LibroRepository: Libro encontrado
    LibroRepository ->> DB: DELETE FROM Libros WHERE Id
    DB -->> LibroRepository: OK
    LibroRepository -->> BookService: Eliminado
    BookService -->> API: Result.Ok()
    API -->> Admin: Confirmación de eliminación

~~~

### Caso de uso 11: Ver perfil
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant UsuarioService
    participant UserRepository
    participant DB

    Usuario ->> API: GET /perfil
    API ->> UsuarioService: ObtenerPerfil(idUsuario)
    UsuarioService ->> UserRepository: GetById(idUsuario)
    UserRepository ->> DB: SELECT * FROM Usuarios WHERE Id
    DB -->> UserRepository: Usuario
    UserRepository -->> UsuarioService: Datos
    UsuarioService -->> API: Result.Ok(usuario)
    API -->> Usuario: Mostrar perfil

~~~

### Caso de uso 12: Ver "Mis libros"
~~~mermaid
sequenceDiagram
    actor Usuario
    participant API
    participant BibliotecaService
    participant BibliotecaRepository
    participant DB

    Usuario ->> API: GET /mis-libros
    API ->> BibliotecaService: ObtenerPorUsuario(idUsuario)
    BibliotecaService ->> BibliotecaRepository: GetByUserId(id)
    BibliotecaRepository ->> DB: SELECT * FROM Biblioteca WHERE UserId = id
    DB -->> BibliotecaRepository: Lista de libros del usuario
    BibliotecaRepository -->> BibliotecaService: Datos
    BibliotecaService -->> API: Result.Ok(lista)
    API -->> Usuario: Mostrar mis libros
~~~