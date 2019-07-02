import { Component, OnInit } from '@angular/core';
import { RequestsService } from '../services/requests.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderObserveService } from '../services/header-observe.service';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
export interface book {
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
  book: book = {author:'', title: '', price: 0, description: '', img:'', id: 0 };
  id : number;
  constructor(private requestServ: RequestsService, 
    private _router: Router, 
    private observeDetails: HeaderObserveService, 
    private activate : ActivatedRoute, 
    private service: AuthService,
    private cartService: CartService
    ) { }

  ngOnInit() {
    this.activate.params.subscribe(data => {
      this.id = data['id'];
      this.requestServ.httpClientGet(`books/${this.id}`).subscribe((data :book) => {
        this.book = data;
      })
    })
  }
}
