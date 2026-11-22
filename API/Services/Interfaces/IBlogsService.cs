namespace API.Services.Interfaces;

public interface IBlogsService
{
    Task<Result<string>> AddBlogAsync(AddBlogDto blog, CancellationToken ct);
    Task<Result<BlogDto>> GetBlogBySlugAsync(string slug, CancellationToken ct);

}
