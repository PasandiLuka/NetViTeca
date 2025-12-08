using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using NetViTeca.Core.Models;

namespace NetViTeca.Data.Configs;

public class BibliotecaConfig : IEntityTypeConfiguration<Biblioteca>
{
    public void Configure(EntityTypeBuilder<Biblioteca> builder)
    {
        builder.ToTable("Biblioteca");

        builder.HasKey(b => new { b.BookId, b.UserId });

        builder.HasOne(l => l.Book);
        builder.HasOne(u => u.User);
    }
}