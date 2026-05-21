using System;
using System.Collections.Generic;

namespace SkillBridge.Api.Entities
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string type { get; set; } = string.Empty;

        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation targets used by migrations
        public ICollection<Job> PostedBy { get; set; } = new List<Job>();
        public ICollection<JobApplication> AppliedBy { get; set; } = new List<JobApplication>();
    }
}

