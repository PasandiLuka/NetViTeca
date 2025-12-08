using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO utilizado para recibir los datos necesarios para crear un nuevo usuario.
/// Se utiliza para la validación de la API y la transferencia de datos al servicio.
/// </summary>
public class UsuarioCreacionRequestDTO
{
    [Required(ErrorMessage = "Full name is required.")]
    [StringLength(45)]
    public string FullName { get; set; } = string.Empty;


    [Required(ErrorMessage = "Username is required.")]
    [StringLength(45)]
    public string Username { get; set; } = string.Empty;


    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;


    [Required(ErrorMessage = "Password is required.")]
    [StringLength(45, MinimumLength = 6, ErrorMessage = "Must be at least 6 characters.")]
    public string Password { get; set; } = string.Empty;


    [Phone(ErrorMessage = "Invalid phone number.")]
    [StringLength(45)]
    public string Phone { get; set; } = string.Empty;
}

/// <summary>
/// DTO utilizado para recibir las credenciales de un usuario al intentar iniciar sesión.
/// </summary>
public class UsuarioLoginRequestDTO
{
    /// <summary>
    /// Correo electrónico del usuario para la autenticación.
    /// </summary>
    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email format.")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Contraseña del usuario en texto plano.
    /// </summary>
    [Required(ErrorMessage = "Password is required.")]
    [StringLength(45, MinimumLength = 6, ErrorMessage = "Must be at least 6 characters.")]
    public string Password { get; set; } = string.Empty;
}