using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Infrastructure;

public static class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        await SeedAdminAsync(serviceProvider);
    }
    static async Task SeedAdminAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var adminConfig = scope.ServiceProvider.GetRequiredService<IOptions<AdminConfiguration>>().Value;

        var existingUser = await userManager.FindByEmailAsync(adminConfig.Email);

        if (existingUser != null)
            return;

        var user = new IdentityUser
        {
            UserName = adminConfig.Email,
            Email = adminConfig.Email,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(user, adminConfig.Password);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"Failed to seed admin: {errors}");
        }
    }
}