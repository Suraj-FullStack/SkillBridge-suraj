using System;
using System.Collections.Generic;

namespace SkillBridge.Api.Entities
{
    public class Job
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Company { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string JobType { get; set; } = string.Empty;

        // Match JobDto property types (double)
        public double MaximumSalary { get; set; }
        public double MinimumSalary { get; set; }

        public DateTime PostedDate { get; set; }
        public DateTime DeadLineDate { get; set; }

        public bool isActive { get; set; }

        // FK / navigation target used by migrations
        public int? PostedById { get; set; }
        public User? PostedBy { get; set; }

        public ICollection<JobApplication> AppliedBy { get; set; } = new List<JobApplication>();

    }
}


