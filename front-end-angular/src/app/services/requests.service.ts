import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  serverURL: string = environment.serverURL;

  constructor(private http: HttpClient) { }

  // User requests

  httpUsersAuth(body) {
    return this.http.post<any>(this.serverURL + 'authenticate', body);
  }

  httpUserGet(id: number) {
    return this.http.get(this.serverURL + 'users/' + id);
  }

  httpUsersGet() {
    return this.http.get(this.serverURL + 'users/');
  }

  httpUsersPost(body) {
    return this.http.post(this.serverURL + 'register', body);
  }

  httpUserPut(data) {
    return this.http.put(this.serverURL + 'users/' + data.id, data);
  }

  httpUsersDelete(id: number) {
    return this.http.delete(this.serverURL + 'users/' + id);
  }

  // Books requests

  httpBooksGet(id: number = null) {
    if (id === null) { return this.http.get(this.serverURL + 'books'); }
    return this.http.get(this.serverURL + 'books/' + id);
  }
  httpBooksPost(body) {
    return this.http.post(this.serverURL + 'books/', body);
  }

  httpBooksDelete(id: number) {
    return this.http.delete(this.serverURL + 'books/' + id);
  }

  httpBooksPut(body) {
    return this.http.put(this.serverURL + 'books/' + body.id, body);
  }
}
