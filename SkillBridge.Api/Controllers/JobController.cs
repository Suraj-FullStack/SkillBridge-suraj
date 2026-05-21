using Microsoft.AspNetCore.Mvc;
namespace SkillBridge.Api.Controllers;
[ApiController]
[Route("[controller]")]
public class JobController : ControllerBase
{ 
    private readonly IJobRepository _jobRepository;
    public JobController(IJobRepository jobRepository)
    {
        _jobRepository = jobRepository;
    }
    [HttpGet]
    public IEnumerable<JobDto> GetJobList()
    {
        return _jobRepository.GetJobListAsync().Result;
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<JobDto>> GetJobById(int id)
    {
        var job = await _jobRepository.GetJobByIdAsync(id);
        if (job == null)
        {
            return NotFound();
        }
        return Ok(job);
    }
}