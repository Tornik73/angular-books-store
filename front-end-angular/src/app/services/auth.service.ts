import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus: boolean = true;
  authUserRights: boolean;
  constructor() { }

  authUser(response, token) {
    
    // localStorage.currentUserId = response.data.id;
    localStorage.currentUserToken = token;
    localStorage.currentUser = response.email;
    localStorage.currentUserPassword = response.password;
    localStorage.currentUserAge = response.age;
    localStorage.currentUserTelephone = response.telephone;
    localStorage.currentUserImg = response.img;
    
    this.authUserRights = response.isAdmin; // response.data.isAdmin
    localStorage.currentUserRights = response.isAdmin;
    console.log(response.isAdmin);
    return this.AuthStatus = false;
  }
  
}
