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
    public async Task<Result<List<Libro>>> ObtenerLibrosDisponibleTitulo(int idUsuario, string? filtroTitulo)
    {
        var libros = await _repoLibro.LibrosNoEnBibliotecaUsuario(idUsuario);

        if (!string.IsNullOrEmpty(filtroTitulo))
        {
            filtroTitulo = filtroTitulo.ToLower();
            libros = libros.Where(l => l.titulo.ToLower().Contains(filtroTitulo)).ToList();
        }

        if (libros.Any())
            return Result<List<Libro>>.Ok(libros);
        
        return Result<List<Libro>>.NotFound("No se encontraron libros con los criterios dados.");
    }

    /// <inheritdoc/>
    public async Task<Result<bool>> RegistrarLibrosSeleccionados(int idUsuario, List<int> idsLibros)
    {
        if (idsLibros == null || !idsLibros.Any())
            return Result<bool>.BadRequest("La lista de libros no puede estar vacía.");

        var nuevosRegistros = idsLibros.Select(idLibro => new Biblioteca
        {
            idUsuario = idUsuario,
            idLibro = idLibro
        }).ToList();

        await _repoBiblioteca.AsignarLibrosAUsuario(nuevosRegistros);

        return Result<bool>.Created(true, "Libros asignados correctamente.");
    }

    /// <inheritdoc />
    public async Task<Result<bool>> RetirarLibroAUsuario(int idLibro, int idUsuario)
    {
        if (idLibro <= 0 || idUsuario <= 0)
        {
            return Result<bool>.BadRequest("Los IDs de usuario y libro deben ser valores positivos.");
        }

        var success = await _repoBiblioteca.RetirarLibroAUsuario(idLibro, idUsuario);

        if (!success)
        {
            return Result<bool>.NotFound("La asignación de libro/usuario no fue encontrada. El libro no estaba en la biblioteca.");
        }

        return Result<bool>.Ok(true, "Libro retirado exitosamente de la biblioteca.");
    }
}