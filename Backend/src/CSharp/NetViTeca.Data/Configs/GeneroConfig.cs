using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class GeneroConfig : IEntityTypeConfiguration<Genero>
{
    public void Configure(EntityTypeBuilder<Genero> builder)
    {
        builder.ToTable("Genero");

        builder.HasKey(g => g.idGenero);

        builder.Property(g => g.genero)
               .HasColumnType("varchar(45)")
               .HasMaxLength(45)
               .IsRequired();

        builder.HasIndex(g => g.genero)
                .IsUnique()
                .HasDatabaseName("IX_Genero_genero");
    }
}