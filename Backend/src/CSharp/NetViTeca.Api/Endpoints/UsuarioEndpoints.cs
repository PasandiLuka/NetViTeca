using Microsoft.AspNetCore.Mvc;
using NetViTeca.Core.Dtos;
using NetViTeca.Api.Helper;
using NetViTeca.Core.IServices;

namespace NetViTeca.Api.Endpoints;

/// <summary>
/// Define los endpoints para la gestión de usuarios (Registro y Autenticación).
/// </summary>
public static class UsuarioEndpoints
{
    /// <summary>
    /// Mapea los endpoints de la API relacionados con la gestión de usuarios.
    /// </summary>
    /// <param name="app">La instancia de WebApplication.</param>
    /// <returns>La instancia de WebApplication para el encadenamiento de métodos.</returns>
    public static WebApplication MapUsuarioEndpoints(this WebApplication app)
    {
        // Se define el grupo base para los endpoints de usuario
        var group = app.MapGroup("/api/usuarios").WithTags("Usuarios");

        /// <summary>
        /// Registra un nuevo usuario en el sistema.
        /// URL: POST /api/usuarios/registro
        /// </summary>
        group.MapPost("/registro", async ([FromBody] UsuarioCreacionRequestDTO request, IUsuarioService service) =>
        {
            // El servicio devuelve Result<UsuarioResponseDTO> (con solo NombreUsuario y Correo)
            var result = await service.CrearUsuario(request);
            
            // ToMinimalResult convierte el Result<T> en IResult (Ok, BadRequest, etc.)
            // Usamos Status201Created para la creación exitosa de un recurso.
            return result.ToMinimalResult();
        })
        .WithName("RegistrarUsuario")
        .WithOpenApi(op => new(op) 
        { 
            Summary = "Registrar Nuevo Usuario", 
            Description = "Crea un nuevo usuario, hashea la contraseña y verifica la unicidad del correo. Retorna el DTO de respuesta simplificado." 
        });

        /// <summary>
        /// Autentica a un usuario y lo "logea" en el sistema.
        /// URL: POST /api/usuarios/login
        /// </summary>
        group.MapPost("/login", async ([FromBody] UsuarioLoginRequestDTO request, IUsuarioService service) =>
        {
            // El servicio devuelve Result<UsuarioResponseDTO> (con solo NombreUsuario y Correo)
            var result = await service.AutenticarUsuario(request.Email, request.Password);
            
            // ToMinimalResult maneja el fallo (ej. Credenciales incorrectas) o el éxito (retornando el DTO simplificado).
            return result.ToMinimalResult();
        })
        .WithName("LoginUsuario")
        .WithOpenApi(op => new(op) 
        { 
            Summary = "Autenticar Usuario", 
            Description = "Verifica las credenciales del usuario y devuelve el NombreUsuario y Correo si el login es exitoso." 
        });

        /// <summary>
        /// Actualiza la información del perfil del usuario.
        /// URL: PUT /api/usuarios/{id}
        /// </summary>
        group.MapPut("/{id}", async (int id, [FromBody] UsuarioActualizacionRequestDTO request, IUsuarioService service) =>
        {
            var result = await service.ActualizarUsuario(id, request);
            return result.ToMinimalResult();
        })
        .WithName("ActualizarUsuario")
        .WithOpenApi(op => new(op)
        {
            Summary = "Actualizar Perfil de Usuario",
            Description = "Actualiza el nombre completo y teléfono de un usuario existente."
        });

        return app;
    }
}