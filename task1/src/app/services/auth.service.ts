import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus: boolean = true;
  authUserRights: string;
  constructor() { }

  authUser() {
    return this.AuthStatus = false;
  }
}
