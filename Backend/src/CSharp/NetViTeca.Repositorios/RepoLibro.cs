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
        // Fix: Query the 'Bibliotecas' table to join and get the ReadCount
        return await _context.Bibliotecas
            .Where(b => b.UserId == userId)
            .Include(b => b.Book)
            .ThenInclude(l => l.Genre)
            .Select(b => new Libro
            {
                Id = b.Book.Id,
                GenreId = b.Book.GenreId,
                Genre = b.Book.Genre,
                Title = b.Book.Title,
                Editorial = b.Book.Editorial,
                Author = b.Book.Author,
                CreatedAt = b.Book.CreatedAt,
                PageCount = b.Book.PageCount,
                Description = b.Book.Description,
                Image = b.Book.Image,
                Url = b.Book.Url,
                PersonalReadCount = b.ReadCount // Populate the unmapped property
            })
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