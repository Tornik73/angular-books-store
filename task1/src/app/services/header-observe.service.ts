import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderObserveService {
  private anounceHeader = new Subject<string>();
  anounceHeader$ = this.anounceHeader;
  constructor() { }

  anounceHeaderImg(user:string){
    this.anounceHeader.next(user);
  }

}
