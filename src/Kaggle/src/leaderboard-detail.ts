import {autoinject} from 'aurelia-framework';
import {RouteConfig} from 'aurelia-router';
import {WebApi, RecordWithRank} from './web-api';
import {areEqual} from './utility';
import {EventAggregator} from 'aurelia-event-aggregator';
import {LeaderboardViewed} from './messages';

@autoinject
export class LeaderboardDetail {
  routeConfig: RouteConfig;
  records: RecordWithRank[];

  constructor(private api: WebApi, private ea: EventAggregator) { }

  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getLeaderboard(params.id).then(records => {
      this.records = records;
      this.routeConfig.navModel.setTitle(params.id);
      this.ea.publish(new LeaderboardViewed(params.id));
    });
  }

  attached() {
    (<any>$('a[data-toggle=popover]')).popover();
  }

}