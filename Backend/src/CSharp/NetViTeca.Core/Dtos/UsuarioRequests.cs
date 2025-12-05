using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO utilizado para recibir los datos necesarios para crear un nuevo usuario.
/// Se utiliza para la validación de la API y la transferencia de datos al servicio.
/// </summary>
public class UsuarioCreacionRequestDTO
{
    [Required(ErrorMessage = "El nombre completo es obligatorio.")]
    [StringLength(45)]
    public string nombreCompleto { get; set; } = string.Empty;


    [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
    [StringLength(45)]
    public string nombreUsuario { get; set; } = string.Empty;


    [Required(ErrorMessage = "El correo es obligatorio.")]
    [EmailAddress(ErrorMessage = "Formato de correo inválido.")]
    public string correo { get; set; } = string.Empty;


    [Required(ErrorMessage = "La contraseña es obligatoria.")]
    [StringLength(45, MinimumLength = 6, ErrorMessage = "Debe tener al menos 6 caracteres.")]
    public string contrasena { get; set; } = string.Empty;


    [Phone(ErrorMessage = "Número de teléfono inválido.")]
    [StringLength(45)]
    public string telefono { get; set; } = string.Empty;
}

/// <summary>
/// DTO utilizado para recibir las credenciales de un usuario al intentar iniciar sesión.
/// </summary>
public class UsuarioLoginRequestDTO
{
    /// <summary>
    /// Correo electrónico del usuario para la autenticación.
    /// </summary>
    [Required(ErrorMessage = "El correo es obligatorio.")]
    [EmailAddress(ErrorMessage = "Formato de correo inválido.")]
    public string correo { get; set; } = string.Empty;

    /// <summary>
    /// Contraseña del usuario en texto plano.
    /// </summary>
    [Required(ErrorMessage = "La contraseña es obligatoria.")]
    [StringLength(45, MinimumLength = 6, ErrorMessage = "Debe tener al menos 6 caracteres.")]
    public string contrasena { get; set; } = string.Empty;
}