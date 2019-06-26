import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus: boolean = true;
  constructor() { }

  AuthUser() {
    return this.AuthStatus = false;
  }
}
