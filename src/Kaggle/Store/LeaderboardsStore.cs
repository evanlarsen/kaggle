using FileHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.PlatformAbstractions;
using System.IO;
using System.Text.RegularExpressions;

namespace Kaggle.Store
{
    public interface IStore
    {
        Task<List<Record>> GetRecords();
        Task<Record> SaveRecord(Record record);
        Task<Record> GetRecordDetails(int id);
        Task<List<RecordWithRank>> GetRecordsForLeaderboard(string leaderboard);
        Task<List<string>> GetLeaderboards();
    }

    public class LeaderboardsStore : IStore
    {
        readonly List<Record> records;
        HashSet<string> leaderboards;
        int id = 0;
        int GetId() { return ++id; }

        public LeaderboardsStore()
        {
            this.records = Read();
        }

        public Task<List<Record>> GetRecords()
        {
            return Task.FromResult(records);
        }

        public Task<List<RecordWithRank>> GetRecordsForLeaderboard(string leaderboard)
        {
            var leaderboardRecords = records
                .Where(r => r.CompetitionName.Equals(leaderboard, StringComparison.CurrentCultureIgnoreCase))
                .OrderByDescending(r => r.Score)
                .Select((value, index) => new RecordWithRank(index+1, value));

            return Task.FromResult(leaderboardRecords.ToList());
        }

        public Task<List<string>> GetLeaderboards()
        {
            if (leaderboards != null)
            {
                return Task.FromResult(leaderboards.ToList());
            }
            leaderboards = new HashSet<string>();
            foreach(var record in records)
            {
                leaderboards.Add(record.CompetitionName);
            }
            return Task.FromResult(leaderboards.ToList());
        }

        public Task<Record> SaveRecord(Record record)
        {
            var found = records.FirstOrDefault(c => c.Id.Equals(record.Id));
            if (found != null)
            {
                var index = records.IndexOf(found);
                records[index] = record;
            }
            else
            {
                record.Id = GetId();
                records.Add(record);
            }
            return Task.FromResult(record);
        }

        public Task<Record> GetRecordDetails(int id)
        {
            var record = records.FirstOrDefault(c => c.Id.Equals(id));
            if (record == null)
            {
                throw new ArgumentException($"record with id {id} was not found");
            }
            return Task.FromResult(record);
        }


        List<Record> Read()
        {
            List<Record> records = new List<Record>();
            using (StreamReader reader = File.OpenText(@"leaderboards.csv"))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    records.Add(Parse(line));
                }
            }
            return records;
        }

        public Record Parse(string line)
        {
            string[] result = Regex.Split(line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
            if (result != null && result.Length == 6)
            {
                return new Record(GetId(), result);
            }
            return null;
        }
    }
}
