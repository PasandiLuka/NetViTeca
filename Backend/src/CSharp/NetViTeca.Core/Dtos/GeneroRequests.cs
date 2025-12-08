namespace NetViTeca.Core.Dtos;

/// <summary>
/// DTO que encapsula los datos necesarios para registrar un nuevo Género.
/// </summary>
public class AltaGeneroRequest
{
    /// <summary>Nombre del género a crear.</summary>
    public string Name { get; set; } = string.Empty;
}