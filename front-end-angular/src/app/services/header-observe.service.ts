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

  sendCurrentBook(book: book){
    this.sendBook.next(book);
  }
  
  anounceHeaderImg(user:string){
    this.anounceHeader.next(user);
  }

  addCurentBookToCart(book: book){
    this.addBook.next(book);
  }

  anounceCartSum(sum: number){
    this.sendSum.next(sum);
  }

  anounceHeaderAdmin(isAdmin: boolean){
    this.sendAdmin.next(isAdmin);
  }
}
