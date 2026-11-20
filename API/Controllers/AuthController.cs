using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace API.Controllers;

public class AuthController : BaseApiController
{
    private readonly IAuthService _authService;
    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
    [EnableRateLimiting("authRateLimiter")]
    [HttpPost("request-login")]
    public async Task<IActionResult> RequestLogin(RequestLoginDTO dto)
    {
        var result = await _authService.RequestLoginAsync(dto);

        return HandleResult(result);
    }
    [EnableRateLimiting("authRateLimiter")]
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDTO dto)
    {
        var result = await _authService.LoginAsync(dto);
        return HandleResult(result);
    }
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var result = await _authService.LogoutAsync();
        return HandleResult(result);
    }
}