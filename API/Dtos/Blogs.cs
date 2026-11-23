namespace API.Dtos;

public class AddBlogDto
{
    public IFormFile? Image { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string[]? Tags { get; set; } = Array.Empty<string>();
}
public class BlogDto
{
    public string Id { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string[]? Tags { get; set; } = Array.Empty<string>();
    public DateTime CreatedAt { get; set; }
}