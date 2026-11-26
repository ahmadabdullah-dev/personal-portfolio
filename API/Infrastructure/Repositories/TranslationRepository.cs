using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Repositories;

public class TranslationRepository : BaseRepository<Translation>, ITranslationRepository
{
    public TranslationRepository(ApplicationDbContext context) : base(context) {}

    public async override Task<PagedList<Translation>> GetAllAsync(PaginationParams paginationParams, CancellationToken ct)
    {
        var query = DbSet.Where(t => t.IsPublished)
            .AsNoTracking()
            .OrderByDescending(t => t.CreatedAt);

        return await PagedList<Translation>.CreateAsync(query, paginationParams.Page, paginationParams.PageSize, ct);
    }
}
