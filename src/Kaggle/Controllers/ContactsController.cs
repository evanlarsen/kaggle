using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Kaggle.Store;

namespace Kaggle.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        readonly IContactsStore store;

        public ContactsController(IContactsStore store)
        {
            this.store = store;
        }

        // GET api/contacts
        [HttpGet]
        public async Task<IEnumerable<Contact>> Get()
        {
            return await store.GetContactList();
        }

        // GET api/contacts/id={id}
        [HttpGet("{id}")]
        public async Task<Contact> GetById(int id)
        {
            return await store.GetContactDetails(id);
        }

        // POST api/contacts
        [HttpPost]
        public async Task<Contact> Post([FromBody]Contact contact)
        {
            return await store.SaveContact(contact);
        }
    }
}
