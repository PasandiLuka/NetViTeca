using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Genero
{
    [Key]
    public int? Id { get; set; }

    [Required(ErrorMessage = "The genre name is required.")]
    [StringLength(45, ErrorMessage = "Max 45 characters.")]
    public string Name { get; set; }

    public ICollection<Libro> Books { get; set; }  // collection of books
    
    public Genero() { }
}