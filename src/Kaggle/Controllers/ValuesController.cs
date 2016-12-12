using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Kaggle.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    {
        readonly IStore store;

        public StoreController(IStore store)
        {
            this.store = store;
        }

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<Book>> Get()
        {
            return await store.GetBooks();
        }

        // GET api/store/id={guid}
        [HttpGet("{id}")]
        public async Task<Book> Get(Guid id)
        {
            return await store.GetBook(id);
        }

        // POST api/store
        [HttpPost]
        public async Task<Guid> Post([FromBody]Book book)
        {
            return await store.SaveBook(book);
        }

        // PUT api/store/
        [HttpPut]
        public async Task Put([FromBody]Book book)
        {
            await store.SaveBook(book);
        }

        // DELETE api/store/id={guid}
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await store.DeleteBook(id);
        }
    }
}
