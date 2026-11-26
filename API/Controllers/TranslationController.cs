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
    //[Authorize(Roles = "Admin")]
    [HttpDelete("delete-translation/{id}")]
    public async Task<IActionResult> DeleteTranslation(string id, CancellationToken ct)
    {
        var result = await _translationService.DeleteTranslationAsync(id, ct);
        return HandleResult(result);
    }
    [HttpGet("get-translation/{id}")]
    public async Task<IActionResult> GetTranslationById(string id, CancellationToken ct)
    {
        var result = await _translationService.GetTranslationByIdAsync(id, ct);
        return HandleResult(result);
    }
}
