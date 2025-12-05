namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO que encapsula la solicitud para asignar libros a un usuario.
/// </summary>
public class AsignarLibrosRequest
{
    /// <summary>Identificador del usuario al que se le asignarán los libros.</summary>
    public int IdUsuario { get; set; }

    /// <summary>Lista de IDs de los libros a asignar.</summary>
    public List<int> IdsLibros { get; set; } = new();
}