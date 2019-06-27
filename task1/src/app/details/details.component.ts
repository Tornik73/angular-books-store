import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  book: book;
  id : number;
  constructor(private requestServ: RequestsService, private _router: Router, 
    private observeDetails: HeaderObserveService, private activate : ActivatedRoute,) { }

  ngOnInit() {
    this.activate.params.subscribe(data => {
      this.id = data['id'];
      
      this.requestServ.httpClientGet(`books/${this.id}`).subscribe((data :book) => {
        this.book = data;
      })
    })
  }

}
