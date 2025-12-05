namespace NetViTeca.Api.Endpoints;

/// <summary>
/// Clase centralizadora para registrar todos los módulos de endpoints de la API.
/// </summary>
public static class AppEndpoints
{
    /// <summary>
    /// Método de extensión para registrar todas las rutas de la aplicación.
    /// </summary>
    public static WebApplication MapAllEndpoints(this WebApplication app)
    {
        // Cada grupo se registra por separado
        app.MapGeneroEndpoints();
        app.MapLibroEndpoints();
        app.MapBibliotecaEndpoints();

        return app;
    }
}