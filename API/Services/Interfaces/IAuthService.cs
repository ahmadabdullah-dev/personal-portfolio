namespace API.Services.Interfaces;

public interface IAuthService
{
    Task<Result<string>> RequestLoginAsync(RequestLoginDTO dto);
    Task<Result<string>> LoginAsync(LoginDTO dto);  
    Task<Result<string>> LogoutAsync();
}
