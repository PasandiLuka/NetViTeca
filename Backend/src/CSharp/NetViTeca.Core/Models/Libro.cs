using System.ComponentModel.DataAnnotations;

namespace NetViTeca.Core.Models;

public class Libro
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "The genre is required.")]
    public int? GenreId { get; set; }

    public Genero Genre { get; set; }

    [Required(ErrorMessage = "The title is required.")]
    public string Title { get; set; }

    [Required(ErrorMessage = "The editorial is required.")]
    public string Editorial { get; set; }

    [Required(ErrorMessage = "The author is required.")]
    public string Author { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.Now;

    [Required(ErrorMessage = "The page count is required.")]
    [Range(1, int.MaxValue, ErrorMessage = "Page count must be greater than 1")]
    public int PageCount { get; set; }

    // New Fields
    public string Description { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public string Url { get; set; } = string.Empty;
}