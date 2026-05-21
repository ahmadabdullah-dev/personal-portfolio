using Microsoft.Extensions.DependencyInjection;
using FluentValidation;
using Application.Features.Admin.Validators;
namespace Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {

        services.AddMediatR(cfg =>
        cfg.RegisterServicesFromAssembly(typeof(DependencyInjection).Assembly)); 

        services.AddValidatorsFromAssemblyContaining<LoginValidator>();


        return services;
    }
}