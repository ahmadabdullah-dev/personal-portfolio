namespace API.Services.Interfaces;

public interface ISystemService
{
    Task<bool> IsDbConnectedAsync(CancellationToken ct);
}