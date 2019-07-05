import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderObserveService } from '../services/header-observe.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ExtensionsService } from '../services/extensions.service';
import { RequestsService } from '../services/requests.service';
import {User} from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUserId: number;
  currentUser: string;
  currentUserPassword: string;
  currentUserRights: string;
  currentUserAge: number;
  currentUserTel: string;
  currentUserImg: any; // ?
  // message: string;
  editMode: boolean = false;
  angForm: FormGroup;
  

  isAdmin: boolean;

  constructor(private service: AuthService, 
    private infoService: HeaderObserveService,
    private previewPhotoService: ExtensionsService,
    private requestServ: RequestsService) {
    this.currentUserId = localStorage.currentUserId;
    this.currentUser = localStorage.currentUser;
    this.currentUserPassword = localStorage.currentUserPassword;
    this.currentUserAge = localStorage.currentUserAge;
    this.currentUserTel = localStorage.currentUserTelephone;
    this.currentUserImg = localStorage.currentUserImg;
  }

  preview(files) {
    this.previewPhotoService.preview(files)
      .then(result => 
        this.currentUserImg = result
      );
  }

  // Managing of edit mode
  editModeOn(){ 
    this.currentUserImg = localStorage.currentUserImg; // reset picture change
    return this.editMode = !this.editMode;
  }
  onUpload(){ 


    localStorage.currentUserImg = this.currentUserImg;
    console.log(this.service.authUserRights);
    
    this.currentUserTel = this.angForm.value.telephone;
    this.currentUserAge = this.angForm.value.age;

    let userJSON: User = {
      id: this.currentUserId, 
      email: this.currentUser, 
      password: this.currentUserPassword,
      telephone: this.currentUserTel, 
      age: this.currentUserAge, 
      img: this.currentUserImg,
      isAdmin: this.service.authUserRights
    };

    this.requestServ.httpUserPut(userJSON)
    .subscribe(data=>{
      this.infoService.anounceHeaderImg(this.currentUserImg); // Notify that the picture has changed
      return this.editMode = false;
    })
  }



  ngOnInit() {
    if (!this.service.authUserRights)
      this.currentUserRights = "admin";
    else
      this.currentUserRights = "user";
    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }

}
