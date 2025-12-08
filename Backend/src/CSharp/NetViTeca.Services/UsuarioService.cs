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
    /// <inheritdoc/>
    public async Task<Result<UsuarioResponseDTO>> CrearUsuario(UsuarioCreacionRequestDTO request)
    {
        // 1. Mapeo del DTO de Solicitud a la entidad de dominio
        var nuevoUsuario = new Usuario
        {
            FullName = request.FullName,
            Username = request.Username,
            Email = request.Email,
            Password = PasswordUtils.HashPassword(request.Password), 
            Phone = request.Phone
        };

        // 2. Lógica de negocio: Verificar duplicados
        if (await _repoUsuario.UsuarioExiste(nuevoUsuario.Username))
        {
            return Result<UsuarioResponseDTO>.BadRequest($"El nombre de usuario '{nuevoUsuario.Username}' ya está en uso.");
        }

        if (await _repoUsuario.CorreoExiste(nuevoUsuario.Email))
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
    public async Task<Result<UsuarioResponseDTO>> AutenticarUsuario(string email, string password)
    {
        // 1. Obtener el usuario por correo
        var usuario = await _repoUsuario.ObtenerUsuarioPorCorreo(email);

        // 2. Verificar existencia y contraseña hasheada
        if (usuario is null || !PasswordUtils.VerificarPassword(password, usuario.Password))
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
            Id = usuario.Id,
            Username = usuario.Username,
            Email = usuario.Email
        };
    }
}