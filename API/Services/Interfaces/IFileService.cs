using CloudinaryDotNet.Actions;

namespace API.Services.Interfaces;

public interface IFileService
{
    Task<Result<CloudUploadResult>> UploadImage(IFormFile file);
    Task<Result<CloudUploadResult>> UploadRawFile(IFormFile file);
    Task<Result<string>> DeleteFile(string publicId, ResourceType resourceType = ResourceType.Image);
}