import {autoinject} from 'aurelia-framework';
import {Store} from './store';
import {Book} from './book';

@autoinject
export class App {
  message = 'Hello World!';
  public books: Book[];

  constructor(private store: Store) { }

  bind() {
    return this.store.getBooks().then(books => {
      this.books = books;
      console.log(books);
    });
  }
}
