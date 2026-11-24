using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BlogsController : BaseApiController
{
    private readonly IBlogsService _blogsService;
    public BlogsController(IBlogsService blogsService)
    {
        _blogsService = blogsService;
    }
    //[Authorize]
    [HttpPost("add")]
    public async Task<IActionResult> AddBlog([FromForm] AddBlogDto dto, CancellationToken ct)
    {
        var result = await _blogsService.AddBlogAsync(dto, ct);
        return HandleResult(result);
    }
    [HttpGet("get-by-slug/{slug}")]
    public async Task<IActionResult> GetBlogBySlug(string slug, CancellationToken ct)
    {
        var result = await _blogsService.GetBlogBySlugAsync(slug, ct);
        return HandleResult(result);
    }
    [HttpGet("get-all")]
    public async Task<IActionResult> GetAllBlogs([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _blogsService.GetAllBlogsAsync(p, ct);
        return HandleResult(result);
    }
    //[Authorize]
    [HttpDelete("delete/{slug}")]
    public async Task<IActionResult> DeleteBlog(string slug, CancellationToken ct)
    {
        var result = await _blogsService.DeleteBlogAsync(slug, ct);
        return HandleResult(result);
    }
}
