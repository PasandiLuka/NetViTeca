using NetViTeca.Core.Enums;
using NetViTeca.Core.Models;

namespace NetViTeca.Api.Helper;

/// <summary>
/// Extensiones para transformar objetos Result del dominio a IResult de HTTP (Minimal API).
/// </summary>
public static class ExtensionesResult
{
    /// <summary>
    /// Convierte un Result genérico en una respuesta HTTP estándar (IResult).
    /// </summary>
    /// <typeparam name="T">Tipo de dato contenido en el Result.</typeparam>
    /// <param name="result">El resultado proveniente del servicio.</param>
    /// <returns>Un IResult configurado según el tipo de resultado (Ok, BadRequest, etc.).</returns>
    public static IResult ToMinimalResult<T>(this Result<T> result)
    {
        return result.ResultType switch
        {
            EResultType.Ok => Results.Ok(result.Data),
            EResultType.Created => Results.Created(string.Empty, result.Data),
            EResultType.NotFound => Results.NotFound(new { message = result.Message }),
            EResultType.Unauthorized => Results.Unauthorized(),
            EResultType.BadRequest => result.Errors != null 
                ? Results.BadRequest(new { errors = result.Errors }) 
                : Results.BadRequest(new { message = result.Message }),
            EResultType.File => Results.File(result.Bytes!, "application/octet-stream"),
            _ => Results.StatusCode(500)
        };
    }
}