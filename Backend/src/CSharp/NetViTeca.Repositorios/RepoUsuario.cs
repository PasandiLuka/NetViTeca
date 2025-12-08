using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Repositorios;

namespace NetViTeca.Data.Repositorios;

/// <summary>
/// Implementación del repositorio para la entidad Usuario, utilizando Entity Framework Core.
/// </summary>
public class RepoUsuario : RepoBaseAdo, IRepoUsuario
{
    private readonly NetViTecaDbContext _contexto;

    /// <summary>
    /// Constructor del Repositorio de Usuario.
    /// </summary>
    /// <param name="contexto">El contexto de base de datos de EF Core.</param>
    public RepoUsuario(NetViTecaDbContext contexto) : base (contexto)
    {
        _contexto = contexto;
    }

    /// <inheritdoc/>
    /// <inheritdoc/>
    public async Task<Usuario> AgregarUsuario(Usuario usuario)
    {
        await _contexto.Usuarios.AddAsync(usuario);
        await _contexto.SaveChangesAsync();
        return usuario;
    }

    /// <inheritdoc/>
    public async Task<Usuario?> ObtenerUsuarioPorCorreo(string email)
    {
        // Busca el usuario por correo para que la capa de servicio pueda verificar el hash.
        return await _contexto.Usuarios
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    /// <inheritdoc/>
    public async Task<Usuario?> ObtenerUsuarioPorId(int id)
    {
        return await _contexto.Usuarios.FindAsync(id);
    }

    /// <inheritdoc/>
    public async Task ActualizarUsuario(Usuario usuario)
    {
        _contexto.Usuarios.Update(usuario);
        await _contexto.SaveChangesAsync();
    }

    /// <inheritdoc/>
    public async Task<bool> CorreoExiste(string email)
    {
        return await _contexto.Usuarios
            .AnyAsync(u => u.Email == email);
    }

    /// <inheritdoc/>
    public async Task<bool> UsuarioExiste(string username)
    {
        // Verifica si existe algún registro donde nombreUsuario sea igual al parámetro
        return await _contexto.Usuarios
            .AnyAsync(u => u.Username == username);
    }

    /// <inheritdoc/>
    public async Task<List<Usuario>> ObtenerUsuariosSuscritos()
    {
        return await _contexto.Usuarios
            .Where(u => u.ReceiveNotifications)
            .ToListAsync();
    }
}