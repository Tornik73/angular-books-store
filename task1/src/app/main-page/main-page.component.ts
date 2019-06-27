import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestsService } from '../services/requests.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  goodsData: object;

  constructor(private http: HttpClient, 
    private requestServ: RequestsService) { }

  ngOnInit() {
    // console.log(1);
    
    this.requestServ.httpClientGet("books")
      .subscribe(data => {
        this.goodsData = data; 
      });
      
  }

}
