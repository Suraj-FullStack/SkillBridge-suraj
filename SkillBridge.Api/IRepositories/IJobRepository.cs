public interface IJobRepository
{
    Task<IEnumerable<JobDto>> GetJobListAsync();
    Task<JobDto> GetJobByIdAsync(int id);
    Task <int> CreateJobAsync(CreateJobRequestDto request);
   
}