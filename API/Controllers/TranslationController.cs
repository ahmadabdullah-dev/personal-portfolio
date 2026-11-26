using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class TranslationController : BaseApiController
{
    private readonly ITranslationService _translationService;
    public TranslationController(ITranslationService translationService)
    {
        _translationService = translationService;
    }
    //[Authorize(Roles = "Admin")]
    [HttpPost("add-translation")]
    public async Task<IActionResult> AddTranslation([FromForm] AddTranslationDto dto, CancellationToken ct)
    {
        var result = await _translationService.AddTranslationAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("get-translations")]
    public async Task<IActionResult> GetTranslations([FromQuery] PaginationParams paginationParams, CancellationToken ct)
    {
        var result = await _translationService.GetTranslationsAsync(paginationParams, ct);
        return HandleResult(result);
    }
}
