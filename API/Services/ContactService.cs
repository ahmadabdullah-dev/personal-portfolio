using Microsoft.Extensions.Options;

namespace API.Services;

public class ContactService : IContactService
{
    private readonly IContactRepository _contactRepository;
    private readonly ReceiverConfiguration _receiverConfiguration;
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactService> _logger;

    public ContactService(
        IContactRepository contactRepository,
        IOptions<ReceiverConfiguration> receiverConfiguration,
        IEmailService emailService,
        ILogger<ContactService> logger)
    {
        _contactRepository = contactRepository;
        _receiverConfiguration = receiverConfiguration.Value;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<Result<PagedList<ContactDTO>>> GetContactsAsync(PaginationParams p, CancellationToken ct)
    {
        var contacts = await _contactRepository.GetAllAsync(p, ct);

        if (contacts is null || contacts.Items.Count == 0)
            return Result<PagedList<ContactDTO>>.Failure("No messages found", 404);

        var dtos = new PagedList<ContactDTO>
        {
            Items = contacts.Items.Select(x => new ContactDTO(x.FullName, x.Email, x.Message, x.CreatedAt)).ToList(),
            CurrentPage = contacts.CurrentPage,
            TotalPages = contacts.TotalPages,
            TotalCount = contacts.TotalCount
        };

        return Result<PagedList<ContactDTO>>.Success(dtos);
    }

    public async Task<Result<string>> CreateContactAsync(CreateContactDTO dto, CancellationToken ct)
    {
        var contact = new Contact
        {
            FullName = dto.FullName,
            Email = dto.Email,
            Message = dto.Message,
            CreatedAt = DateTime.UtcNow
        };

        try
        {
            await _contactRepository.AddAsync(contact, ct);
            await _contactRepository.SaveChangesAsync(ct);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to save contact message");
            return Result<string>.Failure("Unexpected error occurred while sending the message", 500);
        }

        try
        {
            await _emailService.SendEmailAsync(_receiverConfiguration.Email,"New Message",$"From: {dto.FullName}\nEmail: {dto.Email}\nMessage: {dto.Message}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact notification email");
        }

        return Result<string>.Success("Message sent successfully");
    }
}