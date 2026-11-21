namespace API.Services.Interfaces;

public interface IUserService
{
    public string? GetCurrentUserId();
    public Task<Result<UserDTO>> CurrentUserAsync();

}
