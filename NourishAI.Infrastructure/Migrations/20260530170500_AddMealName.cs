using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NourishAI.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMealName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MealName",
                table: "Meals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MealName",
                table: "Meals");
        }
    }
}
