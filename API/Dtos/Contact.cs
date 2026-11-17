using System.ComponentModel.DataAnnotations;

namespace API.Dtos;

public record ContactDTO(string FullName, string Email, string Message, DateTime SentAt);

public class CreateContactDTO
{
    [Required(ErrorMessage = "Full name is required")]
    [StringLength(36, MinimumLength = 2)]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress]
    [StringLength(256)]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Message is required")]
    [StringLength(2048, MinimumLength = 5)]
    public string Message { get; set; } = string.Empty;
}