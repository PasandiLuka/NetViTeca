using NetViTeca.Core.Models;

namespace NetViTeca.Core.Persistencia;

public interface IRepoGenero
{
    /// <summary>
    /// Crea un nuevo registro de Genero en la base de datos.
    /// </summary>
    /// <param name="genero">Objeto Genero a guardar.</param>
    /// <returns>Tarea asíncrona completada.</returns>
    Task AltaGenero(Genero genero); 

    /// <summary>
    /// Obtiene el listado completo de todos los géneros disponibles en el sistema.
    /// </summary>
    /// <returns>Lista asíncrona de objetos Genero.</returns>
    Task<List<Genero>> ObtenerGeneros();
}