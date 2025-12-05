using Microsoft.EntityFrameworkCore;
using NetViTeca.Data;
using System.IO;
using System.Linq;

namespace NetViTeca.Api.Helper;

/// <summary>
/// Proporciona métodos de extensión para aplicar migraciones y realizar la siembra inicial (seeding) de la base de datos.
/// </summary>
public static class MigrationExtensions
{
    /// <summary>
    /// Aplica automáticamente cualquier migración pendiente y realiza la siembra inicial de datos
    /// si la base de datos acaba de ser creada o migrada por primera vez.
    /// </summary>
    /// <param name="app">La instancia de WebApplication donde se aplicará el servicio.</param>
    /// <param name="sqlFilePath">Ruta relativa al archivo .sql con los INSERTs a ejecutar.</param>
    public static void ApplyMigrationsAndSeed(this WebApplication app, string sqlFilePath)
    {
        // Se crea un nuevo alcance de servicio (scope) para resolver los servicios.
        using var scope = app.Services.CreateScope();
        
        var serviceProvider = scope.ServiceProvider;
        var dbContext = serviceProvider.GetRequiredService<NetViTecaDbContext>();
        var logger = serviceProvider.GetRequiredService<ILogger<WebApplication>>();
        // Obtener el entorno de hosting para tener una ruta base confiable
        var env = serviceProvider.GetRequiredService<IHostEnvironment>(); // <-- NUEVO

        try
        {
            // 1. Detección de Migraciones Pendientes y Aplicadas
            var appliedMigrations = dbContext.Database.GetAppliedMigrations().ToList();
            var pendingMigrations = dbContext.Database.GetPendingMigrations().Any();

            // Determinar si es una migración inicial:
            bool isInitialMigration = !appliedMigrations.Any();
            
            // 2. Ejecutar Migraciones
            if (pendingMigrations || isInitialMigration)
            {
                logger.LogInformation("Aplicando migraciones de EF Core...");
                dbContext.Database.Migrate(); 
                logger.LogInformation("Migraciones de EF Core aplicadas correctamente.");
            }

            // 3. Ejecutar Inserts solo si la BD fue recién creada
            if (isInitialMigration)
            {
                // Pasamos el IHostEnvironment para calcular la ruta
                SeedDatabase(dbContext, sqlFilePath, logger, env); // <-- ACTUALIZADO
            }
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Ocurrió un error grave durante la migración o siembra de la base de datos.");
        }
    }
    
    /// <summary>
    /// Ejecuta un script SQL de inicialización (seeding) desde un archivo externo.
    /// </summary>
    /// <param name="dbContext">El contexto de base de datos.</param>
    /// <param name="sqlFilePath">Ruta al archivo .sql.</param>
    /// <param name="logger">El logger para registrar eventos.</param>
    /// <param name="env">El entorno de hosting para obtener la ContentRootPath.</param>
    private static void SeedDatabase(NetViTecaDbContext dbContext, string sqlFilePath, ILogger logger, IHostEnvironment env)
    {
        // 🚨 SOLUCIÓN: Usamos ContentRootPath (Directorio del proyecto) como base.
        // La ruta será resuelta desde /mnt/Datos/Repos/NetViTeca/Backend/src/CSharp/NetViTeca.Api
        // y de ahí navegamos hacia el archivo SQL.

        var fullPath = Path.Combine(env.ContentRootPath, sqlFilePath); // <-- CÁLCULO DE RUTA MÁS CONFIABLE

        // Si la ruta relativa contiene '..', Path.GetFullPath lo resuelve.
        fullPath = Path.GetFullPath(fullPath);

        if (!File.Exists(fullPath))
        {
            logger.LogWarning($"El archivo de siembra SQL no se encontró en la ruta: {fullPath}. Saltando siembra.");
            // También se podría registrar el path original para debugging:
            logger.LogWarning($"Ruta de búsqueda intentada: {sqlFilePath}. Directorio base: {env.ContentRootPath}");
            return;
        }

        try
        {
            logger.LogInformation($"Ejecutando script de siembra SQL desde: {fullPath}");
            var sqlCommands = File.ReadAllText(fullPath);
            
            // ExecuteSqlRawAsync o ExecuteSqlRaw permiten ejecutar comandos SQL sin seguimiento de EF Core.
            dbContext.Database.ExecuteSqlRaw(sqlCommands);
            
            logger.LogInformation("Siembra (INSERTs) de base de datos completada exitosamente.");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error al ejecutar el script SQL de siembra.");
        }
    }
}