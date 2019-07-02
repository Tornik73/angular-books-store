import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) { }

  addToCart(book) {  
    let bookArray = JSON.parse(localStorage.getItem("order"));
    bookArray.push(book);
    bookArray[bookArray.length - 1].countCartItem = 1;
    localStorage.setItem("order", JSON.stringify(bookArray));
    this.toastrService.success('you added item to your cart', 'Success');

  }
}
