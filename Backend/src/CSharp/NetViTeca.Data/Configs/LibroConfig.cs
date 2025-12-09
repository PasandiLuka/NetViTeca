using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class LibroConfig : IEntityTypeConfiguration<Libro>
{
          public void Configure(EntityTypeBuilder<Libro> builder)
          {
                 builder.ToTable("Libro");

                 builder.HasKey(l => l.Id);

                 builder.HasOne(l => l.Genre)              // Libro tiene un Genero
                        .WithMany(g => g.Books)            // Genero puede estar en muchos Libros (no necesitamos la colección)
                        .HasForeignKey(l => l.GenreId)     // la FK está en idGenero
                        .IsRequired()                       // relación obligatoria (no null)
                        .OnDelete(DeleteBehavior.Cascade);

                 builder.Property(l => l.Title)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.HasIndex(l => l.Title)
                         .IsUnique()
                         .HasDatabaseName("IX_Libro_Titulo");

                 builder.Property(l => l.Editorial)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.Property(l => l.Author)
                        .HasColumnType("varchar(45)")
                        .HasMaxLength(45)
                        .IsRequired();

                 builder.Property(l => l.CreatedAt)
                        .HasColumnType("datetime")
                        .IsRequired();

                 builder.Property(l => l.PageCount)
                        .HasColumnType("int")
                        .IsRequired();

                 builder.Property(l => l.Description)
                        .HasColumnType("varchar(500)") // Assuming a reasonable length
                        .HasMaxLength(500);

                 builder.Property(l => l.Image)
                        .HasColumnType("TEXT");

                 builder.Property(l => l.Url)
                        .HasColumnType("TEXT");
    }
}