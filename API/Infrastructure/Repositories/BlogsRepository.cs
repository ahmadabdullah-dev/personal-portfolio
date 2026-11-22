using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories;

public class BlogsRepository : BaseRepository<Blog>, IBlogsRepository
{
    public BlogsRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Blog?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
        return await DbSet.FirstOrDefaultAsync(b => b.Slug == slug, ct);
    }
}
