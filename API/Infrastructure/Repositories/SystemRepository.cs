namespace API.Infrastructure.Repositories;

public class SystemRepository : ISystemRepository
{
    private readonly ApplicationDbContext _dbContext;
    public SystemRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<bool> IsDbConnectedAsync(CancellationToken ct = default)
    {
        return await _dbContext.Database.CanConnectAsync(ct);
    }
}