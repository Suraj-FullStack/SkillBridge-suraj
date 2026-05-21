public interface IUserRepository
{
    Task<string> CreateUserAsync(CreateUserRequestDto user);
}