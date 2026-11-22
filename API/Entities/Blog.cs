namespace API.Entities;

public class Blog : BaseEntity
{   
    public string? ImageUrl { get; set; }
    public string? ImagePublicId { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string[]? Tags { get; set; } = Array.Empty<string>();
}
