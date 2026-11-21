using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace API.Services;
public class UserService : IUserService
{
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<IdentityUser> _userManager;

        public UserService(IHttpContextAccessor httpContextAccessor, UserManager<IdentityUser> userManager)
        {
            _httpContextAccessor = httpContextAccessor;
            _userManager = userManager;
        }
        public string? GetCurrentUserId()
        {
            return _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        }
        public async Task<Result<UserDTO>> CurrentUserAsync()
        {
            var userId = GetCurrentUserId();

            if (string.IsNullOrEmpty(userId))
                return Result<UserDTO>.Failure("You must be logged in to perform this action.",404);

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return Result<UserDTO>.Failure("We couldn't find your account. It may have been removed or deactivated.",404);


            var userDTO = new UserDTO
            (
                user.Email!
            );

            return Result<UserDTO>.Success(userDTO);
        }
}