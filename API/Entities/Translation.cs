namespace API.Entities;

public class Translation : BaseEntity
{
    public required string Language { get; set; }
    public string? LanguageCode { get; set; }
    public string SourceLanguage { get; set; } = "English";

    public string? Slug { get; set; }
    public string? Tagline { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? ImagePublicId { get; set; }

    public decimal? PricePerWord { get; set; }
    public string Currency { get; set; } = "USD";
    public string? PriceNote { get; set; }

    public bool IsPublished { get; set; } = true;
    public bool IsFeatured { get; set; }
    public int DisplayOrder { get; set; }

    public ICollection<TranslationSample> Samples { get; set; } = new List<TranslationSample>();
}