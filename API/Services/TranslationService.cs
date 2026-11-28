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
    public async Task<Result<string>> DeleteTranslationAsync(string id, CancellationToken ct)
    {
        var translation = await _translationRepository.GetByIdAsync(id, ct);

        if (translation is null)
            return Result<string>.Failure("Translation not found", 404);

        try
        {
            if (translation.ImagePublicId is not null)
            {
                var deleteResult = await _fileService.DeleteFile(translation.ImagePublicId);
                if (!deleteResult.IsSuccess)
                    _logger.LogWarning($"Failed to delete image {translation.ImagePublicId} from cloud storage.");
            }
            _translationRepository.Remove(translation);
            await _translationRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the translation.");
            return Result<string>.Failure("An error occurred while deleting the translation.", 400);
        }
        return Result<string>.Success("Translation deleted successfully.");
    }
    public async Task<Result<TranslationDto>> GetTranslationByIdAsync(string id, CancellationToken ct)
    {
        var translation = await _translationRepository.GetByIdAsync(id, ct);
       
        if (translation is null)
            return Result<TranslationDto>.Failure("Translation not found", 404);
        
        var dto = new TranslationDto
        {
            Id = translation.Id,
            Language = translation.Language,
            LanguageCode = translation.LanguageCode,
            SourceLanguage = translation.SourceLanguage,
            Slug = translation.Slug,
            Tagline = translation.Tagline,
            Description = translation.Description,
            PricePerWord = translation.PricePerWord,
            Currency = translation.Currency,
            PriceNote = translation.PriceNote,
            IsPublished = translation.IsPublished,
            IsFeatured = translation.IsFeatured,
            DisplayOrder = translation.DisplayOrder,
            ImageUrl = translation.ImageUrl
        };
        return Result<TranslationDto>.Success(dto);
    }
    public async Task<Result<string>> UpdateTranslationAsync(UpdateTranslationDto dto, CancellationToken ct)
    {
        var translation = await _translationRepository.GetByIdAsync(dto.Id, ct);

        if (translation is null)
            return Result<string>.Failure("Translation not found", 404);

        if (dto.Image is not null)
        {
            if (translation.ImagePublicId is not null)
            {
                var deleteResult = await _fileService.DeleteFile(translation.ImagePublicId);
                if (!deleteResult.IsSuccess)
                    _logger.LogWarning($"Failed to delete old image {translation.ImagePublicId} from cloud storage.");
            }

            var uploadResult = await _fileService.UploadImage(dto.Image);

            if (!uploadResult.IsSuccess)
                return Result<string>.Failure(uploadResult.Error!, 400);

            translation.ImageUrl = uploadResult.Value!.Url;
            translation.ImagePublicId = uploadResult.Value.PublicId;
        }

        translation.Slug = dto.Slug ?? translation.Slug;
        translation.Language = dto.Language ?? translation.Language;
        translation.IsPublished = dto.IsPublished;
        translation.IsFeatured = dto.IsFeatured ?? translation.IsFeatured;
        translation.DisplayOrder = dto.DisplayOrder ?? translation.DisplayOrder;
        translation.LanguageCode = dto.LanguageCode ?? translation.LanguageCode;
        translation.SourceLanguage = dto.SourceLanguage ?? translation.SourceLanguage;
        translation.Tagline = dto.Tagline ?? translation.Tagline;
        translation.Description = dto.Description ?? translation.Description;
        translation.PricePerWord = dto.PricePerWord ?? translation.PricePerWord;
        translation.Currency = dto.Currency ?? translation.Currency;
        translation.PriceNote = dto.PriceNote ?? translation.PriceNote;
        

        try
        {
            _translationRepository.Update(translation);
            await _translationRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the translation.");
            return Result<string>.Failure("An error occurred while updating the translation.", 400);
        }
        return Result<string>.Success("Translation updated successfully.");
    }

    public async Task<Result<TranslationDto>> GetTranslationBySlugAsync(string slug, CancellationToken ct)
    {
        var translation = await _translationRepository.GetBySlugAsync(slug, ct);

        if (translation is null)
            return Result<TranslationDto>.Failure("Translation not found", 404);

        var dto = new TranslationDto
        {
            Id = translation.Id,
            Language = translation.Language,
            LanguageCode = translation.LanguageCode,
            SourceLanguage = translation.SourceLanguage,
            Slug = translation.Slug,
            Tagline = translation.Tagline,
            Description = translation.Description,
            PricePerWord = translation.PricePerWord,
            Currency = translation.Currency,
            PriceNote = translation.PriceNote,
            IsPublished = translation.IsPublished,
            IsFeatured = translation.IsFeatured,
            DisplayOrder = translation.DisplayOrder,
            ImageUrl = translation.ImageUrl
        };
        return Result<TranslationDto>.Success(dto);
    }

}
