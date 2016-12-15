using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Kaggle.Store
{
    public class LeaderboardsStoreSpec
    {
        [Fact]
        public void Test()
        {
            var store = new LeaderboardsStore();
            var result = store.Parse("ClaimPredictionChallenge,dmvse/hgmi,\"dmvse, Hug Mi\",0.164147196627507,2011-10-09 12:38:25.313333,46");
            Assert.NotNull(result);
        }
    }
}
