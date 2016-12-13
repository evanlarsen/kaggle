import {autoinject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
};

@autoinject
export class WebApi {
  isRequesting = false;

  constructor(private client: HttpClient) {
    client.configure(config => {
      config
        .withBaseUrl('api/')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request(request) {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response(response) {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        });
    });
  }
  
  getContactList(): Promise<Contact[]>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch('contacts')
        .then(response => {
          response.json()
            .then(contacts => {
              resolve(contacts);
              this.isRequesting = false;
            });
        });
    });
  }

  getContactDetails(id): Promise<Contact>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch(`contacts/${id}`)
        .then(response => {
          response.json()
            .then(contact => {
              resolve(contact);
              this.isRequesting = false;
            });
        });
    });
  }

  saveContact(contact): Promise<Contact>{
    this.isRequesting = true;
    return new Promise(resolve => {
      this.client
        .fetch('contacts', { method: 'POST', body: json(contact) })
        .then(response => {
          response.json()
            .then(contact => {
              resolve(contact);
              this.isRequesting = false;
            });
        });
    });
  }
}
