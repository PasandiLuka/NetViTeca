using System.Security.Cryptography;
using System.Text;

namespace NetViTeca.Core.Utils;

/// <summary>
/// Proporciona métodos estáticos para el hasheo y verificación de contraseñas.
/// </summary>
public static class PasswordUtils
{
    /// <summary>
    /// Genera un hash SHA256 para la contraseña proporcionada.
    /// </summary>
    /// <param name="password">La contraseña en texto plano.</param>
    /// <returns>La contraseña hasheada como una cadena en minúsculas.</returns>
    public static string HashPassword(string password)
    {
        using var sha = SHA256.Create();
        var hash = sha.ComputeHash(Encoding.UTF8.GetBytes(password));
        // Se usa ToLowerInvariant para estandarizar el formato del hash
        return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
    }

    /// <summary>
    /// Verifica si una contraseña en texto plano coincide con un hash dado.
    /// </summary>
    /// <param name="password">La contraseña en texto plano proporcionada por el usuario.</param>
    /// <param name="hash">El hash de la contraseña almacenado en la base de datos.</param>
    /// <returns><c>true</c> si la contraseña coincide con el hash, de lo contrario <c>false</c>.</returns>
    public static bool VerificarPassword(string password, string hash)
    {
        return HashPassword(password) == hash;
    }
}