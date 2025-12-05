namespace NetViTeca.Core.Models;

public class Biblioteca
{
    public int idLibro { get; set; }
    public int? idUsuario { get; set; }

    public Libro Libros { get; set; }

    public Usuario Usuarios { get; set; }
}