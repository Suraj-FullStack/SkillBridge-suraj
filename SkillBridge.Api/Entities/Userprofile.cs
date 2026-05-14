using System.ComponentModel.DataAnnotations;
using SkillBridge.Api.Entities;

public class Userprofile
{
    [Required, Key]
    public int Id { get; set; }
    public User User { get; set; }
    public int UserID { get; set; }
    [Required]
    public string FullName { get; set; }
    [Required]
    public string skillset { get; set; }
    [Required]
    public string Experience { get; set; }
    [Required]
    public string Education { get; set; }
    [Required]
    public string Resumepath { get; set; }
    public string LinkedInprofile { get; set; }
    public string Githubprofile { get; set; }
    [Required]
    public string Bio { get; set; }
     [Required]
     public string Location { get; set; }
        [Required]
     public string contactNumber { get; set; }
}