using NetViTeca.Core.Models;

namespace NetViTeca.Core.Persistencia;

/// <summary>
/// Interfaz para las operaciones de persistencia relacionadas con la Biblioteca (préstamos/asignaciones).
/// </summary>
public interface IRepoBiblioteca
{
    /// <summary>
    /// Inserta múltiples registros en la tabla Biblioteca y guarda los cambios.
    /// </summary>
    /// <param name="nuevosRegistros">Lista de objetos Biblioteca a insertar.</param>
    Task AsignarLibrosAUsuario(List<Biblioteca> nuevosRegistros);

    /// <summary>
    /// Elimina la asignación de un libro específico de la biblioteca de un usuario.
    /// </summary>
    /// <param name="idLibro">ID del libro a retirar.</param>
    /// <param name="idUsuario">ID del usuario de la biblioteca.</param>
    /// <returns>Tarea asíncrona que retorna true si se encontró y eliminó el registro.</returns>
    Task<bool> RetirarLibroAUsuario(int idLibro, int idUsuario);

    /// <summary>
    /// Incrementa el contador de lecturas para un libro y usuario específicos.
    /// </summary>
    Task<bool> IncrementarLectura(int idLibro, int idUsuario);
}