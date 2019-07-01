import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { of } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter
} from "rxjs/operators";
import { fromEvent } from 'rxjs';
import { HttpClient, HttpParams } from "@angular/common/http";
import { RequestsService } from '../services/requests.service';

const APIKEY = "58684XXX";

const PARAMS = new HttpParams({
  fromObject: {
    action: "opensearch",
    format: "json",
    origin: "*"
  }
});

export interface book {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('movieSearchInput', {static: true}) movieSearchInput: ElementRef;
  apiResponse: any;
  isSearching: boolean;
  book: book;
  constructor(
    private httpClient: HttpClient,
    private requestServ: RequestsService,
  ) {
    this.isSearching = false;
    this.apiResponse = [];
  }

  ngOnInit() {
    fromEvent(this.movieSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      })
      // if character length greater then 2
      , filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current   
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: string) => {
      console.log(this.requestServ.httpClientGet('books').subscribe((data: book) => {
        this.book = data;
        console.log(text);
        
      }));
       
    });
  }

  searchGetCall(term: string) {
    if (term === '') {
      return of([]);
    }
    return this.httpClient.get('http://www.omdbapi.com/?s=' + term + '&apikey=' + APIKEY, { params: PARAMS.set('search', term) });
  }

}
