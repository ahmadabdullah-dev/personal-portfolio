namespace API.Controllers;

public class BlogsController : BaseApiController
{
    private readonly IBlogsService _blogsService;
    public BlogsController(IBlogsService blogsService)
    {
        _blogsService = blogsService;
    }
}
