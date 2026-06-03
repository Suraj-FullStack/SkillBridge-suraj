public class CreateUserProfileRequestDto
{
    public string FullName { get; set; }
    public string SkillSet { get; set; }
    public string Experience { get; set; }
    public string Education { get; set; }
    public string? ResumePath { get; set; }
    public string LinkedInProfile { get; set; }
    public string GitHubProfile { get; set; }
    public string Bio { get; set; }
    public string Location { get; set; }
    public string ContactNumber { get; set; }
    public IFormFile? ResumeFile { get; set; }
}
public class CreateUserProfileResponseDto
{
public string Message { get; set; } = "User profile created successfully.";
public bool Success { get; set; } = true;
}