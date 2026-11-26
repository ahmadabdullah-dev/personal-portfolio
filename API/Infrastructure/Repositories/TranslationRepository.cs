namespace API.Infrastructure.Repositories;

public class TranslationRepository : BaseRepository<Translation>, ITranslationRepository
{
    public TranslationRepository(ApplicationDbContext context) : base(context) {}
}
