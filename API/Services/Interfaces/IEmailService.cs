using Microsoft.AspNetCore.Identity;

namespace API.Services.Interfaces;

public interface IEmailService
{
    Task SendEmailAsync(string to, string subject, string htmlContent);
    Task SendCodeAsync(IdentityUser user, string emailSubject, string purpose, string? diffrentEmail = null);

}