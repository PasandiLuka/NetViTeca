using Microsoft.AspNetCore.Mvc;
using NetViTeca.Core.Dtos;
using NetViTeca.Api.Helper;
using NetViTeca.Core.IServices;

namespace NetViTeca.Api.Endpoints;

/// <summary>
/// Define los endpoints para el recurso 'Generos'.
/// </summary>
public static class GeneroEndpoints
{
    public static WebApplication MapGeneroEndpoints(this WebApplication app)
    {
        // Agrupamos bajo la ruta base del recurso
        var group = app.MapGroup("/api/generos").WithTags("Generos");

        /// <summary>
        /// Crea un nuevo género.
        /// URL: POST /api/generos
        /// </summary>
        group.MapPost("/", async ([FromBody] AltaGeneroRequest request, IGeneroService service) =>
        {
            var result = await service.CrearGenero(request);
            return result.ToMinimalResult();
        })
        .WithName("CrearGenero")
        .WithOpenApi(op => new(op) { Summary = "Crear Género", Description = "Crea un nuevo recurso de género literario." });

        /// <summary>
        /// Obtiene todos los géneros.
        /// URL: GET /api/generos
        /// </summary>
        group.MapGet("/", async (IGeneroService service) =>
        {
            // Actualizamos la llamada: ListarGeneros() -> ObtenerGeneros()
            var result = await service.ObtenerGeneros(); 
            return result.ToMinimalResult();
        })
        .WithName("ListarGeneros")
        .WithOpenApi(op => new(op) { Summary = "Listar Géneros", Description = "Trae un listado de todos los géneros creados." });

        return app;
    }
}