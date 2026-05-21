public class JobDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public double Maximumsalary { get; set; }
    public double Minimumsalary { get; set; }
    public string? Company { get; set; }
    public string? Location { get; set; }
    public string? JobType { get; set; }
    public DateTime PostedDate { get; set; }
    public DateTime DeadLineDate { get; set; }
    public bool isActive { get; set; }
}