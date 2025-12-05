using NetViTeca.Core.Models;
using NetViTeca.Core.Dtos;
using NetViTeca.Core.Persistencia;

namespace NetViTeca.Services;

/// <summary>
/// Implementación de la lógica de negocio de Libros.
/// </summary>
public class LibroService : ILibroService
{
    private readonly IRepoLibro _repoLibro;

    public LibroService(IRepoLibro repoLibro)
    {
        _repoLibro = repoLibro;
    }

    /// <inheritdoc />
    public async Task<Result<Libro>> CrearLibro(AltaLibroRequest request)
    {
        // Validación básica
        if (string.IsNullOrWhiteSpace(request.Titulo))
            return Result<Libro>.BadRequest("El título del libro es obligatorio.");

        // Mapeo de DTO a Entidad
        var nuevoLibro = new Libro
        {
            idGenero = request.IdGenero,
            titulo = request.Titulo,
            editorial = request.Editorial,
            autor = request.Autor,
            fechaCreacion = request.FechaCreacion,
            cantidadPaginas = request.CantidadPaginas
        };

        await _repoLibro.AltaLibro(nuevoLibro);

        return Result<Libro>.Created(nuevoLibro, "Libro creado exitosamente.");
    }

    /// <inheritdoc />
    public async Task<Result<List<Libro>>> ObtenerLibrosUsuario(int idUsuario)
    {
        var libros = await _repoLibro.LibrosEnBibliotecaUsuario(idUsuario);

        if (libros == null || !libros.Any())
            return Result<List<Libro>>.NotFound("El usuario no tiene libros asignados.");

        return Result<List<Libro>>.Ok(libros);
    }

    /// <inheritdoc />
    public async Task<Result<List<Libro>>> ObtenerLibrosDisponibles(int idUsuario, string? filtroTitulo)
    {
        var libros = await _repoLibro.LibrosNoEnBibliotecaUsuario(idUsuario);

        // Lógica de filtrado en memoria
        if (!string.IsNullOrEmpty(filtroTitulo))
        {
            filtroTitulo = filtroTitulo.ToLower();
            libros = libros.Where(l => l.titulo.ToLower().Contains(filtroTitulo)).ToList();
        }

        if (!libros.Any())
            return Result<List<Libro>>.NotFound("No hay libros disponibles con esos criterios.");

        return Result<List<Libro>>.Ok(libros);
    }
}