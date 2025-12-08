using NetViTeca.Data;

namespace NetViTeca.Repositorios;

/// <summary>
/// Clase base abstracta para todos los Repositorios del proyecto.
/// Su función principal es centralizar la inyección de dependencia del DbContext.
/// </summary>
public abstract class RepoBaseAdo
{
    /// <summary>
    /// Campo protegido y de solo lectura que almacena el contexto de la base de datos (DbContext).
    /// El guion bajo (_) es una convención en C# para indicar que es un campo interno privado o protegido.
    /// </summary>
    protected readonly NetViTecaDbContext _context; 

    /// <summary>
    /// Constructor base que realiza la inyección de dependencia del DbContext
    /// y lo asigna al campo protegido '_context'.
    /// </summary>
    /// <param name="context">Instancia del NetViTecaDbContext inyectada por el contenedor de DI.</param>
    public RepoBaseAdo(NetViTecaDbContext context)
    {
        _context = context;
    }
}