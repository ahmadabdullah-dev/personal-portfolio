namespace API.Dtos;

public class AddTranslationDto
{
    public IFormFile? Image { get; set; }
    public required string Language { get; set; }
    public string? LanguageCode { get; set; }
    public required string SourceLanguage { get; set; }
    public string? Slug { get; set; }
    public string? Tagline { get; set; }
    public string? Description { get; set; }
    public decimal? PricePerWord { get; set; }
    public string? Currency { get; set; } 
    public string? PriceNote { get; set; }
    public bool IsPublished { get; set; } = true;
    public bool IsFeatured { get; set; }
    public int DisplayOrder { get; set; }
}

