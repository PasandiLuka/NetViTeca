namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO con la información necesaria para registrar un nuevo libro.
/// </summary>
public class AltaLibroRequest
{
    public int IdGenero { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Editorial { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; }
    public int CantidadPaginas { get; set; }
}