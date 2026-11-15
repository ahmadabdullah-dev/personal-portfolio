using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SystemController : BaseApiController
{
    private readonly ISystemService _systemService;

    public SystemController(ISystemService systemService)
    {
        _systemService = systemService;
    }
    [HttpGet("is-db-connected")]
    public async Task<ActionResult<bool>> IsDbConnected(CancellationToken ct = default)
    {
        var result = await _systemService.IsDbConnectedAsync(ct);
        return result;
    }

}