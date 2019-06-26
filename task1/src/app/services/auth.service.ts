import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus: boolean = true;
  constructor() { }

  authUser() {
    return this.AuthStatus = false;
  }
}
