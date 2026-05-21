using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Persistence;

public class DbInitializer
{
    public static async Task SeedAdminAsync(UserManager<AdminEntity> userManager, IConfiguration config, ILogger logger) 
    {
        var email = Environment.GetEnvironmentVariable("Seed__Email") ?? config["Seed:Email"];
        var userName = Environment.GetEnvironmentVariable("Seed__UserName") ?? config["Seed:UserName"];
        var password = Environment.GetEnvironmentVariable("Seed__Password") ?? config["Seed:Password"];

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(userName) || string.IsNullOrWhiteSpace(password))
        {
            logger.LogWarning("Seed settings not found in environment or configuration.");
            return;
        }

        var existing = await userManager.FindByEmailAsync(email);

        if (existing != null)
        {
            logger.LogInformation("Admin already exists.");
            return;
        }

        var user = new AdminEntity
        {
            Email = email.ToLowerInvariant().Trim(),
            UserName = userName.ToLowerInvariant().Trim(),
            EmailConfirmed = true,                     
            SecurityStamp = Guid.NewGuid().ToString(),
        };

        var result = await userManager.CreateAsync(user, password);

        if (result.Succeeded)
            logger.LogInformation("Admin user seeded successfully.");
        else
            throw new Exception($"Seeding failed: {string.Join(", ", result.Errors.Select(e => e.Description))}");
    }
}