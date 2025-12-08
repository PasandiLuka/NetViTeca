using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using NetViTeca.Data;

// Esta clase debe estar en el proyecto de startup o en el proyecto donde se ejecutan los comandos.
public class NetViTecaDbContextFactory : IDesignTimeDbContextFactory<NetViTecaDbContext>
{
    public NetViTecaDbContext CreateDbContext(string[] args)
    {
        // 1. Obtener la cadena de conexión del archivo appsettings.json
        IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json")
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection"); // Usa el nombre de tu ConnectionString
        var serverVersion = ServerVersion.AutoDetect(connectionString);

        // 2. Crear las opciones del DbContext
        var builder = new DbContextOptionsBuilder<NetViTecaDbContext>();
        
        builder.UseMySql(connectionString, serverVersion);

        // 3. Devolver la nueva instancia del DbContext
        return new NetViTecaDbContext(builder.Options);
    }
}