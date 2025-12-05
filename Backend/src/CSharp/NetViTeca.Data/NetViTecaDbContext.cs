using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data;

public class NetViTecaDbContext : DbContext
{
      public NetViTecaDbContext(DbContextOptions<NetViTecaDbContext> options)
            : base(options) {}

      public DbSet<Usuario> Usuarios { get; set; }
      public DbSet<Libro> Libros { get; set; }
      public DbSet<Genero> Generos { get; set; }
      public DbSet<Biblioteca> Bibliotecas { get; set; }

      protected override void OnModelCreating(ModelBuilder modelBuilder)
      {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(NetViTecaDbContext).Assembly);
      }
}