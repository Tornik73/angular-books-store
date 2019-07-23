import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
import { RequestsService } from '../services/requests.service';

import * as jwt from 'jwt-decode';
import { HeaderObserveService } from '../services/header-observe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'Books||Lib';
  authForm: FormGroup;
  email: string;
  password: string;
  incorectPassword = false;
  localURL: string;
  loadingDataSpinner = false;

  constructor(private router: Router,
              private service: AuthService,
              private navHi: AppComponent,
              private requestServ: RequestsService,
              private headerServ: HeaderObserveService) {
  }

  onSubmit(): void {
    this.loadingDataSpinner = true;
    this.requestServ.httpUsersAuth(this.authForm.value)
      .subscribe(response => {
        setTimeout( () => {
          this.loadingDataSpinner = false;
          const userData = jwt(response.token); // можно перенести в сервис
          this.service.authUser(userData, response); // меняем AuthStatus теперь пользователь авторизирован
          this.navHi.hiUser();
          localStorage.setItem('order', JSON.stringify([]));
          this.headerServ.anounceHeaderAdmin(userData.isAdmin);
          this.router.navigate(['/']);
        }, 5000);
      });
  }
  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }
}
