using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaggle.Store
{
    public interface IContactsStore
    {
        Task<List<Contact>> GetContactList();
        Task<Contact> SaveContact(Contact book);
        Task<Contact> GetContactDetails(int id);
    }

    public class ContactsStore : IContactsStore
    {
        int id = 0;
        readonly List<Contact> contacts;
        int GetId() { return ++id; }

        public ContactsStore()
        {
            contacts = new List<Contact>();
            contacts.AddRange(new List<Contact>
            {
                new Contact { Id = GetId(), FirstName = "John", LastName = "Tolkien", Email = "tolkien@inklings.com", PhoneNumber = "867-5309" },
                new Contact { Id = GetId(), FirstName = "Clive", LastName = "Lewis", Email = "lewis@inklings.com", PhoneNumber = "867-5309" },
                new Contact { Id = GetId(), FirstName = "Owen", LastName = "Barfield", Email = "barfield@inklings.com", PhoneNumber = "867-5309" },
                new Contact { Id = GetId(), FirstName = "Charles", LastName = "Williams", Email = "williams@inklings.com", PhoneNumber = "867-5309" },
                new Contact { Id = GetId(), FirstName = "Roger", LastName = "Green", Email = "green@inklings.com", PhoneNumber = "867-5309" },
            });
        }

        public Task<List<Contact>> GetContactList()
        {
            return Task.FromResult(contacts);
        }

        public Task<Contact> GetContactDetails(int id)
        {
            var contact = contacts.FirstOrDefault(c => c.Id.Equals(id));
            if (contact == null)
            {
                throw new ArgumentException($"contact with id {id} was not found");
            }
            return Task.FromResult(contact);
        }

        public Task<Contact> SaveContact(Contact contact)
        {
            var found = contacts.FirstOrDefault(c => c.Id.Equals(contact.Id));
            if (found != null)
            {
                var index = contacts.IndexOf(found);
                contacts[index] = contact;
            } else
            {
                contact.Id = GetId();
                contacts.Add(contact);
            }
            return Task.FromResult(contact);
        }
    }

    public class Contact
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
