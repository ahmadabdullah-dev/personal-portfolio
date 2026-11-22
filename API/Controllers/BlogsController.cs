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
    public async Task<ActionResult<Result<string>>> AddBlog(AddBlogDto dto, CancellationToken ct)
    {
        var result = await _blogsService.AddBlogAsync(dto, ct);
        return HandleResult(result);
    }
}
