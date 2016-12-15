import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebApi, Record} from './web-api';
import {LeaderboardViewed} from './messages';

@autoinject
export class LeaderboardList {
  leaderboards: string[];
  selectedId: string;

  constructor(private api: WebApi, private ea: EventAggregator) {
    ea.subscribe(LeaderboardViewed, msg => this.select(msg));
  }

  created() {
    this.api.getListOfLeaderboards().then(leaderboards => this.leaderboards = leaderboards);
  }

  select(leaderboard: string) {
    this.selectedId = leaderboard;
    return true;
  }
}