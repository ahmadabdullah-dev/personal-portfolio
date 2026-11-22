namespace API.Services;

public class BlogsService : IBlogsService
{
    private readonly IBlogsRepository _blogsRepository;
    public BlogsService(IBlogsRepository blogsRepository)
    {
        _blogsRepository = blogsRepository;
    }
}
