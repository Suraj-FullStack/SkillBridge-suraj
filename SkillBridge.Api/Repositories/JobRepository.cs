
using Microsoft.EntityFrameworkCore;
using SkillBridge.Api.Entities;


public class JobRepository : IJobRepository
{
    private readonly SkillBridgeDbContext _context;
    private readonly ICurrentUserHelper? _currentUserHelper;
    public JobRepository(SkillBridgeDbContext context, ICurrentUserHelper currentUserHelper)
    {
        _context = context;
        _currentUserHelper = currentUserHelper;
    }
    public JobRepository(SkillBridgeDbContext context)
    {
        _context = context;
        _currentUserHelper = null;
    }
    public async Task<IEnumerable<JobDto>> GetJobListAsync()
    {
        var joblist = await _context.Jobs.ToListAsync();
        // select * from Jobs
        if (joblist != null)
        {
            return joblist.Select(job => new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Company = job.Company,
                Location = job.Location,
                JobType = job.JobType,
                Maximumsalary = job.MaximumSalary,
                Minimumsalary = job.MinimumSalary,
                PostedDate = job.PostedDate,
                DeadLineDate = job.DeadLineDate,
                isActive = job.isActive
            }).ToList();
        }
        return new List<JobDto>();
    }
    public async Task<JobDto> GetJobByIdAsync(int id)
    {
        var job = await _context.Jobs.FirstOrDefaultAsync(j => j.Id == id);
        // select * from Jobs where Id = id
        if (job != null)
        {
            return new JobDto
            {
                Id = job.Id,
                Title = job.Title,
                Description = job.Description,
                Company = job.Company,
                Location = job.Location,
                JobType = job.JobType,
                Maximumsalary = job.MaximumSalary,
                Minimumsalary = job.MinimumSalary,
                PostedDate = job.PostedDate,
                DeadLineDate = job.DeadLineDate,
                isActive = job.isActive
            };
        }
        return new JobDto();
    }
    public async Task<int> CreateJobAsync(CreateJobRequestDto request)
    {
        var job = new Job
        {
            Title = request.Title,
            Description = request.Description,
            Company = request.Company,
            Location = request.Location,
            MinimumSalary = (double)request.MinimumSalary,
            MaximumSalary = (double)request.MaximumSalary,
            JobType = request.JobType,
            DeadLineDate = request.DeadlineDate,
            PostedDate = DateTime.UtcNow,
            isActive = true,
            PostedById = _currentUserHelper?.userId ?? 0
        };
        _context.Jobs.Add(job);
        await _context.SaveChangesAsync();
        return job.Id;
    }

}