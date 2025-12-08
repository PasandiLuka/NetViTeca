using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Usuario
{
    [Key]
    public int Id { get; set; }

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

    public Usuario() { }
}
