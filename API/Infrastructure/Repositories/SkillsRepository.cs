namespace API.Infrastructure.Repositories;

using Microsoft.EntityFrameworkCore;

public class SkillsRepository : BaseRepository<Skill>, ISkillsRepository
{
    public SkillsRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Skill?> GetSkillByNameAndCategoryAsync(string name, string category, CancellationToken ct = default)
    {
        return await DbSet.FirstOrDefaultAsync(s => s.Name == name && s.Category == category, ct);
    }
    public async Task<string> DeleteSkillByNameAndCategory(string name, string category, CancellationToken ct = default)
    {
        var skill = await GetSkillByNameAndCategoryAsync(name, category, ct);
       
        if (skill == null)
            return "Skill not found.";
        
        DbSet.Remove(skill);
        await Db.SaveChangesAsync(ct);

        return "Skill deleted successfully.";
    }
    public async Task<List<Skill>> GetAllSkillsAsync(CancellationToken ct = default)
    {
        return await DbSet.ToListAsync(ct);
    }

}