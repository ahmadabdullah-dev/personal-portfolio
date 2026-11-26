namespace API.Controllers;

public class TranslationController : BaseApiController
{
    private readonly ITranslationService _translationService;
    public TranslationController(ITranslationService translationService)
    {
        _translationService = translationService;
    }
}
