import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router } from '@angular/router';
import { HeaderObserveService } from '../services/header-observe.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { IBook } from '../models/book'
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  @ViewChild('bookSearchInput', { static: true }) bookSearchInput: ElementRef;
  isSearching: boolean;
  flagSearched: boolean = true;
  goodsData: IBook[] = [];

  constructor(
    private requestServ: RequestsService,
    private _router: Router,
    private observeDetails: HeaderObserveService,
    private service: AuthService,
    private cartService: CartService
    ) { }

  // Выводит товары все товары
  clearSearch() {
    this.requestServ.httpClientGet("books")
      .subscribe((data: IBook) => {
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

    // Поиск нужной книги
    fromEvent(this.bookSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.goodsData = [];
      console.log(this.requestServ.httpClientGet('books').subscribe((data: IBook) => {
        this.isSearching = true;
        
        if(text.length === 0)
          this.clearSearch();

        else{
            for (let i in data) {
              // Для поиска вне зависимости от регистра
              let correctDataTitle = data[i].title.toString().toLowerCase();
              let correctDataAuthor = data[i].author.toString().toLowerCase();
              let correctDataText = text.toLowerCase();
              
              // Поиск по названию книги
              if (correctDataTitle.indexOf(correctDataText) >= 0) {
                this.goodsData.push(data[i]);
                this.isSearching = false;
                this.flagSearched = true;
                continue;
              }
              
              // Поиск по автору книги
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
}