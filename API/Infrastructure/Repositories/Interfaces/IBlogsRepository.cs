namespace API.Infrastructure.Repositories.Interfaces;

public interface IBlogsRepository : IBaseRepository<Blog> 
{
    public Task<Blog?> GetBySlugAsync(string slug, CancellationToken ct = default);
}
