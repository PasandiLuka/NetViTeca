namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO con la información necesaria para registrar un nuevo libro.
/// </summary>
public class AltaLibroRequest
{
    public int GenreId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Editorial { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public int PageCount { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Image { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}