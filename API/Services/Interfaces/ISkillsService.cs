namespace API.Services.Interfaces;

public interface ISkillsService
{
    Task<Result<string>> AddSkillAsync(SkillDto dto, CancellationToken ct);
    Task<Result<string>> DeleteSkillAsync(SkillDto dto, CancellationToken ct);
    Task<Result<List<SkillDto>>> GetAllSkillsAsync(CancellationToken ct);

}
