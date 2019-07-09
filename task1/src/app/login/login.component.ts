import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { RequestsService } from '../services/requests.service';

import * as JWT from 'jwt-decode';
import { HeaderObserveService } from '../services/header-observe.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "Books||Lib"
  authForm : FormGroup;
  email: string;
  password: string;
  incorectPassword: boolean = false;
  localURL: string;

  constructor(private _router : Router, 
    private service : AuthService, 
    private navHi: AppComponent,
    private requestServ: RequestsService,
    private headerServ: HeaderObserveService) {   
  }

  checkUser(data, db):boolean{
    for(let i in data){
      if(db.email === data[i].email && db.password === data[i].password){
        //можно сделать функцией
        localStorage.currentUserId = data[i].id;
        localStorage.currentUser = data[i].email;
        localStorage.currentUserPassword = data[i].password;
        localStorage.currentUserAge = data[i].age; 
        localStorage.currentUserTelephone = data[i].telephone;    
        localStorage.currentUserImg = data[i].img;
        return true;
      }
    }
    return false;
  }

  onSubmit() : void{
    this.requestServ.httpUsersAuth(this.authForm.value)
      .subscribe(response => {
        let userData = JWT(response.data);
        
        this.service.authUser(userData, response.data); // меняем AuthStatus теперь пользователь авторизирован
        this.navHi.hiUser();
        this._router.navigate(['/']);
        localStorage.setItem("order", JSON.stringify([]));
        this.headerServ.anounceHeaderAdmin(userData.isAdmin);
        // if (response.success){
        //   this.requestServ.httpUserGet(response.userID)
        //   .subscribe(response => { 
        //     this.service.authUser(response); // меняем AuthStatus теперь пользователь авторизирован
        //     this.navHi.hiUser();
        //     this._router.navigate(['/']);
        //     localStorage.setItem("order", JSON.stringify([]));
        //   })

        // }
        // else
        //   this.incorectPassword = true; 
      });
      
  }
  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }
  
}
