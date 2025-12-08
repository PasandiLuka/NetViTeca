using NetViTeca.Core.Dtos;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Core.IServices;

/// <summary>
/// Implementación concreta del servicio de Géneros.
/// </summary>
public class GeneroService : IGeneroService
{
    private readonly IRepoGenero _repoGenero;

    public GeneroService(IRepoGenero repoGenero)
    {
        _repoGenero = repoGenero;
    }

    /// <inheritdoc/>
    public async Task<Result<Genero>> CrearGenero(AltaGeneroRequest request)
    {
        // Validacion simple
        if (string.IsNullOrWhiteSpace(request.Name))
            return Result<Genero>.BadRequest("El nombre del género es obligatorio.");

        var nuevoGenero = new Genero { Name = request.Name };
        
        await _repoGenero.AltaGenero(nuevoGenero);

        return Result<Genero>.Created(nuevoGenero, "Género creado exitosamente.");
    }

    /// <inheritdoc />
    public async Task<Result<List<Genero>>> ObtenerGeneros()
    {
        // Actualizamos la llamada: ObtenerTodos() -> ObtenerGeneros()
        var generos = await _repoGenero.ObtenerGeneros(); 

        if (generos == null || !generos.Any())
            return Result<List<Genero>>.NotFound("No se encontraron géneros registrados.");

        return Result<List<Genero>>.Ok(generos);
    }
}