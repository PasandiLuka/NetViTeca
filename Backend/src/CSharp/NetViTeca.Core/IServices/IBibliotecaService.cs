using NetViTeca.Core.Models;

namespace NetViTeca.Core.IServices;

/// <summary>
/// Define el contrato para la gestión de préstamos y asignaciones de libros a usuarios.
/// </summary>
public interface IBibliotecaService
{
    /// <summary>
    /// Recupera los libros que un usuario aún NO tiene en su biblioteca personal.
    /// Permite filtrar por título.
    /// </summary>
    /// <param name="idUsuario">ID del usuario.</param>
    /// <param name="filtroTitulo">Texto opcional para buscar por título.</param>
    /// <returns>Lista de libros disponibles envuelta en un Result.</returns>
    Task<Result<List<Libro>>> ObtenerLibrosDisponibleTitulo(int idUsuario, string? filtroTitulo);

    /// <summary>
    /// Asigna masivamente una lista de libros a un usuario.
    /// </summary>
    /// <param name="idUsuario">ID del usuario.</param>
    /// <param name="idsLibros">Lista de IDs de libros.</param>
    /// <returns>True si la operación fue exitosa.</returns>
    Task<Result<bool>> RegistrarLibrosSeleccionados(int idUsuario, List<int> idsLibros);

    /// <summary>
    /// Procesa la solicitud para eliminar un libro de la biblioteca del usuario.
    /// </summary>
    /// <param name="idLibro">ID del libro a retirar.</param>
    /// <param name="idUsuario">ID del usuario.</param>
    /// <returns>Resultado Ok o NotFound si la asignación no existe.</returns>
    Task<Result<bool>> RetirarLibroAUsuario(int idLibro, int idUsuario);

    /// <summary>
    /// Incrementa el contador de veces que el usuario ha leído el libro.
    /// </summary>
    Task<Result<bool>> IncrementarContadorLectura(int idLibro, int idUsuario);
}