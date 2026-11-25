namespace API.Entities;

public class TranslationSample : BaseEntity
{
    public required string TranslationId { get; set; }
    public Translation Translation { get; set; } = null!;

    public required string Title { get; set; }
    public string? Slug { get; set; }
    public string? Summary { get; set; }

    public string? Client { get; set; }
    public bool IsClientConfidential { get; set; }
    public string? Industry { get; set; }
    public string? ContentType { get; set; }
    public DateOnly? CompletedOn { get; set; }
    public string? ClientTestimonial { get; set; }

    public string? SourceText { get; set; }
    public string? TranslatedText { get; set; }
    public int? SourceWordCount { get; set; }

    public string? Challenges { get; set; }
    public string? Approach { get; set; }

    public string? DocumentUrl { get; set; }
    public string? DocumentPublicId { get; set; }
    public string? ImageUrl { get; set; }
    public string? ImagePublicId { get; set; }

    public bool IsFeatured { get; set; }
    public bool IsPublished { get; set; } = true;
    public int DisplayOrder { get; set; }
}


