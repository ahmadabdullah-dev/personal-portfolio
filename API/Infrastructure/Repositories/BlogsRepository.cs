using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories;

public class BlogsRepository : BaseRepository<Blog>, IBlogsRepository
{
    public BlogsRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Blog?> GetBySlugAsync(string slug, CancellationToken ct = default)
    {
        return await DbSet.FirstOrDefaultAsync(b => b.Slug == slug, ct);
    }
    //override the GetAllAsync method to include only specific fields for the Blog entity
    public override async Task<PagedList<Blog>> GetAllAsync(PaginationParams p, CancellationToken ct = default)
    {
        var query = DbSet.AsNoTracking()
            .Select(b => new Blog
            {
                Id = b.Id,
                Title = b.Title,
                CreatedAt = b.CreatedAt,
                ImageUrl = b.ImageUrl,
                Slug = b.Slug,
                Tags = b.Tags,
            });

        return await PagedList<Blog>.CreateAsync(query, p.Page, p.PageSize, ct);
    }
}
