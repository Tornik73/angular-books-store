import { Component, OnInit, Inject } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderObserveService, book } from '../services/header-observe.service';
import { MatTableDataSource } from '@angular/material';
import { BooksElements } from '../books-table/books-table.component';
import { SelectionModel } from '@angular/cdk/collections';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface BooksElement {
  //*поменять типы
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}

export interface DialogData{
  id: number;
  title: string;
  author: string;
  price: number;
}

let CartData: BooksElement[] = [];
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  currentCartData;
  orderSum: number = 0;
  book: book;
  id: number;
  displayedColumns: string[] = ['id', 'title', 'author', 'img', 'price', 'order amount', 'action'];
  dataSource = new MatTableDataSource<BooksElements>(CartData);
  selection = new SelectionModel<BooksElements>(true, []);
  constructor(private requestServ: RequestsService, private _router: Router,
    private observeAddBook: HeaderObserveService, 
    private activate: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  countGoods(goods) {
    let sortedGoods = [];
    for (let i in goods)
      goods[i].countCartItem = 0;

    for (let i in goods) {
      for (let j in goods) {
        //возможен БАГ с сравнением
        if (goods[i].id === goods[j].id) {
          goods[i].countCartItem++;
        }
      }
    }

    sortedGoods = Array.from(new Set(goods.map(a => a.id)))
      .map(id => {
        return goods.find(a => a.id === id)
      })

    return sortedGoods;
  }
  ngOnInit() {
    let CurrentOrderJSON = this.countGoods(JSON.parse(localStorage.order));
    this.currentCartData = CurrentOrderJSON;
    this.dataSource = new MatTableDataSource<BooksElements>(CurrentOrderJSON);
    this.countSumOfOrder(this.currentCartData);
  }

  countSumOfOrder(order){
    this.orderSum = 0;
    for(let i in order){
      this.orderSum += parseInt(order[i].price) * order[i].countCartItem;
    }
    
    // this.orderSum = order.
  }

  deleteItemCart(book){
    let index = this.currentCartData.indexOf(book)
    this.currentCartData.splice(index, 1);
    this.dataSource = new MatTableDataSource<BooksElements>(this.currentCartData);
    localStorage.setItem("order", JSON.stringify(this.currentCartData));
    this.countSumOfOrder(this.currentCartData);
  }
}