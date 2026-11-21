using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SkillsController : BaseApiController
{
    private readonly ISkillsService _skillsService;
    public SkillsController(ISkillsService skillsService)
    {
        _skillsService = skillsService;
    }
    [HttpGet("all")]
    public async Task<IActionResult> GetSkills()
    {
        var result = await _skillsService.GetAllSkillsAsync(CancellationToken.None);
        return HandleResult(result);
    }
    [Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> CreateSkill(SkillDto dto, CancellationToken ct)
    {
        var result = await _skillsService.AddSkillAsync(dto, ct);
        return HandleResult(result);
    }
    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteSkill(SkillDto dto, CancellationToken ct)
    {
        var result = await _skillsService.DeleteSkillAsync(dto, ct);
        return HandleResult(result);
    }
}