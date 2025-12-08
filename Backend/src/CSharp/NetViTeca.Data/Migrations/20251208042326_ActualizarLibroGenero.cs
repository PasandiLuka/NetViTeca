using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetViTeca.Data.Migrations
{
    /// <inheritdoc />
    public partial class ActualizarLibroGenero : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biblioteca_Libro_idLibro",
                table: "Biblioteca");

            migrationBuilder.DropForeignKey(
                name: "FK_Biblioteca_Usuario_idUsuario",
                table: "Biblioteca");

            migrationBuilder.DropForeignKey(
                name: "FK_Libro_Genero_idGenero",
                table: "Libro");

            migrationBuilder.DropIndex(
                name: "IX_Usuario_NombreUsuario",
                table: "Usuario");

            migrationBuilder.DropIndex(
                name: "IX_Libro_idGenero",
                table: "Libro");

            migrationBuilder.RenameColumn(
                name: "numeroTelefono",
                table: "Usuario",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "nombreUsuario",
                table: "Usuario",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "nombreCompleto",
                table: "Usuario",
                newName: "FullName");

            migrationBuilder.RenameColumn(
                name: "correo",
                table: "Usuario",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "contrasena",
                table: "Usuario",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "idUsuario",
                table: "Usuario",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "titulo",
                table: "Libro",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "idGenero",
                table: "Libro",
                newName: "PageCount");

            migrationBuilder.RenameColumn(
                name: "fechaCreacion",
                table: "Libro",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "editorial",
                table: "Libro",
                newName: "Publisher");

            migrationBuilder.RenameColumn(
                name: "cantidadPaginas",
                table: "Libro",
                newName: "GenreId");

            migrationBuilder.RenameColumn(
                name: "autor",
                table: "Libro",
                newName: "Author");

            migrationBuilder.RenameColumn(
                name: "idLibro",
                table: "Libro",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "genero",
                table: "Genero",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "idGenero",
                table: "Genero",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "idUsuario",
                table: "Biblioteca",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "idLibro",
                table: "Biblioteca",
                newName: "BookId");

            migrationBuilder.RenameIndex(
                name: "IX_Biblioteca_idUsuario",
                table: "Biblioteca",
                newName: "IX_Biblioteca_UserId");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Libro",
                type: "varchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Image",
                table: "Libro",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Libro",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_NombreUsuario",
                table: "Usuario",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libro_GenreId",
                table: "Libro",
                column: "GenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_Biblioteca_Libro_BookId",
                table: "Biblioteca",
                column: "BookId",
                principalTable: "Libro",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Biblioteca_Usuario_UserId",
                table: "Biblioteca",
                column: "UserId",
                principalTable: "Usuario",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Libro_Genero_GenreId",
                table: "Libro",
                column: "GenreId",
                principalTable: "Genero",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Biblioteca_Libro_BookId",
                table: "Biblioteca");

            migrationBuilder.DropForeignKey(
                name: "FK_Biblioteca_Usuario_UserId",
                table: "Biblioteca");

            migrationBuilder.DropForeignKey(
                name: "FK_Libro_Genero_GenreId",
                table: "Libro");

            migrationBuilder.DropIndex(
                name: "IX_Usuario_NombreUsuario",
                table: "Usuario");

            migrationBuilder.DropIndex(
                name: "IX_Libro_GenreId",
                table: "Libro");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Libro");

            migrationBuilder.DropColumn(
                name: "Image",
                table: "Libro");

            migrationBuilder.DropColumn(
                name: "Url",
                table: "Libro");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Usuario",
                newName: "numeroTelefono");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Usuario",
                newName: "nombreUsuario");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Usuario",
                newName: "contrasena");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "Usuario",
                newName: "nombreCompleto");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Usuario",
                newName: "correo");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Usuario",
                newName: "idUsuario");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Libro",
                newName: "titulo");

            migrationBuilder.RenameColumn(
                name: "Publisher",
                table: "Libro",
                newName: "editorial");

            migrationBuilder.RenameColumn(
                name: "PageCount",
                table: "Libro",
                newName: "idGenero");

            migrationBuilder.RenameColumn(
                name: "GenreId",
                table: "Libro",
                newName: "cantidadPaginas");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Libro",
                newName: "fechaCreacion");

            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Libro",
                newName: "autor");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Libro",
                newName: "idLibro");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Genero",
                newName: "genero");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Genero",
                newName: "idGenero");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Biblioteca",
                newName: "idUsuario");

            migrationBuilder.RenameColumn(
                name: "BookId",
                table: "Biblioteca",
                newName: "idLibro");

            migrationBuilder.RenameIndex(
                name: "IX_Biblioteca_UserId",
                table: "Biblioteca",
                newName: "IX_Biblioteca_idUsuario");

            migrationBuilder.CreateIndex(
                name: "IX_Usuario_NombreUsuario",
                table: "Usuario",
                column: "nombreUsuario",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Libro_idGenero",
                table: "Libro",
                column: "idGenero");

            migrationBuilder.AddForeignKey(
                name: "FK_Biblioteca_Libro_idLibro",
                table: "Biblioteca",
                column: "idLibro",
                principalTable: "Libro",
                principalColumn: "idLibro",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Biblioteca_Usuario_idUsuario",
                table: "Biblioteca",
                column: "idUsuario",
                principalTable: "Usuario",
                principalColumn: "idUsuario",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Libro_Genero_idGenero",
                table: "Libro",
                column: "idGenero",
                principalTable: "Genero",
                principalColumn: "idGenero",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
