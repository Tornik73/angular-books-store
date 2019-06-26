import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderObserveService } from './services/header-observe.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ //для работы с LocalStorage
  currentUser: string;
  userRights: string;
  currentUserImg: string;
  constructor(private service: AuthService, private headServ: HeaderObserveService) {
    
  }

  hiUser(){
    if (localStorage.currentUser != null) {
      if (localStorage.currentUser === "admin@gmail.com") {
        this.userRights = "admin";
      } else {
        this.userRights = "user";
      }
      this.currentUser = localStorage.currentUser;
      this.currentUserImg = localStorage.currentUserImg;
      localStorage.userRights = this.userRights;
      this.service.AuthStatus = false;
    }
  }

  ngOnInit() {
    this.headServ.anounceHeader$.subscribe(
      (user:any) =>{
        this.currentUserImg = user;
      }
    )
    this.hiUser();
    
  }
  logOut(){
    localStorage.clear()
    return this.service.AuthStatus = true;
  }
}