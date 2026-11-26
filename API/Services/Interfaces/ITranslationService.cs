namespace API.Services.Interfaces;

public interface ITranslationService
{
    Task<Result<string>> AddTranslationAsync(AddTranslationDto dto, CancellationToken ct);
    Task<Result<PagedList<TranslationDto>>> GetTranslationsAsync(PaginationParams paginationParams, CancellationToken ct);
    Task<Result<string>> DeleteTranslationAsync(string id, CancellationToken ct);
    Task<Result<TranslationDto>> GetTranslationByIdAsync(string id, CancellationToken ct);

}
