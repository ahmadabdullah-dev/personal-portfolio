namespace API.Services;

public class SkillsService : ISkillsService
{
    private readonly ISkillsRepository _skillsRepository;
    public SkillsService(ISkillsRepository skillsRepository)
    {
        _skillsRepository = skillsRepository;
    }

    public async Task<Result<string>> AddSkillAsync(SkillDto dto, CancellationToken ct)
    {
        var entity = new Skill()
        {
            Name = dto.Name,
            Category = dto.Category,
        };

        try
        {
            await _skillsRepository.AddAsync(entity, ct);
            await _skillsRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            return Result<string>.Failure($"Unexpected error happened while adding the skill: {ex.Message}",400);
        }
        return Result<string>.Success("Skill added successfully.");
    }
    public async Task<Result<string>> DeleteSkillAsync(SkillDto dto, CancellationToken ct)
    {
        var skill = await _skillsRepository.GetSkillByNameAndCategoryAsync(dto.Name, dto.Category, ct);

        if (skill == null)
            return Result<string>.Failure("Skill not found.", 404);

        await _skillsRepository.DeleteSkillByNameAndCategoryAsync(skill, ct);

        return Result<string>.Success("Skill deleted successfully.");
    }
    public async Task<Result<List<SkillDto>>> GetAllSkillsAsync(CancellationToken ct)
    {
        var skills = await _skillsRepository.GetAllSkillsAsync(ct);

        var dtos = skills.Select(s => new SkillDto(s.Category, s.Name)).OrderBy(s => s.Category).ThenBy(s => s.Name).ToList();

        return Result<List<SkillDto>>.Success(dtos);
    }
}
