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
    public async Task<Usuario> AgregarUsuario(Usuario usuario)
    {
        await _contexto.Usuarios.AddAsync(usuario);
        await _contexto.SaveChangesAsync();
        return usuario;
    }

    /// <inheritdoc/>
    public async Task<Usuario?> ObtenerUsuarioPorCorreo(string correo)
    {
        // Busca el usuario por correo para que la capa de servicio pueda verificar el hash.
        return await _contexto.Usuarios
            .FirstOrDefaultAsync(u => u.correo == correo);
    }

    /// <inheritdoc/>
    public async Task<bool> CorreoExiste(string correo)
    {
        return await _contexto.Usuarios
            .AnyAsync(u => u.correo == correo);
    }

    /// <inheritdoc/>
    public async Task<bool> UsuarioExiste(string usuario)
    {
        // Verifica si existe algún registro donde nombreUsuario sea igual al parámetro
        return await _contexto.Usuarios
            .AnyAsync(u => u.nombreUsuario == usuario);
    }
}