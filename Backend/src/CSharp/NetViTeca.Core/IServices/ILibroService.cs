using NetViTeca.Core.Models;
using NetViTeca.Core.Dtos;

namespace NetViTeca.Services;

/// <summary>
/// Define las operaciones de negocio para el recurso Libro.
/// </summary>
public interface ILibroService
{
    /// <summary>
    /// Valida y crea un nuevo libro en el sistema.
    /// </summary>
    Task<Result<Libro>> CrearLibro(AltaLibroRequest request);

    /// <summary>
    /// Obtiene los libros que un usuario ya tiene en su biblioteca personal.
    /// </summary>
    Task<Result<List<Libro>>> ObtenerLibrosUsuario(int userId);

    /// <summary>
    /// Obtiene los libros disponibles que el usuario aún no posee, con filtrado opcional.
    /// </summary>
    Task<Result<List<Libro>>> ObtenerLibrosDisponibles(int userId, string? filterTitle);
}