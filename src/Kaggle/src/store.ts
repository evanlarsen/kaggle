import {HttpClient} from 'aurelia-fetch-client';
import {Book} from './book';

export class Store {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient();
    this.client.configure(config => {
      config
        .withBaseUrl('api/')
        .withDefaults({
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch'
          }
        })
        .withInterceptor({
          request: (request) => {
            console.log(`Requesting ${request.method} ${request.url}`);
            return request;
          },
          response: (response) => {
            console.log(`Received ${response.status} ${response.url}`);
            return response;
          }
        })
    });
  }

  public getBooks(): Promise<Book[]> {
    return new Promise((resolve, reject) => {
      this.client.fetch('store')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          resolve(convertToBooks(data));
        });
    });
  }  
}

function convertToBooks(data: any): Book[] {
  return data.map(book => new Book(book.Id, book.Name, book.Price));
}