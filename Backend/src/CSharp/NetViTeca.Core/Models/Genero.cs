using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Genero
{
    [Required(ErrorMessage = "El genero es obligatorio.")]
    public int? idGenero { get; set; }


    [Required(ErrorMessage = "El genero es obligatorio.")]
    [StringLength(45, ErrorMessage = "Máximo 45 caracteres.")]
    public string genero { get; set; }


    public ICollection<Libro> libros { get; set; }  // colección de libros
    
    public Genero() { }
}