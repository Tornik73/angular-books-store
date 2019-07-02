import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookCartElement } from '../models/book';


export interface DialogData{
  id: number;
  title: string;
  author: string;
  price: number;
}

let currentCartData: BookCartElement[] = [];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderSum: number = 0;
  displayedColumns: string[] = ['id', 'title', 'author', 'img', 'price', 'order amount', 'action'];
  dataSource = new MatTableDataSource<BookCartElement>(currentCartData);
  selection = new SelectionModel<BookCartElement>(true, []);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    
    currentCartData = JSON.parse(localStorage.order);
    this.dataSource = new MatTableDataSource<BookCartElement>(currentCartData);
    this.countSumOfOrder(currentCartData);
  }

  countSumOfOrder(order: BookCartElement[]){
    this.orderSum = 0;
    
    for(let i in order)
      this.orderSum += order[i].price * order[i].countCartItem;
  }

  minusItem(book: BookCartElement){
    let index: number = currentCartData.indexOf(book);

    if (currentCartData[index].countCartItem > 1){
      currentCartData[index].countCartItem--;
      this.updateDataView();
    }
    else{
      this.deleteItemCart(book);
      localStorage.setItem("order", JSON.stringify(currentCartData)); 
    }
  }

  plusItem(book: BookCartElement){
    let index: number = currentCartData.indexOf(book);
    currentCartData[index].countCartItem++;
    this.updateDataView();
  }

  deleteItemCart(book: BookCartElement){
    let index: number = currentCartData.indexOf(book);
    currentCartData.splice(index, 1);
    this.updateDataView();
  }

  updateDataView(){
    this.dataSource = new MatTableDataSource<BookCartElement>(currentCartData);
    localStorage.setItem("order", JSON.stringify(currentCartData));
    this.countSumOfOrder(currentCartData);
  }
}