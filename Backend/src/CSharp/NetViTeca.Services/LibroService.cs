using NetViTeca.Core.Models;
using NetViTeca.Core.Dtos;
using NetViTeca.Core.Persistencia;
using NetViTeca.Core.IServices;
using System.Linq;

namespace NetViTeca.Services;

/// <summary>
/// Implementación de la lógica de negocio de Libros.
/// </summary>
public class LibroService : ILibroService
{
    private readonly IRepoLibro _repoLibro;
    private readonly IRepoUsuario _repoUsuario;
    private readonly IEmailService _emailService;

    public LibroService(IRepoLibro repoLibro, IRepoUsuario repoUsuario, IEmailService emailService)
    {
        _repoLibro = repoLibro;
        _repoUsuario = repoUsuario;
        _emailService = emailService;
    }

    /// <inheritdoc />
    /// <inheritdoc />
    public async Task<Result<Libro>> CrearLibro(AltaLibroRequest request)
    {
        // Validación básica
        if (string.IsNullOrWhiteSpace(request.Title))
            return Result<Libro>.BadRequest("El título del libro es obligatorio.");

        // Mapeo de DTO a Entidad
        var nuevoLibro = new Libro
        {
            GenreId = request.GenreId,
            Title = request.Title,
            Editorial = request.Editorial,
            Author = request.Author,
            CreatedAt = request.CreatedAt,
            PageCount = request.PageCount,
            Description = request.Description,
            Image = request.Image,
            Url = request.Url
        };

        await _repoLibro.AltaLibro(nuevoLibro);

        // --- NOTIFICACIÓN POR EMAIL ---
        try 
        {
            var usuariosSuscritos = await _repoUsuario.ObtenerUsuariosSuscritos();
            var emails = usuariosSuscritos.Select(u => u.Email).ToList();
            
            if (emails.Any())
            {
                var subject = $"Nuevo libro disponible: {nuevoLibro.Title}";
                var body = $"Hola,\n\nSe ha añadido un nuevo libro a la biblioteca: '{nuevoLibro.Title}' de {nuevoLibro.Author}.\n\n¡Disfrútalo!";
                await _emailService.SendEmailToAllAsync(emails, subject, body);
            }
        }
        catch (Exception ex)
        {
            // No bloqueamos la creación del libro si falla el email, solo loggeamos
            Console.WriteLine($"Error enviando notificaciones: {ex.Message}");
        }
        // ------------------------------

        return Result<Libro>.Created(nuevoLibro, "Libro creado exitosamente.");
    }

    /// <inheritdoc />
    public async Task<Result<List<Libro>>> ObtenerLibrosUsuario(int userId)
    {
        var libros = await _repoLibro.LibrosEnBibliotecaUsuario(userId);

        if (libros == null || !libros.Any())
            // Nota: Cambié NotFound por Ok con lista vacía para que el frontend no de error 404 si está vacía
            return Result<List<Libro>>.Ok(new List<Libro>()); 

        // --- ROMPER EL CICLO MANUALMENTE ---
        foreach (var libro in libros)
        {
            if (libro.Genre != null)
            {
                libro.Genre.Books = null; // Cortamos la referencia circular aquí
            }
        }
        // -----------------------------------

        return Result<List<Libro>>.Ok(libros);
    }

    /// <inheritdoc />
    public async Task<Result<List<Libro>>> ObtenerLibrosDisponibles(int userId, string? filterTitle)
    {
        var libros = await _repoLibro.LibrosNoEnBibliotecaUsuario(userId);

        if (!string.IsNullOrEmpty(filterTitle))
        {
            filterTitle = filterTitle.ToLower();
            libros = libros.Where(l => l.Title.ToLower().Contains(filterTitle)).ToList();
        }

        // --- ROMPER EL CICLO MANUALMENTE ---
        foreach (var libro in libros)
        {
            if (libro.Genre != null)
            {
                libro.Genre.Books = null; // Cortamos la referencia circular aquí
            }
        }
        // -----------------------------------

        if (!libros.Any())
             return Result<List<Libro>>.Ok(new List<Libro>()); // Retornar lista vacía es mejor que error

        return Result<List<Libro>>.Ok(libros);
    }
}