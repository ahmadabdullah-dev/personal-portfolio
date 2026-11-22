namespace API.Infrastructure.Repositories;

public class BlogsRepository : BaseRepository<Blog>, IBlogsRepository
{
    public BlogsRepository(ApplicationDbContext context) : base(context) { }
}
