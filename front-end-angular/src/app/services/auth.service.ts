import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AuthStatus = true;
  authUserRights: boolean;
  constructor() { }

  authUser(decodedToken, token) {
    localStorage.currentUserId = decodedToken.id;
    localStorage.currentUserToken = token.token;
    localStorage.currentUser = decodedToken.email;
    localStorage.currentUserPassword = decodedToken.password;
    localStorage.currentUserAge = decodedToken.age;
    localStorage.currentUserTelephone = decodedToken.telephone;
    localStorage.currentUserImg = token.img;
    this.authUserRights = decodedToken.isAdmin; // response.data.isAdmin
    localStorage.currentUserRights = decodedToken.isAdmin;
    return this.AuthStatus = false;
  }
}
