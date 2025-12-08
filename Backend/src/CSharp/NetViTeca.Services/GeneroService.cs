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
    private readonly IRepoUsuario _repoUsuario;
    private readonly IEmailService _emailService;

    public GeneroService(IRepoGenero repoGenero, IRepoUsuario repoUsuario, IEmailService emailService)
    {
        _repoGenero = repoGenero;
        _repoUsuario = repoUsuario;
        _emailService = emailService;
    }

    /// <inheritdoc/>
    public async Task<Result<Genero>> CrearGenero(AltaGeneroRequest request)
    {
        // Validacion simple
        if (string.IsNullOrWhiteSpace(request.Name))
            return Result<Genero>.BadRequest("El nombre del género es obligatorio.");

        var nuevoGenero = new Genero { Name = request.Name };
        
        await _repoGenero.AltaGenero(nuevoGenero);

        // --- NOTIFICACIÓN POR EMAIL ---
        try 
        {
            var usuariosSuscritos = await _repoUsuario.ObtenerUsuariosSuscritos();
            var emails = usuariosSuscritos.Select(u => u.Email).ToList();
            
            if (emails.Any())
            {
                var subject = $"Nuevo género literario: {nuevoGenero.Name}";
                var body = $"Hola,\n\nSe ha añadido una nueva clasificaciÃ³n a la biblioteca: '{nuevoGenero.Name}'.\n\n¡Explora los títulos relacionados!";
                await _emailService.SendEmailToAllAsync(emails, subject, body);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error enviando notificaciones: {ex.Message}");
        }
        // ------------------------------

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