using Microsoft.AspNetCore.Mvc;
using NetViTeca.Services;
using NetViTeca.Core.Dtos;
using NetViTeca.Api.Helper; // Para el .ToMinimalResult()

namespace NetViTeca.Api.Endpoints;

/// <summary>
/// Endpoints agrupados para la gestión del recurso 'Libros'.
/// </summary>
public static class LibroEndpoints
{
    public static WebApplication MapLibroEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/libros").WithTags("Libros");

        /// <summary>
        /// Crea un nuevo libro.
        /// URL: POST /api/libros
        /// </summary>
        group.MapPost("/", async ([FromBody] AltaLibroRequest request, ILibroService service) =>
        {
            var result = await service.CrearLibro(request);
            return result.ToMinimalResult();
        })
        .WithName("CrearLibro")
        .WithOpenApi(op => new(op) { Summary = "Crear Libro", Description = "Registra un nuevo libro en el catálogo general." });

        /// <summary>
        /// Obtiene los libros que YA TIENE el usuario (Su biblioteca personal).
        /// URL: GET /api/libros/usuario/{idUsuario}
        /// </summary>
        group.MapGet("/usuario/{idUsuario}", async (int idUsuario, ILibroService service) =>
        {
            var result = await service.ObtenerLibrosUsuario(idUsuario);
            return result.ToMinimalResult();
        })
        .WithName("GetLibrosUsuario")
        .WithOpenApi(op => new(op) { Summary = "Libros del Usuario", Description = "Lista los libros que el usuario ya ha adquirido." });

        /// <summary>
        /// Obtiene los libros DISPONIBLES (Que NO tiene el usuario).
        /// URL: GET /api/libros/disponibles/{idUsuario}
        /// </summary>
        group.MapGet("/disponibles/{idUsuario}", async (int idUsuario, [FromQuery] string? filtro, ILibroService service) =>
        {
            var result = await service.ObtenerLibrosDisponibles(idUsuario, filtro);
            return result.ToMinimalResult();
        })
        .WithName("GetLibrosDisponibles")
        .WithOpenApi(op => new(op) { Summary = "Libros Disponibles", Description = "Lista los libros que el usuario aún no tiene." });

        return app;
    }
}