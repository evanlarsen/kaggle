using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Kaggle.Store
{
    public class RecordWithRank : Record
    {
        public int Rank;

        public RecordWithRank(int rank, Record record)
            : base(record)
        {
            this.Rank = rank;
        }
    }

    public class Record
    {
        public int Id;
        ////CompetitionName,TeamName,UserNames,Score,ScoreFirstSubmittedDate,NumSubmissions
        public string CompetitionName;
        public string TeamName;
        public string UserNames;
        public double Score;
        public string ScoreFirstSubmittedDate;
        public int NumSubmissions;

        public Record(int id, string[] parsedLine)
        {
            Id = id;
            CompetitionName = parsedLine[0];
            TeamName = parsedLine[1];
            UserNames = parsedLine[2];
            double.TryParse(parsedLine[3], out Score);
            ScoreFirstSubmittedDate = parsedLine[4];
            int.TryParse(parsedLine[5], out NumSubmissions);
        }

        public Record(Record record)
        {
            this.Id = record.Id;
            this.CompetitionName = record.CompetitionName;
            this.TeamName = record.TeamName;
            this.UserNames = record.UserNames;
            this.Score = record.Score;
            this.ScoreFirstSubmittedDate = record.ScoreFirstSubmittedDate;
            this.NumSubmissions = record.NumSubmissions;
        }
    }
}
