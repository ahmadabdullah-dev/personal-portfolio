using MediatR;
using Microsoft.AspNetCore.Identity;
using Application.Features.Admin.DTOs;
using FluentValidation;
namespace Application.Features.Admin.Commands;

public class Login
{
    public record Command : IRequest<Result<AdminEntity>>
    {
        public required LoginDto Dto { get; init; }
    }

    public class Handler(UserManager<AdminEntity> _userManager, IValidator<Command> validator) : IRequestHandler<Command, Result<AdminEntity>>
    {
        public async Task<Result<AdminEntity>> Handle(Command request, CancellationToken ct)
        {
            var validationResult = await validator.ValidateAsync(request, ct);

            if (!validationResult.IsValid)
                return Result<AdminEntity>.Failure(string.Join(", ", validationResult.Errors.Select(e => e.ErrorMessage)), 400);

            var user = await _userManager.FindByEmailAsync(request.Dto.Email.ToLowerInvariant().Trim());

            if (user == null)
                return Result<AdminEntity>.Failure("Invalid email or password",400);

            var isPasswordValid = await _userManager.CheckPasswordAsync(user, request.Dto.Password);

            if (!isPasswordValid)
            {
                await _userManager.AccessFailedAsync(user);
                return Result<AdminEntity>.Failure("Invalid email or password", 400);
            }

            return Result<AdminEntity>.Success(user);
        }
    }
}