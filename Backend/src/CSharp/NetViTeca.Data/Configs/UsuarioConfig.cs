using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class UsuarioConfig : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuario");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.FullName)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45)
                .IsRequired();

        builder.Property(u => u.Username)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45)
                .IsRequired();

        builder.HasIndex(u => u.Username)
                .IsUnique()
                .HasDatabaseName("IX_Usuario_NombreUsuario");

        builder.Property(u => u.Email)
                .HasColumnType("varchar(100)")
                .IsRequired();

        builder.Property(u => u.Password)
                .HasColumnType("varchar(255)")
                .HasMaxLength(255)
                .IsRequired();

        builder.Property(u => u.Phone)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45);
    }
}