public class CreateJobRequestDto
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Company { get; set; }
    public string Location { get; set; }
    public decimal MinimumSalary { get; set; }
    public decimal MaximumSalary { get; set; }
    public string JobType { get; set; }
    public DateTime DeadlineDate { get; set; }
}