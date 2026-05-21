using Application.Features.Admin.Commands;
using Application.Features.Admin.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdminController(SignInManager<AdminEntity> signInManager) : BaseApiController
{

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto dto)
    {
        var result = await Mediator.Send(new Login.Command { Dto = dto });

        if (!result.IsSuccess)
            return Unauthorized(result.Error);

        await signInManager.SignInAsync(result.Value!, isPersistent: dto.RememberMe);

        return NoContent();
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<ActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return NoContent();
    }
}
 