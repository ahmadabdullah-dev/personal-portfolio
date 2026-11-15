namespace API.Infrastructure.Repositories.Interfaces;

public interface ISystemRepository
{
    Task<bool> IsDbConnectedAsync(CancellationToken ct = default);
}