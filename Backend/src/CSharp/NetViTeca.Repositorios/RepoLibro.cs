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
    /// <inheritdoc />
    public async Task<List<Libro>> LibrosEnBibliotecaUsuario(int userId)
    {
        // Fix: Query the 'Libros' table directly
        return await _context.Libros
            .Include(l => l.Genre) // 1. Apply Include directly on the Libro
            .Where(l => _context.Bibliotecas
                // 2. Filter: Check if this book ID exists in the Bibliotecas table for this user
                .Any(b => b.UserId == userId && b.BookId == l.Id)) 
            .OrderBy(l => l.Id)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<List<Libro>> LibrosNoEnBibliotecaUsuario(int userId)
    {
        // Trae los libros que NO tienen vinculo con el usuario
        return await _context.Libros
            .Include(l => l.Genre)
            .Where(l => !_context.Bibliotecas.Any(b => b.BookId == l.Id && b.UserId == userId))
            .OrderBy(l => l.Id)
            .ToListAsync();
    }
}