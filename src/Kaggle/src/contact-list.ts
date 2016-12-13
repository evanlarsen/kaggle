import {autoinject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {WebApi, Contact} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';

@autoinject
export class ContactList {
  contacts: Contact[];
  selectedId: number;

  constructor(private api: WebApi, private ea: EventAggregator){
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
      let id = msg.contact.id;
      let found = this.contacts.find(x => x.id === id);
      Object.assign(found, msg.contact);
    });
  }

  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact: Contact){
    this.selectedId = contact.id;
    return true;
  }
}