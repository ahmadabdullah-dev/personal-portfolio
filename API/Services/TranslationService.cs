namespace API.Services;

public class TranslationService : ITranslationService
{
    private readonly ITranslationRepository _translationRepository;
    public TranslationService(ITranslationRepository translationRepository)
    {
        _translationRepository = translationRepository;
    }
}
