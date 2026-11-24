namespace API.Services.Interfaces;

public interface IBlogsService
{
    Task<Result<string>> AddBlogAsync(AddBlogDto blog, CancellationToken ct);
    Task<Result<BlogDto>> GetBlogBySlugAsync(string slug, CancellationToken ct);
    Task<Result<PagedList<BlogDto>>> GetAllBlogsAsync(PaginationParams p, CancellationToken ct);
    Task<Result<string>> DeleteBlogAsync(string slug, CancellationToken ct);


}
