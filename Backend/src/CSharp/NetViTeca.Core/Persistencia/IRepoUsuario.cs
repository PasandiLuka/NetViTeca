using NetViTeca.Core.Models;

namespace NetViTeca.Core.Persistencia;

/// <summary>
/// Define las operaciones de acceso a datos para la entidad Usuario.
/// </summary>
public interface IRepoUsuario
{
    /// <summary>
    /// Agrega un nuevo usuario a la base de datos.
    /// </summary>
    /// <param name="usuario">El objeto Usuario a crear.</param>
    /// <returns>El Usuario creado con el ID actualizado.</returns>
    Task<Usuario> AgregarUsuario(Usuario usuario);

    /// <summary>
    /// Busca un usuario basándose únicamente en su correo electrónico.
    /// </summary>
    /// <param name="correo">El correo electrónico del usuario.</param>
    /// <returns>El Usuario encontrado o <c>null</c> si no existe.</returns>
    Task<Usuario?> ObtenerUsuarioPorCorreo(string correo);

    /// <summary>
    /// Verifica si ya existe un usuario con el correo electrónico proporcionado.
    /// </summary>
    /// <param name="correo">El correo electrónico a verificar.</param>
    /// <returns><c>true</c> si el correo ya existe, de lo contrario <c>false</c>.</returns>
    Task<bool> CorreoExiste(string correo);

    /// <summary>
    /// Verifica si ya existe un usuario con el nombre de usuario proporcionado.
    /// </summary>
    /// <param name="usuario">El nombre de usuario a verificar.</param>
    /// <returns><c>true</c> si el nombre de usuario ya existe, de lo contrario <c>false</c>.</returns>
    Task<bool> UsuarioExiste(string usuario);
}