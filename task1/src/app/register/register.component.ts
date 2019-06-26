import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'Books||Lib';
  public email: string;
  public password: string;
  public age: number;
  public telephone: string;
  img: string = "data:image/png;base64,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";
  angForm: FormGroup;

   constructor(private service : AuthService,
    private toastrService:ToastrService,
    private _router : Router) {}

  successRegistration(){
    this._router.navigate(['/']);
    this.toastrService.success('for registration', 'Thank you');
  }
  ngOnInit() {
     this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }
   onSubmit(){
     this.angForm.value.img = this.img;
     console.log(this.angForm.value);
     
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.angForm.value)
    })
    .then(data=>{
      this.successRegistration();
    });
  }
}
