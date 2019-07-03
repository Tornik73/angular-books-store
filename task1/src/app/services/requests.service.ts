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

  httpClientPost(items: string, body = null){
    return this.http.post(this.serverURL + items, body);
  }

  httpClientDelete(items: string, itemId: number){
    return this.http.delete(this.serverURL + items + '/' + itemId);
  }

  httpClientPut(items: string, data){
    return this.http.put(this.serverURL + items + '/' + data.id, data);
  }

}
