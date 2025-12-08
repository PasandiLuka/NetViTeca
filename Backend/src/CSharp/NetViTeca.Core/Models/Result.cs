using NetViTeca.Core.Enums;

namespace NetViTeca.Core.Models;

/// <summary>
/// Envoltura genérica para estandarizar las respuestas de la capa de servicios.
/// Elimina la necesidad de usar excepciones para controlar el flujo de errores lógicos.
/// </summary>
/// <typeparam name="T">Tipo de dato que devuelve la operación en caso de éxito.</typeparam>
public class Result<T>
{
    /// <summary>Indica si la operación se completó exitosamente.</summary>
    public bool Success { get; private set; }

    /// <summary>Los datos resultantes de la operación (puede ser nulo si falló).</summary>
    public T? Data { get; private set; }

    /// <summary>Mensaje descriptivo del resultado (útil para errores o confirmaciones).</summary>
    public string? Message { get; private set; }

    /// <summary>Categoría del resultado para determinar el código HTTP asociado.</summary>
    public EResultType ResultType { get; private set; }

    /// <summary>Diccionario de errores de validación (Campo -> Errores).</summary>
    public IDictionary<string, string[]>? Errors { get; private set; }

    /// <summary>Bytes del archivo, si el resultado es de tipo File.</summary>
    public byte[]? Bytes { get; private set; }

    // Constructor privado para obligar el uso de los métodos estáticos (Factory Methods)
    private Result(bool success, EResultType resultType, T? data = default, string? message = null, IDictionary<string, string[]>? errors = null, byte[]? bytes = null)
    {
        Success = success;
        ResultType = resultType;
        Data = data;
        Message = message;
        Errors = errors;
        Bytes = bytes;
    }

    /// <summary>Crea un resultado exitoso (HTTP 200).</summary>
    public static Result<T> Ok(T? data = default, string? message = null)
        => new(true, EResultType.Ok, data, message);

    /// <summary>Crea un resultado de creación exitosa (HTTP 201).</summary>
    public static Result<T> Created(T data, string? message = null)
        => new(true, EResultType.Created, data, message);

    /// <summary>Crea un resultado de error "No Encontrado" (HTTP 404).</summary>
    public static Result<T> NotFound(string message)
        => new(false, EResultType.NotFound, default, message);

    /// <summary>Crea un resultado de error "No Autorizado" (HTTP 401).</summary>
    public static Result<T> Unauthorized()
        => new(false, EResultType.Unauthorized, default, default, default);

    /// <summary>Crea un resultado de error "Solicitud Incorrecta" (HTTP 400).</summary>
    public static Result<T> BadRequest(string message)
         => new(false, EResultType.BadRequest, default, message);

    /// <summary>Crea un resultado de error de validación múltiple (HTTP 400).</summary>
    public static Result<T> BadRequest(IDictionary<string, string[]> errors)
        => new(false, EResultType.BadRequest, default, default, errors);

    /// <summary>Crea un resultado que contiene un archivo.</summary>
    public static Result<T> File(byte[]? bytes)
        => new(true, EResultType.File, default, default, default, bytes);
}