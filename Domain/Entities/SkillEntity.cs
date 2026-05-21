namespace Domain.Entities;
public class SkillEntity
{
    public string Id { get; init; } = Guid.NewGuid().ToString();
    public string Category { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Order { get; set; }

    public string? UserId { get; set; }
    public AdminEntity? User { get; set; }
}
