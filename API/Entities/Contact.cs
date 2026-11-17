namespace API.Entities;

using System.ComponentModel.DataAnnotations;

public class Contact : BaseEntity
{
    [MaxLength(36)]
    public required string FullName { get; set; } 

    [EmailAddress]
    public required string Email { get; set; } 

    [MaxLength(2048)]
    public required string Message { get; set; } 
}