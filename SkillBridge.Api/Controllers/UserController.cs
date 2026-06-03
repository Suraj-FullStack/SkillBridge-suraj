using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SkillBridge.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateUser([FromBody] CreateUserRequestDto request)
        {
            var result = await _userRepository.CreateUserAsync(request);
            return result;
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request)
        {
            var result = await _userRepository.LoginAsync(request);
            return result;
        }
        [Authorize]
        [HttpPost,Route("profile/create")]
        [Consumes("multipart/form-data")]
        public async Task<ActionResult<CreateUserProfileResponseDto>> CreateUserProfile([FromForm] CreateUserProfileRequestDto request)
        {
            var result = await _userRepository.CreateUserProfileAsync(request);
            return result;
        }
    }
}

