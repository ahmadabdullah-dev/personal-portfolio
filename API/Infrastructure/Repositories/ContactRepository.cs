namespace API.Infrastructure.Repositories;
public class ContactRepository : BaseRepository<Contact>, IContactRepository
{   
    public ContactRepository(ApplicationDbContext context) : base(context) {}

    
}