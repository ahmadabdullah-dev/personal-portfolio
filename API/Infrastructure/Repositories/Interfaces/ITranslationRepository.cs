namespace API.Infrastructure.Repositories.Interfaces;

public interface ITranslationRepository : IBaseRepository<Translation>
{
    Task<Translation> GetBySlugAsync(string slug, CancellationToken ct);

}
