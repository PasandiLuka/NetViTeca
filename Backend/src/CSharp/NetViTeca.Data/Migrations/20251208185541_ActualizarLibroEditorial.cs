using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetViTeca.Data.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarLibroEditorial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Publisher",
                table: "Libro",
                newName: "Editorial");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Editorial",
                table: "Libro",
                newName: "Publisher");
        }
    }
}
