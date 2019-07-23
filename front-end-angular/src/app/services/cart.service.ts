import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookCartElement } from '../models/book';
import { HeaderObserveService } from './header-observe.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService,
              private headerServ: HeaderObserveService) { }

  addToCart(book: BookCartElement): void {
    let bookArray: BookCartElement[] = JSON.parse(localStorage.getItem('order'));

    /*
      Converts the array to unique values
      and adds a new field with the number of items in the basket
    */
    function countCartItems(items: BookCartElement[]) {
      let searchBookFlag = false;
      // tslint:disable-next-line:prefer-const
      for (let i in items) {
        if (items[i].id === book.id) {
          if (items[i].countCartItem) {
            items[i].countCartItem++;
          } else {
            items[i].countCartItem = 1;
          }
          searchBookFlag = true; // Book found, no need to write to array
        }
      }
      if (!searchBookFlag) {  // Book not found, write to array

        items.push(book);
        items[items.length - 1].countCartItem = 1;
      }
      return items;
    }
    bookArray = countCartItems(bookArray);
    this.countSumOfOrder(bookArray);
    localStorage.setItem('order', JSON.stringify(bookArray));

    this.toastrService.success('you added item to your cart', 'Success');
  }

  countSumOfOrder(order: BookCartElement[]): number {
    let orderSum = 0;


    // tslint:disable-next-line:forin
    for (const i in order) {
      orderSum += order[i].price * order[i].countCartItem;
    }
    this.headerServ.anounceCartSum(orderSum);
    localStorage.currentCartSum = orderSum;
    return orderSum;
  }
}
