namespace API.Services.Interfaces;

public interface IContactService
{
    Task<Result<PagedList<ContactDTO>>> GetContactsAsync(PaginationParams p, CancellationToken ct);
    Task<Result<string>> CreateContactAsync(CreateContactDTO dto, CancellationToken ct);
}
