using NetViTeca.Core.Models;
using NetViTeca.Core.Dtos;

namespace NetViTeca.Core.IServices;
/// <summary>
/// Define el contrato para la lógica de negocio relacionada con los Géneros literarios.
/// </summary>
public interface IGeneroService
{
    /// <summary>
    /// Valida y orquesta la creación de un nuevo género en el sistema.
    /// </summary>
    /// <param name="request">Datos del género a crear.</param>
    /// <returns>Resultado con la entidad creada o mensaje de error.</returns>
    Task<Result<Genero>> CrearGenero(AltaGeneroRequest request);

    /// <summary>
    /// Recupera la lista completa de géneros.
    /// </summary>
    /// <returns>Resultado exitoso con la lista de géneros o NotFound si está vacía.</returns>
    Task<Result<List<Genero>>> ObtenerGeneros();
}