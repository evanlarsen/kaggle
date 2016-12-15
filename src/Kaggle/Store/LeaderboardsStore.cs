using FileHelpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaggle.Store
{
    public class LeaderboardsStore
    {
        public List<Record> Read()
        {
            var engine = new FileHelperEngine<Record>();
            var records = engine.ReadFile("leaderboards.csv");
            return records.ToList();
        }
    }

    [DelimitedRecord(",")]
    public class Record
    {
        ////CompetitionName,TeamName,UserNames,Score,ScoreFirstSubmittedDate,NumSubmissions
        public string CompetitionName;
        public string TeamName;
        public string UserNames;
        [FieldConverter(ConverterKind.Decimal, ".")]
        public double Score;
        [FieldConverter(ConverterKind.Date)]
        public DateTime ScoreFirstSubmittedDate;
        public int NumSubmissions;
    }
}
