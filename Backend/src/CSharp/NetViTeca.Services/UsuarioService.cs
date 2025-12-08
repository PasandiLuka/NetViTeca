using NetViTeca.Core.Dtos;
using NetViTeca.Core.IServices;
using NetViTeca.Core.Models;
using NetViTeca.Core.Persistencia;
using NetViTeca.Core.Utils;

namespace NetViTeca.Core.Servicios;

/// <summary>
/// Implementación del servicio de lógica de negocio para la entidad Usuario.
/// </summary>
public class UsuarioService : IUsuarioService
{
    private readonly IRepoUsuario _repoUsuario;

    public UsuarioService(IRepoUsuario repoUsuario)
    {
        _repoUsuario = repoUsuario;
    }

    /// <inheritdoc/>
    public async Task<Result<UsuarioResponseDTO>> CrearUsuario(UsuarioCreacionRequestDTO request)
    {
        // 1. Mapeo del DTO de Solicitud a la entidad de dominio
        var nuevoUsuario = new Usuario
        {
            nombreCompleto = request.nombreCompleto,
            nombreUsuario = request.nombreUsuario,
            correo = request.correo,
            contrasena = PasswordUtils.HashPassword(request.contrasena), 
            numeroTelefono = request.telefono
        };

        // 2. Lógica de negocio: Verificar duplicados
        if (await _repoUsuario.UsuarioExiste(nuevoUsuario.nombreUsuario))
        {
            return Result<UsuarioResponseDTO>.BadRequest($"El nombre de usuario '{nuevoUsuario.nombreUsuario}' ya está en uso.");
        }

        if (await _repoUsuario.CorreoExiste(nuevoUsuario.correo))
        {
            return Result<UsuarioResponseDTO>.BadRequest("El correo electrónico ya está registrado.");
        }

        // 3. Persistencia de datos
        var usuarioCreado = await _repoUsuario.AgregarUsuario(nuevoUsuario);

        // 4. Mapeo a DTO de Respuesta antes de retornar (SOLO campos esenciales)
        var responseDto = MapearAUsuarioResponseDTO(usuarioCreado);

        // Retorna un éxito con el DTO
        return Result<UsuarioResponseDTO>.Ok(responseDto);
    }

    /// <inheritdoc/>
    public async Task<Result<UsuarioResponseDTO>> AutenticarUsuario(string correo, string contrasena)
    {
        // 1. Obtener el usuario por correo
        var usuario = await _repoUsuario.ObtenerUsuarioPorCorreo(correo);

        // 2. Verificar existencia y contraseña hasheada
        if (usuario is null || !PasswordUtils.VerificarPassword(contrasena, usuario.contrasena))
        {
            // Mensaje genérico para no dar pistas sobre si el correo existe
            return Result<UsuarioResponseDTO>.BadRequest("Credenciales de usuario incorrectas.");
        }

        // 3. Mapeo a DTO de Respuesta antes de retornar (SOLO campos esenciales)
        var responseDto = MapearAUsuarioResponseDTO(usuario);

        // 4. Éxito de la autenticación
        return Result<UsuarioResponseDTO>.Ok(responseDto);
    }

    /// <summary>
    /// Método privado para mapear la entidad Usuario al DTO de respuesta.
    /// </summary>
    /// <param name="usuario">La entidad Usuario.</param>
    /// <returns>El DTO de respuesta simplificado.</returns>
    private static UsuarioResponseDTO MapearAUsuarioResponseDTO(Usuario usuario)
    {
        return new UsuarioResponseDTO
        {
            // Mapeo simplificado
            idUsuario = usuario.idUsuario,
            nombreUsuario = usuario.nombreUsuario,
            correo = usuario.correo
        };
    }
}