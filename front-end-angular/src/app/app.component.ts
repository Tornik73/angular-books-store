import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderObserveService } from './services/header-observe.service';
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sumOfOrder: number = localStorage.currentCartSum;
  currentUser: string;
  userRights: string; 
  currentUserImg: string;

  constructor(private service: AuthService, 
    public dialog: MatDialog, 
    private headServ: HeaderObserveService,
    private cartServ: CartService) {}

  hiUser(){
    if (localStorage.currentUser != null) {
      // this.userRights = this.service.authUserRights;
      
      // if (localStorage.currentUser === "admin@gmail.com") {
      //   this.userRights = "admin";
      //   this.service.authUserRights = "admin";
      // } else {
      //   this.userRights = "user";
      //   this.service.authUserRights = "user";
      // }

      this.currentUser = localStorage.currentUser;
      this.currentUserImg = localStorage.currentUserImg;
      // localStorage.userRights = this.userRights;
      this.service.AuthStatus = false;
    }
  }

  ngOnInit() {


    ///////////////////////////////
    if (localStorage.currentUserRights === "true") this.userRights = "admin";
    else this.userRights = "user";

    this.headServ.observeSendAdmin.subscribe(isAdmin =>{
      localStorage.currentUserRights = isAdmin;
      if (localStorage.currentUserRights === "true") this.userRights = "admin";
      else this.userRights = "user";
    })
    ///////////////////////////////

    console.log(this.userRights);
    this.headServ.anounceHeader$.subscribe(
      (user:any) =>{
        this.currentUserImg = user;
      }
    )
    this.hiUser();
    this.headServ.observeSendSum.subscribe(valueSum=> {
      this.sumOfOrder = valueSum;
    })
  }

  openCart(book){
    const dialogRef = this.dialog.open(CartComponent);
  }

  logOut(){
    localStorage.clear()
    this.service.authUserRights = false;
    return this.service.AuthStatus = true;
  }
}