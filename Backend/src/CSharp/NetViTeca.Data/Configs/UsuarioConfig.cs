using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class UsuarioConfig : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.ToTable("Usuario");

        builder.HasKey(u => u.idUsuario);

        builder.Property(u => u.nombreCompleto)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45)
                .IsRequired();

        builder.Property(u => u.nombreUsuario)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45)
                .IsRequired();

        builder.HasIndex(u => u.nombreUsuario)
                .IsUnique()
                .HasDatabaseName("IX_Usuario_NombreUsuario");

        builder.Property(u => u.correo)
                .HasColumnType("varchar(100)")
                .IsRequired();

        builder.Property(u => u.contrasena)
                .HasColumnType("varchar(255)")
                .HasMaxLength(45)
                .IsRequired();

        builder.Property(u => u.numeroTelefono)
                .HasColumnType("varchar(45)")
                .HasMaxLength(45);
    }
}