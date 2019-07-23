import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { HeaderObserveService } from './services/header-observe.service';
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sumOfOrder: number = localStorage.currentCartSum;
  currentUser: string;
  userRights: boolean;
  currentUserImg: string;

  constructor(private service: AuthService,
              public dialog: MatDialog,
              private headServ: HeaderObserveService) {}

  hiUser() {
    if (localStorage.currentUser != null) {
      this.currentUser = localStorage.currentUser;
      this.currentUserImg = localStorage.currentUserImg;
      this.service.AuthStatus = false;
    }
  }
  checkAdmin(isAdmin) {
    let isAdm: boolean;
    if (typeof isAdmin === 'string') {
      isAdm = !!+isAdmin;
    } else {
      isAdm = !+isAdmin;
    }
    this.userRights = isAdm;
    this.headServ.observeSendAdmin.subscribe(isAdminData => {
      this.userRights = isAdminData;
    });

  }
  ngOnInit() {
    this.checkAdmin(localStorage.currentUserRights);

    this.headServ.anounceHeader$.subscribe(
      (user: any) => {
        this.currentUserImg = user;
      }
    );
    this.hiUser();
    this.headServ.observeSendSum.subscribe(valueSum => {
      this.sumOfOrder = valueSum;
    });
  }

  openCart(book) {
    const dialogRef = this.dialog.open(CartComponent);
  }

  logOut() {
    localStorage.clear();
    this.service.authUserRights = false;
    return this.service.AuthStatus = true;
  }
}
