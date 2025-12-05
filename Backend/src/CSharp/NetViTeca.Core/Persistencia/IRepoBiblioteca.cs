using NetViTeca.Core.Models;

namespace NetViTeca.Core.Persistencia;

/// <summary>
/// Interfaz para las operaciones de persistencia relacionadas con la Biblioteca (préstamos/asignaciones).
/// </summary>
public interface IRepoBiblioteca
{
    /// <summary>
    /// Guarda una lista masiva de libros asignados a un usuario.
    /// </summary>
    Task AsignarLibrosAUsuario(List<Biblioteca> nuevosRegistros);

    /// <summary>
    /// Elimina la asignación de un libro específico de la biblioteca de un usuario.
    /// </summary>
    /// <param name="idLibro">ID del libro a retirar.</param>
    /// <param name="idUsuario">ID del usuario de la biblioteca.</param>
    /// <returns>Tarea asíncrona que retorna true si se encontró y eliminó el registro.</returns>
    Task<bool> RetirarLibroAUsuario(int idLibro, int idUsuario);
}