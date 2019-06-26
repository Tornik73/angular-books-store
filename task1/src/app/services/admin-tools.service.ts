import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminToolsService {
  dataResponse: any;
  constructor() { }

  Upload(data){
    this.dataResponse = data;
  }
  
}
