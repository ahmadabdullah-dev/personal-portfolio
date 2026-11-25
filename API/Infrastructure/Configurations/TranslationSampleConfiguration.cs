using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.Configurations;

public class TranslationSampleConfiguration : IEntityTypeConfiguration<TranslationSample>
{
    public void Configure(EntityTypeBuilder<TranslationSample> builder)
    {
            builder.Property(x => x.ContentType).HasConversion<string>();
            builder.HasOne(x => x.Translation)
             .WithMany(t => t.Samples)
             .HasForeignKey(x => x.TranslationId)
             .OnDelete(DeleteBehavior.Cascade);
    }
}