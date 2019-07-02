import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../services/requests.service';
import { Router } from '@angular/router';
import { HeaderObserveService } from '../services/header-observe.service';
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';


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
  @ViewChild('movieSearchInput', { static: true }) movieSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  flagSearched: boolean = true;
  // goodsData: book;
  goodsData: book[] = [];
  CurrentUserOrder = [];
  constructor(
    private requestServ: RequestsService,
    private _router: Router,
    private observeDetails: HeaderObserveService
    ) { }
  clearSearch() {
    this.requestServ.httpClientGet("books")
      .subscribe((data: book) => {
          this.goodsData = [];
          for (let i in data) {
            this.goodsData.push(data[i]);
            this.isSearching = false;
          }

      }); 
  }
  ngOnInit() {
    this.isSearching = true;
    this.clearSearch();

    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.goodsData = [];
      console.log(this.requestServ.httpClientGet('books').subscribe((data: book) => {
        this.isSearching = true;
        console.log(text.length, text);
        
        if(text.length === 0)
          this.clearSearch();
        else{
            for (let i in data) {

              let correctDataTitle = data[i].title.toString().toLowerCase();
              let correctDataAuthor = data[i].author.toString().toLowerCase();
              let correctDataText = text.toLowerCase();

              console.log(correctDataTitle);
              
              if (correctDataTitle.indexOf(correctDataText) >= 0) {
                this.goodsData.push(data[i]);
                this.isSearching = false;
                this.flagSearched = true;
                continue;
              }
              if (correctDataAuthor.indexOf(correctDataText) >= 0) {
                this.goodsData.push(data[i]);
                this.isSearching = false;
                this.flagSearched = true;
              }
            }
          this.flagSearched = false;
        }
      }));
    });

  }

  bookDetails(book) {
    this._router.navigate(["details/books", book.id]);
    this.observeDetails.sendCurrentBook(book);
  }

  addToCart(book){
    let bookArray = JSON.parse(localStorage.getItem("order"));
    bookArray.push(book);
    bookArray[bookArray.length-1].countCartItem = 1;
    localStorage.setItem("order", JSON.stringify(bookArray));

  }
}