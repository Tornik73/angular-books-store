import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IBookCartElement } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private toastrService: ToastrService) { }

  addToCart(book: IBookCartElement) {  
    let bookArray: IBookCartElement[] = JSON.parse(localStorage.getItem("order"));

    /*
      Функция преобразовывает массив в уникальные значения
      и добавляет новое поле с количеством элементов в корзине
    */
    function countCartItems(items: IBookCartElement[]){
      let searchBookFlag: boolean = false;
      for (let i in items)
        if (items[i].id === book.id) {
          if (items[i].countCartItem)
            items[i].countCartItem++;
          else
            items[i].countCartItem = 1;
          searchBookFlag = true; // Книга найдена, в массив записывать не надо
        }
      if (!searchBookFlag) {  // Книга не найдена, записываем в массив
        items.push(book);
        items[items.length - 1].countCartItem = 1;
      }
      return items;
    }

    bookArray = countCartItems(bookArray);
    localStorage.setItem("order", JSON.stringify(bookArray)); // Отправляем данные в локальное хранилище
    this.toastrService.success('you added item to your cart', 'Success');
  }
}
