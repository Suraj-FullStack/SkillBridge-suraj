using System;

namespace SkillBridge.Api.Entities
{
    public class JobApplication
    {
        public int Id { get; set; }

        public int AppliedByID { get; set; }
        public User AppliedBy { get; set; } = null!;

        public int AppliedJobID { get; set; }
        public Job AppliedJob { get; set; } = null!;

        public DateTime ApplicationDate { get; set; }

        public string CoverLetter { get; set; } = string.Empty;
        public string Resumepath { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;

        public bool isActive { get; set; }
    }
}


