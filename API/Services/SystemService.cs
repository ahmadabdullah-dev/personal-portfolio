namespace API.Services;

public class SystemService : ISystemService
{
    private readonly ISystemRepository _systemRepository;

    public SystemService(ISystemRepository systemRepository)
    {
        _systemRepository = systemRepository;
    }
    public async Task<bool> IsDbConnectedAsync(CancellationToken ct = default)
    {
        return await _systemRepository.IsDbConnectedAsync(ct);
    }
}