using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Usuario
{

    [Key]
    public int? idUsuario { get; set; }

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
    public string numeroTelefono { get; set; } = string.Empty;


    public Usuario() { }

}
