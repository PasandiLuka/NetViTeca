namespace NetViTeca.Core.Models;

public class Biblioteca
{
    public int BookId { get; set; }
    public int? UserId { get; set; }

    public Libro Book { get; set; }

    public Usuario User { get; set; }

    public int ReadCount { get; set; } = 0;
}