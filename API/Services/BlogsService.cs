namespace API.Services;

public class BlogsService : IBlogsService
{
    private readonly IBlogsRepository _blogsRepository;
    private readonly ILogger<BlogsService> _logger;

    private readonly IFileService _fileService;
    public BlogsService(IBlogsRepository blogsRepository, 
        ILogger<BlogsService> logger, 
        IFileService fileService)
    {
        _blogsRepository = blogsRepository;
        _logger = logger;
        _fileService = fileService;
    }
    public async Task<Result<string>> AddBlogAsync(AddBlogDto dto, CancellationToken ct)
    {
        string? imageUrl = null;
        string? imagePublicId = null;

        if (dto.Image is not null)
        {
            var imageResult = await _fileService.UploadImage(dto.Image);

            if (!imageResult.IsSuccess)
                return Result<string>.Failure(imageResult.Error!, 400);

            imageUrl = imageResult.Value!.Url;
            imagePublicId = imageResult.Value.PublicId;
        }

        var newBlog = new Blog
        {
            ImageUrl = imageUrl,
            ImagePublicId = imagePublicId,
            Slug = dto.Slug,
            Title = dto.Title,
            Content = dto.Content,
            Tags = dto.Tags
        };
        try
        {
            await _blogsRepository.AddAsync(newBlog, ct);
            await _blogsRepository.SaveChangesAsync(ct);

        }
        catch (Exception ex)
        {
            if (imagePublicId is not null)
            {
                var cleanup = await _fileService.DeleteFile(imagePublicId);
               
                if (!cleanup.IsSuccess)
                    _logger.LogWarning($"Orphaned Cloudinary image {imagePublicId}");
            }

            _logger.LogError(ex, "An error occurred while adding the blog.");
            return Result<string>.Failure("An error occurred while adding the blog.",400);
        }
        return Result<string>.Success("Blog added successfully.");
    }
    public async Task<Result<BlogDto>> GetBlogBySlugAsync(string slug, CancellationToken ct)
    {
        var blog = await _blogsRepository.GetBySlugAsync(slug, ct);
        
        if (blog is null)
            return Result<BlogDto>.Failure("Blog not found", 404);

        var blogDto = new BlogDto
        {
            Id = blog.Id,
            ImageUrl = blog.ImageUrl,
            Slug = blog.Slug,
            Title = blog.Title,
            Content = blog.Content,
            Tags = blog.Tags,
            CreatedAt = blog.CreatedAt
        };
        return Result<BlogDto>.Success(blogDto);
    }
    public async Task<Result<PagedList<BlogDto>>> GetAllBlogsAsync(PaginationParams p,CancellationToken ct)
    {
        var blogs = await _blogsRepository.GetAllAsync(p, ct);

        var dtos = new PagedList<BlogDto>
        {
            Items = blogs.Items.Select(blog => new BlogDto
            {
                Id = blog.Id,
                Content = blog.Content,
                ImageUrl = blog.ImageUrl,
                Slug = blog.Slug,
                Title = blog.Title,
                Tags = blog.Tags,
                CreatedAt = blog.CreatedAt
                
            }).ToList(),

            CurrentPage = blogs.CurrentPage,
            TotalCount = blogs.TotalCount,
            TotalPages = blogs.TotalPages
        };

        return Result<PagedList<BlogDto>>.Success(dtos);
    }
    public async Task<Result<string>> DeleteBlogAsync(string id, CancellationToken ct)
    {
        var blog = await _blogsRepository.GetByIdAsync(id, ct);
       
        if (blog is null)
            return Result<string>.Failure("Blog not found", 404);
      
        try
        {
            if (blog.ImagePublicId is not null)
            {
                var deleteResult = await _fileService.DeleteFile(blog.ImagePublicId);
                if (!deleteResult.IsSuccess)
                    _logger.LogWarning($"Failed to delete image {blog.ImagePublicId} from cloud storage.");
            }
            _blogsRepository.Remove(blog);
            await _blogsRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while deleting the blog.");
            return Result<string>.Failure("An error occurred while deleting the blog.", 400);
        }
        return Result<string>.Success("Blog deleted successfully.");
    }
    public async Task<Result<string>> UpdateBlogAsync(UpdateBlogDto dto, CancellationToken ct)
    {
        var blog = await _blogsRepository.GetByIdAsync(dto.Id, ct);
       
        if (blog is null)
            return Result<string>.Failure("Blog not found", 404);
        
        if (dto.Image is not null)
        {
            if (blog.ImagePublicId is not null)
            {
                var deleteResult = await _fileService.DeleteFile(blog.ImagePublicId);
                if (!deleteResult.IsSuccess)
                    _logger.LogWarning($"Failed to delete old image {blog.ImagePublicId} from cloud storage.");
            }
           
            var uploadResult = await _fileService.UploadImage(dto.Image);
           
            if (!uploadResult.IsSuccess)
                return Result<string>.Failure(uploadResult.Error!, 400);
           
            blog.ImageUrl = uploadResult.Value!.Url;
            blog.ImagePublicId = uploadResult.Value.PublicId;
        }
        blog.Slug = dto.Slug ?? blog.Slug;
        blog.Title = dto.Title ?? blog.Title;
        blog.Content = dto.Content ?? blog.Content;
        blog.Tags = dto.Tags ?? blog.Tags;
        try
        {
            _blogsRepository.Update(blog);
            await _blogsRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating the blog.");
            return Result<string>.Failure("An error occurred while updating the blog.", 400);
        }
        return Result<string>.Success("Blog updated successfully.");
    }
}
