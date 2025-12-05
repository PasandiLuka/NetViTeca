using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Libro
{
    public int idLibro { get; set; } = 0;


    [Required(ErrorMessage = "Debes elegir un género.")]
    public int? idGenero { get; set; }


    public Genero genero { get; set; }


    [Required(ErrorMessage = "El titulo es obligatorio.")]
    public string titulo { get; set; }


    [Required(ErrorMessage = "La editorial es obligatoria.")]
    public string editorial { get; set; }


    [Required(ErrorMessage = "El autor es obligatorio.")]
    public string autor { get; set; }


    public DateTime fechaCreacion { get; set; }


    [Required(ErrorMessage = "La cantidad paginas es obligatoria.")]
    [Range(1, int.MaxValue, ErrorMessage = "La cantidad de paginas tiene que ser mayor a 1")]
    public int cantidadPaginas { get; set; }
}