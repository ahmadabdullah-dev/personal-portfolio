namespace API.Infrastructure.Repositories.Interfaces;

public interface ISkillsRepository : IBaseRepository<Skill>
{
    Task<Skill?> GetSkillByNameAndCategoryAsync(string name, string category, CancellationToken ct = default);
    Task<string> DeleteSkillByNameAndCategory(string name, string category, CancellationToken ct = default);
    Task<List<Skill>> GetAllSkillsAsync(CancellationToken ct = default);

}
