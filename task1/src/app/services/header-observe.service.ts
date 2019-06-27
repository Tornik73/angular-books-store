import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export interface book {
  //*поменять типы
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderObserveService {
  private anounceHeader = new Subject<string>();
  private sendBook = new Subject<book>();
  private addBook = new Subject<book>();
  anounceHeader$ = this.anounceHeader;

  observeDetailsBook = this.sendBook.asObservable();
  observeAddBook = this.addBook.asObservable();
  constructor() { }

  sendCurrentBook(book: book){
    this.sendBook.next(book);
  }
  anounceHeaderImg(user:string){
    this.anounceHeader.next(user);
  }
  addCurentBookToCart(book: book){
    this.addBook.next(book);
  }
}
