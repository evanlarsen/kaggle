import {autoinject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {WebApi} from './web-api';

@autoinject
export class App {
  router: Router;

  constructor(private api: WebApi) { }

  configureRouter(config, router){
    config.title = 'Contacts';
    config.map([
      { route: '',              moduleId: 'no-selection',   title: 'Select'},
      { route: 'contacts/:id',  moduleId: 'contact-detail', name:'contacts' }
    ]);

    this.router = router;
  }
}