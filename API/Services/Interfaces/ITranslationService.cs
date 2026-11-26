namespace API.Services.Interfaces;

public interface ITranslationService
{
    Task<Result<string>> AddTranslationAsync(AddTranslationDto dto, CancellationToken ct);

}
