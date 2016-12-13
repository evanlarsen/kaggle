using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Kaggle.Store.spec
{
    public class ContactsStoreTests
    {
        readonly ContactsStore store;
        public ContactsStoreTests()
        {
            this.store = new ContactsStore();
        }

        [Fact]
        public async Task ContactsIdShouldIncrement()
        {
            var contacts = await store.GetContactList();
            Assert.NotNull(contacts.FirstOrDefault(c => c.Id.Equals(1)));
            Assert.NotNull(contacts.FirstOrDefault(c => c.Id.Equals(2)));
            Assert.NotNull(contacts.FirstOrDefault(c => c.Id.Equals(3)));
            Assert.NotNull(contacts.FirstOrDefault(c => c.Id.Equals(4)));
        }

        [Fact]
        public async Task UpdateContactInformation()
        {
            var contact = await store.GetContactDetails(1);
            var firstName = "Test";
            var lastName = "Test";
            var email = "test@test.com";
            var phoneNumber = "911";
            contact.FirstName = firstName;
            contact.LastName = lastName;
            contact.Email = email;
            contact.PhoneNumber = phoneNumber;
            await store.SaveContact(contact);
            var found = store.GetContactDetails(1);
            Assert.True(contact.FirstName.Equals(firstName));
            Assert.True(contact.LastName.Equals(lastName));
            Assert.True(contact.Email.Equals(email));
            Assert.True(contact.PhoneNumber.Equals(phoneNumber));
        }
    }
}
