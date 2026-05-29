using Microsoft.EntityFrameworkCore;
using SkillBridge.Api.Entities;

public class UserRepository : IUserRepository
{
    private readonly SkillBridgeDbContext _context;
    private readonly JwtTokenHelper _jwtTokenHelper;
    private readonly ICurrentUserHelper _currentUserHelper;

    public UserRepository(SkillBridgeDbContext context, JwtTokenHelper jwtTokenHelper, ICurrentUserHelper currentUserHelper)
    {
        _context = context;
        _jwtTokenHelper = jwtTokenHelper;
        _currentUserHelper = currentUserHelper;
    }
    public Task<string> CreateUserAsync(CreateUserRequestDto req_user)
    {
        User user1 = new User();
        user1.Name = req_user.Name;
        user1.Email = req_user.Email;
        user1.PasswordHash = BCrypt.Net.BCrypt.HashPassword(req_user.Password);
        user1.type = req_user.Type;
        user1.CreatedAt = DateTime.UtcNow;
        user1.IsActive = true;

        _context.Users.Add(user1);
        var result = _context.SaveChanges();
        if (result > 0)
        {
            return Task.FromResult("User created successfully!");
        }
        else
        {
            return Task.FromResult("Failed to create user.");
        }

    }
    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            return new LoginResponseDto(); // Invalid credentials
        }

        // Generate JWT token
        var token = _jwtTokenHelper.GenerateToken(user.Id, user.Email, user.Name, user.type);

        return new LoginResponseDto
        {
            Token = token,
            UserId = user.Id.ToString(),
            Email = user.Email,
            Name = user.Name,
            Type = user.type
        };
    }

    public Task<CreateUserProfileResponseDto> CreateUserProfileAsync(CreateUserProfileRequestDto request)
    {
        var profile = new Userprofile
        {
            UserID = _currentUserHelper.userId,
            FullName = request.FullName,
            skillset = request.SkillSet,
            Experience = request.Experience,
            Education = request.Education,
            Resumepath = request.ResumePath ?? string.Empty,
            LinkedInprofile = request.LinkedInProfile,
            Githubprofile = request.GitHubProfile,
            Bio = request.Bio,
            Location = request.Location,
            contactNumber = request.ContactNumber
        };

        _context.Userprofiles.Add(profile);
        _context.SaveChanges();

        return Task.FromResult(new CreateUserProfileResponseDto());
    }
}
