import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: string;
  currentUserRights: string;
  currentUserAge: string;
  currentUserTel: string;
  currentUserImg: string;
  selectedFile = null;

  onFileSelected(event){
      this.selectedFile = event.target.files[0];
      
  }
  onUpload(){
    console.log("upload");
    
  }

  constructor(private service : AuthService) { 

    this.currentUser = localStorage.currentUser;
    this.currentUserRights = localStorage.userRights;
    this.currentUserAge = localStorage.currentUserAge;
    this.currentUserTel = localStorage.currentUserTelephone;
    this.currentUserImg = localStorage.currentUserImg;
  }

  ngOnInit() {
  }

}
