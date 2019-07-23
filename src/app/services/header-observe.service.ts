import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface book {
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
  private sendSum = new Subject<number>();
  private sendAdmin = new Subject<boolean>();
  anounceHeader$ = this.anounceHeader;

  observeDetailsBook = this.sendBook.asObservable();
  observeAddBook = this.addBook.asObservable();
  observeSendSum = this.sendSum.asObservable();
  observeSendAdmin = this.sendAdmin.asObservable();

  constructor() { }

  sendCurrentBook(bookDetails: book){
    this.sendBook.next(bookDetails);
  }

  anounceHeaderImg(user: string){
    this.anounceHeader.next(user);
  }

  addCurentBookToCart(bookToCart: book) {
    this.addBook.next(bookToCart);
  }

  anounceCartSum(sumOfOrder: number){
    this.sendSum.next(sumOfOrder);
  }

  anounceHeaderAdmin(isAdmin: boolean){
    this.sendAdmin.next(isAdmin);
  }
}
