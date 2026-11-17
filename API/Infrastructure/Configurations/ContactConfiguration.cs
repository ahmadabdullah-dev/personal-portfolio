namespace API.Infrastructure.Configurations;

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class ContactConfiguration : IEntityTypeConfiguration<Contact>
{
    public void Configure(EntityTypeBuilder<Contact> builder)
    {
        builder.ToTable("Contacts");

        builder.Property(x => x.FullName)
            .IsRequired()
            .HasMaxLength(36);

        builder.Property(x => x.Email)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(x => x.Message)
            .IsRequired()
            .HasMaxLength(2048);

        builder.HasIndex(x => x.CreatedAt);
    }
}