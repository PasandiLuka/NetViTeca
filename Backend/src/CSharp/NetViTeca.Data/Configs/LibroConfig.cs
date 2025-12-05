using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class LibroConfig : IEntityTypeConfiguration<Libro>
{
          public void Configure(EntityTypeBuilder<Libro> builder)
          {
                 builder.ToTable("Libro");

                 builder.HasKey(l => l.idLibro);

                 builder.HasOne(l => l.genero)              // Libro tiene un Genero
                        .WithMany(g => g.libros)            // Genero puede estar en muchos Libros (no necesitamos la colección)
                        .HasForeignKey(g => g.idGenero)     // la FK está en idGenero
                        .IsRequired()                       // relación obligatoria (no null)
                        .OnDelete(DeleteBehavior.Cascade);

                 builder.Property(l => l.titulo)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.HasIndex(l => l.titulo)
                         .IsUnique()
                         .HasDatabaseName("IX_Libro_Titulo");

                 builder.Property(l => l.editorial)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.Property(l => l.autor)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.Property(l => l.fechaCreacion)
                        .HasColumnType("datetime")
                        .IsRequired();

                 builder.Property(l => l.cantidadPaginas)
                        .HasColumnType("int")
                        .IsRequired();
    }
}