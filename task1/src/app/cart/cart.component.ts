import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderObserveService, book } from '../services/header-observe.service';
import { MatTableDataSource } from '@angular/material';
import { BooksElements } from '../books-table/books-table.component';
import { SelectionModel } from '@angular/cdk/collections';


export interface BooksElement {
  //*поменять типы
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}

const ELEMENT_DATA: BooksElement[] = [];
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  book: book;
  id: number;
  displayedColumns: string[] = ['id', 'title', 'author', 'image', 'price'];
  dataSource = new MatTableDataSource<BooksElements>(ELEMENT_DATA);
  selection = new SelectionModel<BooksElements>(true, []);
  constructor(private requestServ: RequestsService, private _router: Router,
    private observeAddBook: HeaderObserveService, private activate: ActivatedRoute,) { }


  ngOnInit() {
    // Есть баг при переходе с MainPage
    // Чтобы не добавлялись одни и те же юзеры 

    if (this.dataSource.filteredData.length === 0) {
      this.requestServ.httpClientGet("books")
        .subscribe(data => {
          for (let key in data) {
            ELEMENT_DATA.push(data[key]);
            this.dataSource = new MatTableDataSource<BooksElements>(ELEMENT_DATA)
          }
        });
    }
  }
}