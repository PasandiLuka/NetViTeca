using Microsoft.AspNetCore.Mvc;
using NetViTeca.Core.Dtos;
using NetViTeca.Api.Helper;
using NetViTeca.Core.IServices;

namespace NetViTeca.Api.Endpoints;

/// <summary>
/// Define los endpoints para el recurso 'Bibliotecas' (Asignaciones/Préstamos).
/// </summary>
public static class BibliotecaEndpoints
{
    public static WebApplication MapBibliotecaEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/bibliotecas").WithTags("Biblioteca");

        /// <summary>
        /// Crea nuevos registros en la biblioteca (Asigna libros).
        /// URL: POST /api/bibliotecas
        /// </summary>
        group.MapPost("/", async ([FromBody] AsignarLibrosRequest request, IBibliotecaService service) =>
        {
            var result = await service.RegistrarLibrosSeleccionados(request.IdUsuario, request.IdsLibros);
            return result.ToMinimalResult();
        })
        .WithName("AsignarLibros") // El nombre interno
        .WithOpenApi(op => new(op) { Summary = "Asignar Libros", Description = "Crea registros de asignación en la biblioteca del usuario." });

        /// <summary>
        /// Elimina una asignación (retira un libro de la biblioteca de un usuario).
        /// URL: DELETE /api/bibliotecas/{idUsuario}/{idLibro}
        /// </summary>
        group.MapDelete("/{idUsuario}/{idLibro}", async (int idUsuario, int idLibro, IBibliotecaService service) =>
        {
            var result = await service.RetirarLibroAUsuario(idLibro, idUsuario);
            return result.ToMinimalResult();
        })
        .WithName("RetirarLibroUsuario")
        .WithOpenApi(op => new(op) { Summary = "Retirar Libro", Description = "Elimina un libro específico de la colección personal del usuario (DELETE)." });

        return app;
    }
}