using System.Threading.Tasks;
using SkillBridge.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace SkillBridge.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SkillBridgeDbContext _context;

        public UserRepository(SkillBridgeDbContext context)
        {
            _context = context;
        }

        public async Task<string> CreateUserAsync(CreateUserRequestDto req_user)
        {
            var user1 = new User
            {
                Name = req_user.Name,
                Email = req_user.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(req_user.Password),
                type = req_user.Type,
                CreatedAt = DateTime.UtcNow,
                IsActive = true
            };

            _context.Users.Add(user1);
            var result = await _context.SaveChangesAsync();

            return result > 0 ? "User created successfully!" : "Failed to create user.";
        }
    }
}

