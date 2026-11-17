using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ContactController : BaseApiController
{
    private readonly IContactService _contactService;
    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }
    [HttpGet("get-contacts")]
    public async Task<ActionResult<Result<PagedList<ContactDTO>>>> GetContacts([FromQuery] PaginationParams p, CancellationToken ct)
    {
        var result = await _contactService.GetContactsAsync(p, ct);
        return HandleResult(result);
    }
    [HttpPost("create")]
    public async Task<ActionResult<Result<string>>> CreateContact(CreateContactDTO dto, CancellationToken ct)
    {
        var result = await _contactService.CreateContactAsync(dto, ct);
        return HandleResult(result);
    }
}
