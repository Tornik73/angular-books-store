import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../services/requests.service';
import { Router } from '@angular/router';
import { HeaderObserveService } from '../services/header-observe.service';


export interface book {
  //*поменять типы
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  goodsData: book;
  CurrentUserOrder = [];
  constructor(
    private requestServ: RequestsService,
    private _router: Router,
    private observeDetails: HeaderObserveService
    ) { }

  ngOnInit() {
    this.requestServ.httpClientGet("books")
      .subscribe((data:book) => {
        this.goodsData = data; 
      });   
  }

  bookDetails(book) {
    this._router.navigate(["details/books", book.id]);
    this.observeDetails.sendCurrentBook(book);
  }

  addToCart(book){
    let bookArray = JSON.parse(localStorage.getItem("order"));
    bookArray.push(book);
    localStorage.setItem("order", JSON.stringify(bookArray));
  }
}