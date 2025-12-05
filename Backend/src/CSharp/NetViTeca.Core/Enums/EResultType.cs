namespace NetViTeca.Core.Enums;

/// <summary>
/// Define los tipos de resultados posibles de una operación de servicio,
/// mapeados para corresponder con códigos de estado HTTP.
/// </summary>
public enum EResultType
{
    /// <summary>Operación exitosa (HTTP 200).</summary>
    Ok,
    /// <summary>Recurso creado exitosamente (HTTP 201).</summary>
    Created,
    /// <summary>Recurso no encontrado (HTTP 404).</summary>
    NotFound,
    /// <summary>Acceso no autorizado (HTTP 401).</summary>
    Unauthorized,
    /// <summary>Solicitud incorrecta o error de validación (HTTP 400).</summary>
    BadRequest,
    /// <summary>Resultado que contiene un archivo binario (HTTP 200/File).</summary>
    File
}