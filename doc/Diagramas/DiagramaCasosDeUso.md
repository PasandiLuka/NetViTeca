# Diagrama de casos de uso 

~~~mermaid
flowchart LR
    %% ==== ACTORES ====
    Usuario(("👤 Usuario"))
    Admin(("👤 Administrador"))

    %% ==== CASOS DE USO ====
    subgraph Sistema[ Sistema del Libro ]
        CU_Registrarse([Registrarse])
        CU_Iniciar([Iniciar sesion])
        CU_VerCatalogo([Ver catalogo de libros])
        CU_Buscar([Buscar libros])
        CU_VerDetalles([Ver detalles de un libro])
        CU_CrearGenero([Crear genero])
        CU_VerGeneros([Ver listado de generos])
        CU_CrearLibro([Crear libro])
        CU_EditarLibro([Editar libro])
        CU_EliminarLibro([Eliminar libro])
        CU_VerPerfil([Ver perfil])
        CU_MisLibros([Ver Mis libros])
    end

    %% ==== RELACIONES USUARIO ====
    Usuario --> CU_Registrarse
    Usuario --> CU_Iniciar
    Usuario --> CU_VerCatalogo
    Usuario --> CU_Buscar
    Usuario --> CU_VerDetalles
    Usuario --> CU_VerGeneros
    Usuario --> CU_VerPerfil
    Usuario --> CU_MisLibros

    %% ==== RELACIONES ADMIN ====
    Admin --> CU_CrearGenero
    Admin --> CU_CrearLibro
    Admin --> CU_EditarLibro
    Admin --> CU_EliminarLibro
~~~