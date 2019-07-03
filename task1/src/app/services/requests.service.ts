import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  serverURL: string = environment.serverURL;

  constructor(private http: HttpClient) { }

  httpClientGet(item: string){
    return this.http.get(this.serverURL + item);
  }

  httpClientPost(postIn: string, body = null){
    return this.http.post(this.serverURL + postIn, body);
  }

  httpClientDelete(deleteIn: string, itemId: number){
    return this.http.delete(this.serverURL + deleteIn + '/' + itemId);
  }

  httpClientPut(putIn: string, data){
    return this.http.put(this.serverURL + putIn + '/' + data.id, data);
  }

}
