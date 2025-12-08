using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Data;

namespace NetViTeca.Repositorios;

/// <summary>
/// Implementación del repositorio para la entidad Genero.
/// Hereda de RepoBaseAdo para obtener acceso al DbContext.
/// </summary>
public class RepoGenero : RepoBaseAdo, IRepoGenero
{
    /// <summary>
    /// Inicializa una nueva instancia de RepoGenero.
    /// Llama al constructor base para inyectar el DbContext.
    /// </summary>
    /// <param name="context">Contexto de la base de datos.</param>
    public RepoGenero(NetViTecaDbContext context) : base(context) { }

    /// <inheritdoc />
    public async Task AltaGenero(Genero genero)
    {
        // Usamos el campo _context heredado
        await _context.Generos.AddAsync(genero);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<List<Genero>> ObtenerGeneros()
    {
        return await _context.Generos.OrderBy(g => g.Id).ToListAsync();
    }
}