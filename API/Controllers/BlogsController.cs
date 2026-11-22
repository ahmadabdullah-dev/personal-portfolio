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
    public async Task<IActionResult> AddBlog(AddBlogDto dto, CancellationToken ct)
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
}
