using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Data;

namespace NetViTeca.Repositorios;

/// <summary>
/// Implementación del repositorio para la entidad Biblioteca.
/// Hereda de RepoBaseAdo para obtener acceso al DbContext.
/// </summary>
public class RepoBiblioteca : RepoBaseAdo, IRepoBiblioteca
{
    /// <summary>
    /// Inicializa una nueva instancia.
    /// </summary>
    public RepoBiblioteca(NetViTecaDbContext context) : base(context) { }

    /// <inheritdoc />
    public async Task AsignarLibrosAUsuario(List<Biblioteca> nuevosRegistros)
    {
        // _context viene heredado de RepoBaseAdo
        await _context.Bibliotecas.AddRangeAsync(nuevosRegistros);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    /// <inheritdoc />
    public async Task<bool> RetirarLibroAUsuario(int bookId, int userId)
    {
        // Buscamos el registro usando la clave compuesta (idLibro, idUsuario)
        var registro = await _context.Bibliotecas.FindAsync(bookId, userId);

        if (registro == null)
        {
            return false;
        }

        // Eliminamos el registro y guardamos
        _context.Bibliotecas.Remove(registro);
        await _context.SaveChangesAsync();
        return true;
    }
}