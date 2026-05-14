using System.ComponentModel.DataAnnotations;
using SkillBridge.Api.Entities;
public class JobApplication
{
    [Required, Key]
    public int Id { get; set; }
    public  Job AppliedJob { get; set; }
    public int AppliedJobID{ get; set; }
    public User AppliedBy { get; set; }
    public int AppliedByID { get; set; }
    [Required]
    public DateTime ApplicationDate { get; set; }
    [Required]
    public string Status { get; set; } // e.g., "Pending", "Accepted", "Rejected"
    public bool isActive { get; set; }
    [Required]
    public string CoverLetter { get; set; }
    [Required]
    public string Resumepath { get; set; }

}