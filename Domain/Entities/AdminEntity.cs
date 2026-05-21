using Microsoft.AspNetCore.Identity;

namespace Domain.Entities;
public class AdminEntity : IdentityUser
{   
    public string? Title { get; set; }
    public string? AvatarUrl { get; set; }
    public string? FullName { get; set; }
    public string? Bio { get; set; }
    public string? Location { get; set; }
    public string? GitHubUrl { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? ResumeUrl { get; set; }

    public ICollection<SkillEntity> Skills { get; set; } = new List<SkillEntity>();
}

