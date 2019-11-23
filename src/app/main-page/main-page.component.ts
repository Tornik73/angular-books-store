import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router } from '@angular/router';
import { HeaderObserveService } from '../services/header-observe.service';
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Book } from '../models/book';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  @ViewChild('bookSearchInput', { static: true }) bookSearchInput: ElementRef;
  isSearching: boolean;
  flagSearched = true;
  goodsData: Book[] = [];

  constructor(
    private requestServ: RequestsService,
    private router: Router,
    private observeDetails: HeaderObserveService,
    private service: AuthService,
    private cartService: CartService
  ) { }

  // Выводит товары все товары
  clearSearch() {
    this.requestServ.httpBooksGet()
      .subscribe((response: any) => {
        debugger
        this.goodsData = [];
        response.data.forEach(item => {
          this.goodsData.push(item);
        });
        this.isSearching = false;
      });
  }

  ngOnInit() {
    this.isSearching = true;

    this.clearSearch();

    // Search books
    fromEvent(this.bookSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      // , filter(res => res.length > 2)
      , debounceTime(1000)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      this.goodsData = [];
      this.requestServ.httpBooksGet().subscribe((data: any) => {
        this.isSearching = true;
        if (text.length === 0) {
          this.clearSearch();
        } else {
          // tslint:disable-next-line:forin
          for (let i in data.data) {

            // Search any register
            let correctDataTitle = data.data[i].title.toString().toLowerCase();
            let correctDataText = text.toLowerCase();
            // Searching by book title
            if (correctDataTitle.indexOf(correctDataText) >= 0) {
              this.goodsData.push(data.data[i]);
              this.isSearching = false;
              this.flagSearched = true;
              continue;
            }
            // Searching by book author
            // if (correctDataAuthor.indexOf(correctDataText) >= 0) {
            //   this.goodsData.push(data[i]);
            //   this.isSearching = false;
            //   this.flagSearched = true;
            // }
          }
          this.flagSearched = false;
        }
      });
    });
  }

  bookDetails(book) {
    this.router.navigate(['details/books', book.id]);
    this.observeDetails.sendCurrentBook(book);
  }
}
