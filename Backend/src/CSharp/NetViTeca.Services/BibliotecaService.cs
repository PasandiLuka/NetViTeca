using NetViTeca.Core.IServices;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;

/// <summary>
/// Servicio que orquesta la interacción entre usuarios y libros (Biblioteca).
/// </summary>
public class BibliotecaService : IBibliotecaService
{
    private readonly IRepoLibro _repoLibro;
    private readonly IRepoBiblioteca _repoBiblioteca;

    public BibliotecaService(IRepoLibro repoLibro, IRepoBiblioteca repoBiblioteca)
    {
        _repoLibro = repoLibro;
        _repoBiblioteca = repoBiblioteca;
    }

    /// <inheritdoc/>
    /// <inheritdoc/>
    public async Task<Result<List<Libro>>> ObtenerLibrosDisponibleTitulo(int userId, string? filterTitle)
    {
        var libros = await _repoLibro.LibrosNoEnBibliotecaUsuario(userId);

        if (!string.IsNullOrEmpty(filterTitle))
        {
            filterTitle = filterTitle.ToLower();
            libros = libros.Where(l => l.Title.ToLower().Contains(filterTitle)).ToList();
        }

        if (libros.Any())
            return Result<List<Libro>>.Ok(libros);
        
        return Result<List<Libro>>.NotFound("No se encontraron libros con los criterios dados.");
    }

    /// <inheritdoc/>
    public async Task<Result<bool>> RegistrarLibrosSeleccionados(int userId, List<int> bookIds)
    {
        if (bookIds == null || !bookIds.Any())
            return Result<bool>.BadRequest("La lista de libros no puede estar vacía.");

        var nuevosRegistros = bookIds.Select(id => new Biblioteca
        {
            UserId = userId,
            BookId = id
        }).ToList();

        await _repoBiblioteca.AsignarLibrosAUsuario(nuevosRegistros);

        return Result<bool>.Created(true, "Libros asignados correctamente.");
    }

    /// <inheritdoc />
    public async Task<Result<bool>> RetirarLibroAUsuario(int bookId, int userId)
    {
        if (bookId <= 0 || userId <= 0)
        {
            return Result<bool>.BadRequest("Los IDs de usuario y libro deben ser valores positivos.");
        }

        var success = await _repoBiblioteca.RetirarLibroAUsuario(bookId, userId);

        if (!success)
        {
            return Result<bool>.NotFound("La asignación de libro/usuario no fue encontrada. El libro no estaba en la biblioteca.");
        }

        return Result<bool>.Ok(true, "Libro retirado exitosamente de la biblioteca.");
    }
}