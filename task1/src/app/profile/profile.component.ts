import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HeaderObserveService } from '../header-observe.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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


  constructor(private service: AuthService, private infoService: HeaderObserveService) {
    this.currentUserId = localStorage.currentUserId;
    this.currentUser = localStorage.currentUser;
    this.currentUserPassword = localStorage.currentUserPassword;
    this.currentUserRights = localStorage.userRights;
    this.currentUserAge = localStorage.currentUserAge;
    this.currentUserTel = localStorage.currentUserTelephone;
    this.currentUserImg = localStorage.currentUserImg;
  }
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.currentUserImg = reader.result;
    }
  }
  editModeOn(){
      return (this.editMode === true) ? this.editMode = false : this.editMode = true;
  }
  onUpload(){
    console.log(this.angForm.value.telephone);
    
    localStorage.currentUserImg = this.currentUserImg;
    this.currentUserTel = this.angForm.value.telephone;
    this.currentUserAge = this.angForm.value.age;
    fetch(`http://localhost:3000/users/${this.currentUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: this.currentUser, password: this.currentUserPassword, telephone: this.currentUserTel, age: this.currentUserAge, img: this.currentUserImg})
    })
      .then(response => response.json())
      .then(response => console.log(response))
    this.infoService.anounceHeaderImg(this.currentUserImg); //оповещаем о том что картинка изменилась
    return this.editMode = false;
  }

  angForm: FormGroup;

  ngOnInit() {
    this.angForm = new FormGroup({
      // email: new FormControl(this.email, [Validators.required, Validators.email]),
      // password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.currentUserAge, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.currentUserTel, [Validators.required])
    });
  }

}
