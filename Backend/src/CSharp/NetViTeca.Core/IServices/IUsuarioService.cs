using NetViTeca.Core.Dtos;
using NetViTeca.Core.Models;

namespace NetViTeca.Core.IServices;

/// <summary>
/// Define las operaciones de lógica de negocio para la gestión de usuarios.
/// Implementa el patrón Result para comunicar el éxito o el fallo de las operaciones.
/// </summary>
public interface IUsuarioService
{
    /// <summary>
    /// Procesa la creación de un nuevo usuario a partir de un DTO de solicitud.
    /// </summary>
    /// <param name="request">El DTO con los datos del nuevo usuario.</param>
    /// <returns>Un objeto <c>Result</c> que contiene el Usuario creado en formato DTO en caso de éxito o un mensaje de error.</returns>
    Task<Result<UsuarioResponseDTO>> CrearUsuario(UsuarioCreacionRequestDTO request); // <- Tipo de retorno cambiado

    /// <summary>
    /// Autentica un usuario con sus credenciales.
    /// </summary>
    /// <param name="correo">El correo electrónico para la autenticación.</param>
    /// <param name="contrasena">La contraseña para la autenticación.</param>
    /// <returns>Un objeto <c>Result</c> que contiene el Usuario autenticado en formato DTO en caso de éxito o un mensaje de error.</returns>
    Task<Result<UsuarioResponseDTO>> AutenticarUsuario(string email, string password); // <- Tipo de retorno cambiado

    /// <summary>
    /// Actualiza la información del perfil de un usuario.
    /// </summary>
    /// <param name="id">El ID del usuario a actualizar.</param>
    /// <param name="request">DTO con los datos a actualizar.</param>
    /// <returns>Result con el usuario actualizado.</returns>
    Task<Result<UsuarioResponseDTO>> ActualizarUsuario(int id, UsuarioActualizacionRequestDTO request);
}