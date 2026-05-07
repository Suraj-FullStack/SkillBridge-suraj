using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http.HttpResults;

namespace SkillBridge.Api.Entities
{
    public class User
    {
        [Required, Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required, EmailAddress]    
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
    }
}