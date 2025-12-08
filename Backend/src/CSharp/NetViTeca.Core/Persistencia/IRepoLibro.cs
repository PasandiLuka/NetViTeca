using NetViTeca.Core.Models;

namespace NetViTeca.Core.Persistencia;

public interface IRepoLibro
{
    /// <summary>
    /// Crea un nuevo registro de Libro en la base de datos.
    /// </summary>
    /// <param name="libro">Objeto Libro a guardar.</param>
    /// <returns>Tarea asíncrona completada.</returns>
    Task AltaLibro(Libro libro);

    /// <summary>
    /// Obtiene una lista de libros que están actualmente en la biblioteca de un usuario específico.
    /// </summary>
    /// <param name="idUsuario">ID del Usuario a consultar.</param>
    /// <returns>Lista asíncrona de objetos Libro.</returns>
    Task<List<Libro>> LibrosEnBibliotecaUsuario(int idUsuario);

    /// <summary>
    /// Obtiene una lista de libros que NO están en la biblioteca de un usuario específico.
    /// </summary>
    /// <param name="idUsuario">ID del Usuario a consultar.</param>
    /// <returns>Lista asíncrona de objetos Libro.</returns>
    Task<List<Libro>> LibrosNoEnBibliotecaUsuario(int idUsuario);
}