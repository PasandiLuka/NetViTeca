using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO utilizado para recibir los datos de actualización del perfil de usuario.
/// </summary>
public class UsuarioActualizacionRequestDTO
{
    [Required(ErrorMessage = "Full name is required.")]
    [StringLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Phone(ErrorMessage = "Invalid phone number.")]
    [StringLength(20)]
    public string Phone { get; set; } = string.Empty;
}
