using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NetViTeca.Data.Migrations
{
    /// <inheritdoc />
    public partial class EmailServiceParaSlide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ReceiveNotifications",
                table: "Usuario",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReceiveNotifications",
                table: "Usuario");
        }
    }
}
