using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkillBridge.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Company = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MaximumSalary = table.Column<double>(type: "float", nullable: false),
                    MinimumSalary = table.Column<double>(type: "float", nullable: false),
                    PostedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeadLineDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false),
                    PostedById = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_Users_PostedById",
                        column: x => x.PostedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Userprofiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Education = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    contactNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    skillset = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Resumepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Githubprofile = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LinkedInprofile = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Userprofiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Userprofiles_Users_UserID",
                        column: x => x.UserID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobApplications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppliedByID = table.Column<int>(type: "int", nullable: false),
                    AppliedJobID = table.Column<int>(type: "int", nullable: false),
                    ApplicationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CoverLetter = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Resumepath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    isActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplications_Jobs_AppliedJobID",
                        column: x => x.AppliedJobID,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobApplications_Users_AppliedByID",
                        column: x => x.AppliedByID,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_AppliedByID",
                table: "JobApplications",
                column: "AppliedByID");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplications_AppliedJobID",
                table: "JobApplications",
                column: "AppliedJobID");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_PostedById",
                table: "Jobs",
                column: "PostedById");

            migrationBuilder.CreateIndex(
                name: "IX_Userprofiles_UserID",
                table: "Userprofiles",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "JobApplications");

            migrationBuilder.DropTable(
                name: "Userprofiles");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
