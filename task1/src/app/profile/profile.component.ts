import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderObserveService } from '../services/header-observe.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ExtensionsService } from '../services/extensions.service';
import { RequestsService } from '../services/requests.service';
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
  currentUserAge: any;
  currentUserTel: string;
  currentUserImg: any;
  selectedFile = null;
  imagePath;
  message: string;
  editMode: boolean = false;


  constructor(private service: AuthService, 
    private infoService: HeaderObserveService,
    private previewPhotoService: ExtensionsService,
    private requestServ: RequestsService) {
    this.currentUserId = localStorage.currentUserId;
    this.currentUser = localStorage.currentUser;
    this.currentUserPassword = localStorage.currentUserPassword;
    this.currentUserRights = localStorage.userRights;
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

  //управление модом редактирования
  editModeOn(){ 
    this.currentUserImg = localStorage.currentUserImg; // сброс изменения картинки
    return (this.editMode === true) ? this.editMode = false : this.editMode = true; // ИСПРАВИТЬ
  }
  onUpload(){ 
    localStorage.currentUserImg = this.currentUserImg;

    this.currentUserTel = this.angForm.value.telephone;
    this.currentUserAge = this.angForm.value.age;
    let userJSON: object = {id: this.currentUserId, email: this.currentUser, password: this.currentUserPassword,
    telephone: this.currentUserTel, age: this.currentUserAge};
    
    this.requestServ.httpPUT(userJSON, this.currentUserImg)
    this.infoService.anounceHeaderImg(this.currentUserImg); //оповещаем о том что картинка изменилась
    
    return this.editMode = false;
  }

  angForm: FormGroup;

  ngOnInit() {
    this.angForm = new FormGroup({
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }

}
