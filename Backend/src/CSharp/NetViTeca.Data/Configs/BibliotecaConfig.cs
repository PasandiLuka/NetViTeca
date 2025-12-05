using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class BibliotecaConfig : IEntityTypeConfiguration<Biblioteca>
{
    public void Configure(EntityTypeBuilder<Biblioteca> builder)
    {
        builder.ToTable("Biblioteca");

        builder.HasKey(b => new { b.idLibro, b.idUsuario });

        builder.HasOne(l => l.Libros);
        builder.HasOne(u => u.Usuarios);
    }
}