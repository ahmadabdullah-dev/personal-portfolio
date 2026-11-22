namespace API.Dtos;

public class AddBlogDto
{
    public IFormFile? Image { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string[]? Tags { get; set; } = Array.Empty<string>();
}
