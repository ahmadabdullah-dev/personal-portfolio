namespace Application.Features.Admin.DTOs;

public record LoginDto(
    string Email,
    string Password,
    bool RememberMe
);
