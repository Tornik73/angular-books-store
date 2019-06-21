import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ //для работы с LocalStorage
  currentUser: string;
  userRights: string;
  currentUserImg: string;
  constructor(private service : AuthService) {
    
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
    this.hiUser();
    
  }
  logOut(){
    localStorage.clear()
    return this.service.AuthStatus = true;
  }
}