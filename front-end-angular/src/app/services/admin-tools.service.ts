import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminToolsService {
  dataResponse: any;
  constructor() { }

  upload(data) {
    this.dataResponse = data;
  }
}
