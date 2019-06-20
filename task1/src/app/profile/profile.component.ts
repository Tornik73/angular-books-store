import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: string;
  constructor(private service : AuthService) { 

    this.currentUser = localStorage.currentUser;
  }

  ngOnInit() {
  }

}
