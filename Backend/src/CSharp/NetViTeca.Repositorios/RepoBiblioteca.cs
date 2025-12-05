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

    /// <summary>
    /// Inserta múltiples registros en la tabla Biblioteca y guarda los cambios.
    /// </summary>
    /// <param name="nuevosRegistros">Lista de objetos Biblioteca a insertar.</param>
    public async Task AsignarLibrosAUsuario(List<Biblioteca> nuevosRegistros)
    {
        // _context viene heredado de RepoBaseAdo
        await _context.Bibliotecas.AddRangeAsync(nuevosRegistros);
        await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<bool> RetirarLibroAUsuario(int idLibro, int idUsuario)
    {
        // Buscamos el registro usando la clave compuesta (idLibro, idUsuario)
        var registro = await _context.Bibliotecas.FindAsync(idLibro, idUsuario);

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