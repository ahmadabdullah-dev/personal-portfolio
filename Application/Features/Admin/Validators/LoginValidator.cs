using Application.Features.Admin.Commands;
using FluentValidation;

namespace Application.Features.Admin.Validators;

public class LoginValidator : AbstractValidator<Login.Command>
{
    public LoginValidator()
    {
        RuleFor(x => x.Dto.Email).NotEmpty().EmailAddress().WithName("Email");
        RuleFor(x => x.Dto.Password).NotEmpty().WithName("Password");
    }
}
