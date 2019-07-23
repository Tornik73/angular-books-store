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
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUserId: number;
  currentUser: string;
  currentUserPassword: string;
  currentUserRights: string;
  currentUserAge: number;
  currentUserTel: string;
  currentUserImg: string;
  isAdmin: boolean;
  editMode = false;
  angForm: FormGroup;
  loadingDataSpinner = false;

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
    this.isAdmin = localStorage.currentUserRights;
  }

  preview(files) {
    this.previewPhotoService.preview(files)
      .then( (result: string) =>
        this.currentUserImg = result
      );
  }

  // Managing of edit mode
  editModeOn() {
    this.currentUserImg = localStorage.currentUserImg; // reset picture change
    return this.editMode = !this.editMode;
  }

  onUpload() {
    this.loadingDataSpinner = true;
    localStorage.currentUserImg = this.currentUserImg;

    this.currentUserTel = localStorage.currentUserTelephone = this.angForm.value.telephone;
    this.currentUserAge = localStorage.currentUserAge = this.angForm.value.age;

    const userJSON: User = {
      id: this.currentUserId,
      email: this.currentUser,
      password: this.currentUserPassword,
      telephone: this.currentUserTel,
      age: this.currentUserAge,
      img: this.currentUserImg,
      isAdmin: this.service.authUserRights
    };

    this.requestServ.httpUserPut(userJSON)
    .subscribe( () => {
      setTimeout(() => {
        this.loadingDataSpinner = false;
        this.infoService.anounceHeaderImg(this.currentUserImg); // Notify that the picture has changed
      }, 2000);
      return this.editMode = false;
    })
  }

  ngOnInit() {
    if (!this.service.authUserRights) {
      this.currentUserRights = 'admin';
    } else {
      this.currentUserRights = 'user';
    }
    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }

}
