using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Data;
using NetViTeca.Repositorios;

namespace NetViTeca.Repositories;

/// <summary>
/// Implementación del repositorio de Libros.
/// Hereda de RepoBaseAdo para acceder al _context.
/// </summary>
public class RepoLibro : RepoBaseAdo, IRepoLibro
{
    public RepoLibro(NetViTecaDbContext context) : base(context) { }

    /// <inheritdoc />
    public async Task AltaLibro(Libro libro)
    {
        await _context.Libros.AddAsync(libro);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<List<Libro>> LibrosEnBibliotecaUsuario(int idUsuario)
    {
        // Fix: Query the 'Libros' table directly
        return await _context.Libros
            .Include(l => l.genero) // 1. Apply Include directly on the Libro
            .Where(l => _context.Bibliotecas
                // 2. Filter: Check if this book ID exists in the Bibliotecas table for this user
                .Any(b => b.idUsuario == idUsuario && b.idLibro == l.idLibro)) 
            .OrderBy(l => l.idLibro)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<List<Libro>> LibrosNoEnBibliotecaUsuario(int idUsuario)
    {
        // Trae los libros que NO tienen vinculo con el usuario
        return await _context.Libros
            .Include(l => l.genero)
            .Where(l => !_context.Bibliotecas.Any(b => b.idLibro == l.idLibro && b.idUsuario == idUsuario))
            .OrderBy(l => l.idLibro)
            .ToListAsync();
    }
}