namespace API.Dtos;

public record RequestLoginDTO(
    string Email,
    string Password
);
public record LoginDTO(
    string Email,
    string Code,
    bool IsPersistence
);