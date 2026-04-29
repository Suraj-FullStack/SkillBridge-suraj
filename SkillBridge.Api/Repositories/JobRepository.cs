public class JobRepository : IJobRepository
{
    public async Task<IEnumerable<JobDto>> GetJobListAsync()
    {
         return new List<JobDto>
        {
            new JobDto { Id = 1, Name = "Software Engineer", Description = "Develop and maintain software applications" },
            new JobDto { Id = 2, Name = "Data Scientist", Description = "Analyze and interpret complex data" },
            new JobDto { Id = 3, Name = "Product Manager", Description = "Manage the development and launch of products" }
        };
            

    }
    
    
    
}