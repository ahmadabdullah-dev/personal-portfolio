using static System.Reflection.Metadata.BlobBuilder;

namespace API.Services;

public class TranslationService : ITranslationService
{
    private readonly ITranslationRepository _translationRepository;
    private readonly IFileService _fileService;
    private readonly ILogger<TranslationService> _logger;

    public TranslationService(ITranslationRepository translationRepository, 
        IFileService fileService, 
        ILogger<TranslationService> logger)
    {
        _translationRepository = translationRepository;
        _fileService = fileService;
        _logger = logger;
    }

    public async Task<Result<string>> AddTranslationAsync(AddTranslationDto dto, CancellationToken ct)
    {
        string? imageUrl = null;
        string? imagePublicId = null;

        if (dto.Image is not null)
        {
            var imageResult = await _fileService.UploadImage(dto.Image);

            if (!imageResult.IsSuccess)
                return Result<string>.Failure(imageResult.Error!, 400);

            imageUrl = imageResult.Value!.Url;
            imagePublicId = imageResult.Value.PublicId;
        }

        var translation = new Translation
        {
            SourceLanguage = dto.SourceLanguage,
            Slug = dto.Slug,
            Currency = dto.Currency ?? "",
            Description = dto.Description ?? "",
            Tagline = dto.Tagline,
            PriceNote = dto.PriceNote,
            PricePerWord = dto.PricePerWord ?? 0,
            LanguageCode = dto.LanguageCode,
            DisplayOrder = dto.DisplayOrder,
            IsFeatured = dto.IsFeatured,
            Language = dto.Language
        };
        try
        {
            await _translationRepository.AddAsync(translation, ct);
            await _translationRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            if (imagePublicId is not null)
            {
                var cleanup = await _fileService.DeleteFile(imagePublicId);

                if (!cleanup.IsSuccess)
                    _logger.LogWarning($"Orphaned Cloudinary image {imagePublicId}");
            }

            _logger.LogError(ex, "An error occurred while adding the blog.");
            return Result<string>.Failure($"Failed to add translation", 400);
        }
        return Result<string>.Success("Translation added successfully");
    }

    public async Task<Result<PagedList<TranslationDto>>> GetTranslationsAsync(PaginationParams paginationParams, CancellationToken ct)
    {
        var translations = await _translationRepository.GetAllAsync(paginationParams,ct);
      
        var dtos = new PagedList<TranslationDto>
        {
            Items = translations.Items.Select(t => new TranslationDto
            {
                Id = t.Id,
                Language = t.Language,
                LanguageCode = t.LanguageCode,
                SourceLanguage = t.SourceLanguage,
                Slug = t.Slug,
                Tagline = t.Tagline,
                Description = t.Description,
                PricePerWord = t.PricePerWord,
                Currency = t.Currency,
                PriceNote = t.PriceNote,
                IsPublished = t.IsPublished,
                IsFeatured = t.IsFeatured,
                DisplayOrder = t.DisplayOrder,
                ImageUrl = t.ImageUrl
            }).ToList(),

            CurrentPage = translations.CurrentPage,
            TotalCount = translations.TotalCount,
            TotalPages = translations.TotalPages
        };

        return Result<PagedList<TranslationDto>>.Success(dtos);
    }   
}
