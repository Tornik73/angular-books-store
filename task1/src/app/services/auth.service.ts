import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus: boolean = true;
  authUserRights: boolean = false;
  constructor() { }

  authUser(response) {
    localStorage.currentUserId = response.data.id;
    localStorage.currentUser = response.data.email;
    localStorage.currentUserPassword = response.data.password;
    localStorage.currentUserAge = response.data.age;
    localStorage.currentUserTelephone = response.data.telephone;
    localStorage.currentUserImg = response.data.img;
    this.authUserRights = response.data.isAdmin;
    
    return this.AuthStatus = false;
  }
}
