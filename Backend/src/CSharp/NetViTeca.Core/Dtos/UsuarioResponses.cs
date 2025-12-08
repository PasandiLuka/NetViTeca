namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO utilizado para enviar información de un usuario al cliente tras el login/registro.
/// Contiene solo los datos esenciales para la sesión.
/// </summary>
public class UsuarioResponseDTO
{
    /// <summary>
    /// Id del usuario
    /// </summary>
    public int idUsuario { get; set; }

    /// <summary>
    /// Nombre de usuario único.
    /// </summary>
    public string nombreUsuario { get; set; } = string.Empty;

    /// <summary>
    /// Correo electrónico del usuario.
    /// </summary>
    public string correo { get; set; } = string.Empty;
}