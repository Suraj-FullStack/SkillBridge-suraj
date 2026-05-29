public interface IUserRepository
{
    Task<string> CreateUserAsync(CreateUserRequestDto user);
    Task<LoginResponseDto> LoginAsync(LoginRequestDto request);
    Task<CreateUserProfileResponseDto> CreateUserProfileAsync(CreateUserProfileRequestDto request);
}