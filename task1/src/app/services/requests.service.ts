import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  serverURL: string = environment.serverURL;

  constructor(private http: HttpClient) { }

  httpClientGet(data){
    console.log("httpClientGet: ", data);
    return this.http.get(this.serverURL + data);
  }
  // httpGET(data){
  //   // console.log("GET", data);
  //   // console.log("GET: ", this.http.get(this.serverURL+data));
  //     return fetch(`${this.serverURL}` + `${data}`, {
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: null
  //     })
  // }

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


  // DELETE USER сильно привязан к юзерам
  httpDELETE(userID){
    console.log("DELETE", userID);
    
    return fetch(`${this.serverURL}` + "users/" + `${userID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  //PUT USER сильно привязан к юзерам
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
  httpPutBook(book, img) {
    console.log("PUT", book);

    return fetch(`${this.serverURL}` + "books/" + `${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        img: img
      })
    })
  }
  // DELETE USER сильно привязан к юзерам
  httpDeleteBook(bookID) {
    console.log("DELETE", bookID);

    return fetch(`${this.serverURL}` + "books/" + `${bookID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}
