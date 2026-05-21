using System.Collections.Generic;

namespace SkillBridge.Api.Entities
{
    public class Userprofile
    {
        public int Id { get; set; }

        public int UserID { get; set; }
        public User User { get; set; } = null!;

        public string FullName { get; set; } = string.Empty;
        public string Education { get; set; } = string.Empty;
        public string Experience { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;

        public string Location { get; set; } = string.Empty;

        public string contactNumber { get; set; } = string.Empty;
        public string skillset { get; set; } = string.Empty;
        public string Resumepath { get; set; } = string.Empty;

        public string Githubprofile { get; set; } = string.Empty;
        public string LinkedInprofile { get; set; } = string.Empty;
    }
}

