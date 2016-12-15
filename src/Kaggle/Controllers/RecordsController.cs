using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Kaggle.Store;

namespace Kaggle.Controllers
{
    public class RecordsController : Controller
    {
        readonly IStore store;

        public RecordsController(IStore store)
        {
            this.store = store;
        }

        // GET api/records
        [Route("api/records")]
        public async Task<IEnumerable<Record>> Get()
        {
            return await store.GetRecords();
        }

        // GET api/leaderboard/{id}
        [HttpGet("api/leaderboard/{id}")]
        public async Task<List<Record>> GetById(string id)
        {
            return await store.GetRecordsForLeaderboard(id);
        }

        [HttpGet("api/leaderboards")]
        public async Task<List<string>> GetLeaderboards()
        {
            return await store.GetLeaderboards();
        }

        // POST api/records
        [HttpPost("api/leaderboard")]
        public async Task<Record> Post([FromBody]Record record)
        {
            return await store.SaveRecord(record);
        }
    }
}
