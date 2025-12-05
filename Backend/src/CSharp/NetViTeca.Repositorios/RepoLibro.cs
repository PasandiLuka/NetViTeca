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
        // Trae los libros que están vinculados al usuario en la tabla Biblioteca
        return await _context.Bibliotecas
            .Where(b => b.idUsuario == idUsuario)
            .Select(b => b.Libros)
            .Include(l => l.genero)
            .ToListAsync();
    }

    /// <inheritdoc />
    public async Task<List<Libro>> LibrosNoEnBibliotecaUsuario(int idUsuario)
    {
        // Trae los libros que NO tienen vinculo con el usuario
        return await _context.Libros
            .Include(l => l.genero)
            .Where(l => !_context.Bibliotecas.Any(b => b.idLibro == l.idLibro && b.idUsuario == idUsuario))
            .ToListAsync();
    }
}