import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {


  serverURL: string = "http://localhost:3000/";
  constructor() { }


  httpGET(data){
    console.log("GET", data);
    
      return fetch(`${this.serverURL}` + `${data}`, {
        headers: {
          "Content-Type": "application/json"
        },
        body: null
      })
  }

  httpPOST(body: null, data){
    console.log("POST", body);
    return fetch(`${this.serverURL}` +`${data}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    
  }


  //!!!! DELETE USER
  httpDELETE(userID){
    console.log("DELETE", userID);
    
    return fetch(`${this.serverURL}` + "users/" + `${userID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  //PUT USER
  httpPUT(user, img){
    console.log("PUT", user);

    return fetch(`${this.serverURL}` + "users/" + `${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
        telephone: user.telephone,
        age: user.age,
        img: img
      })
    })
  }
}
