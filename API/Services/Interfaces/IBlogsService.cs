namespace API.Services.Interfaces;

public interface IBlogsService
{
    Task<Result<string>> AddBlogAsync(AddBlogDto blog, CancellationToken ct);
}
