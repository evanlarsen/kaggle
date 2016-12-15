import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebApi} from './web-api';

@autoinject
export class App {
  router: Router;

  constructor(private api: WebApi) { }

  configureRouter(config, router){
    config.title = 'Leaderboards';
    config.map([
      { route: '',              moduleId: 'no-selection',   title: 'Select'},
      { route: 'leaderboard/:id',  moduleId: 'leaderboard-detail', name:'leaderboard' }
    ]);

    this.router = router;
  }
}