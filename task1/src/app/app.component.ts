import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderObserveService } from './services/header-observe.service';
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ //для работы с LocalStorage

  currentUser: string;
  userRights: string; //переделать
  currentUserImg: string;
  constructor(private service: AuthService, public dialog: MatDialog, private headServ: HeaderObserveService) {
    
  }

  hiUser(){
    if (localStorage.currentUser != null) {
      if (localStorage.currentUser === "admin@gmail.com") {
        this.userRights = "admin";
        this.service.authUserRights = "admin";
      } else {
        this.userRights = "user";
        this.service.authUserRights = "user";
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

  openCart(book){
    const dialogRef = this.dialog.open(CartComponent);
  }

  logOut(){
    localStorage.clear()
    this.service.authUserRights = "";
    return this.service.AuthStatus = true;
  }
}