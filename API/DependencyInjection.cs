using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API;

public static class DependencyInjection
{
    public static IServiceCollection AddDependencyInjection(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<ApplicationDbContext>(opt =>
        {
            opt.UseNpgsql(configuration.GetConnectionString("DefaultConnection"))
            .LogTo(Console.WriteLine, LogLevel.Information).EnableSensitiveDataLogging();
        });

        services.AddIdentity<IdentityUser, IdentityRole>(options =>
        {
            options.User.RequireUniqueEmail = true;

            options.Lockout.AllowedForNewUsers = true;
            options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(3);
            options.Lockout.MaxFailedAccessAttempts = 10;

            options.Password.RequireDigit = true;
            options.Password.RequiredLength = 8;
            options.Password.RequireUppercase = true;
            options.Password.RequireLowercase = true;

        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();
        
        services.AddCors(options =>
        {
            options.AddPolicy("AllowWeb",
                policy =>
                {
                    policy.WithOrigins("https://localhost:3000")
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
        });
        services.Configure<CloudinaryConfigurations>(configuration.GetSection("CloudinaryConfigurations"));
        services.Configure<EmailConfiguration>(configuration.GetSection("EmailConfiguration"));
        services.Configure<ReceiverConfiguration>(configuration.GetSection("ReceiverConfiguration"));
        services.Configure<AdminConfiguration>(configuration.GetSection("Seed:Admin"));

        services.AddScoped<ISystemRepository, SystemRepository>();
        services.AddScoped<ISystemService, SystemService>();
        services.AddScoped<IFileService, FileService>();
        services.AddScoped<IEmailService, EmailService>();   
        services.AddScoped<IContactService, ContactService>();
        services.AddScoped<IContactRepository, ContactRepository>();
        services.AddScoped<IAuthService, AuthService>();

        services.AddDataProtection();

        return services;
    }
}