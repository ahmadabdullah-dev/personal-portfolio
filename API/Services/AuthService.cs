using Microsoft.AspNetCore.Identity;

namespace API.Services;

public class AuthService : IAuthService
{
    private const string InvalidCredentials = "Invalid email or password.";
    private const string InvalidCode = "Invalid or expired code.";

    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IEmailService _emailService;
    private readonly ILogger<AuthService> _logger;

    public AuthService(
        UserManager<IdentityUser> userManager,
        SignInManager<IdentityUser> signInManager,
        IEmailService emailService,
        ILogger<AuthService> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<Result<string>> RequestLoginAsync(RequestLoginDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email?.Trim() ?? "");

        if (user is null || await _userManager.IsLockedOutAsync(user) || !await _userManager.IsEmailConfirmedAsync(user))
            return Result<string>.Failure(InvalidCredentials, 400);

        if (!await _userManager.CheckPasswordAsync(user, dto.Password))
        {
            await _userManager.AccessFailedAsync(user);
            return Result<string>.Failure(InvalidCredentials, 400);
        }

        try
        {
            await _emailService.SendCodeAsync(user, "Login Confirmation", EmailPurposes.LOGIN_CONFIRMATION);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send login code to user {UserId}", user.Id);
            return Result<string>.Failure("Unable to send login code. Please try again shortly.", 500);
        }

        return Result<string>.Success("Login code sent successfully");
    }

    public async Task<Result<string>> LoginAsync(LoginDTO dto)
    {
        var user = await _userManager.FindByEmailAsync(dto.Email?.Trim() ?? "");

        if (user is null || await _userManager.IsLockedOutAsync(user) || !await _userManager.IsEmailConfirmedAsync(user))
            return Result<string>.Failure(InvalidCode, 400);

        var isValid = await _userManager.VerifyUserTokenAsync(
            user, TokenOptions.DefaultEmailProvider, EmailPurposes.LOGIN_CONFIRMATION, dto.Code?.Trim() ?? "");

        if (!isValid)
        {
            await _userManager.AccessFailedAsync(user);
            return Result<string>.Failure(InvalidCode, 400);
        }

        await _userManager.ResetAccessFailedCountAsync(user);
        await _userManager.UpdateSecurityStampAsync(user);
        await _signInManager.SignInAsync(user, dto.IsPersistence);

        return Result<string>.Success("Logged in successfully");
    }

    public async Task<Result<string>> LogoutAsync()
    {
        await _signInManager.SignOutAsync();
        return Result<string>.Success("Logged out successfully");
    }
}