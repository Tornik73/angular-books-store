import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public authForm : FormGroup;
  public email: string;
  public password: string;
  isValid : boolean = false;
  isReq : boolean = false;
  constructor() { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }
  onSubmit(){
    console.log(this.authForm.controls.password.value);
    
    if(this.authForm.status == 'VALID'){
      this.isValid = false;
      // this.isReq = false;
    }

    if(this.authForm.controls.password.value === null){
      this.isReq = true;
    }
    
    else{
      this.isValid = true;
    }
  }
}
