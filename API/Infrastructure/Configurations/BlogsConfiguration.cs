using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Configurations;

public class BlogConfiguration : IEntityTypeConfiguration<Blog>
{
    public void Configure(EntityTypeBuilder<Blog> builder)
    {
        builder.Property(b => b.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(b => b.Slug)
            .IsRequired()
            .HasMaxLength(250);

        builder.HasIndex(b => b.Slug)
            .IsUnique();

        builder.Property(b => b.Content)
            .IsRequired();

        builder.Property(b => b.ImageUrl)
            .HasMaxLength(500);

        builder.Property(b => b.ImagePublicId)
            .HasMaxLength(200);

    }
}