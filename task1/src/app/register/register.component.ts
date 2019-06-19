import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  title = 'BooksLib';
  public email: string;
  public password: string;
  public age: number;
  public telephone: string;
  angForm: FormGroup;
  //  private fb: FormBuilder
   constructor() {
    // this.createForm();
  }
  //  createForm() {
  //   this.angForm = this.fb.group({
  //      email: ['', Validators.required ],
  //      password: ['', Validators.required ],
  //      age: ['', Validators.required ],
  //      telephone: ['', Validators.required ] 
  //   });
  // }
  // public authForm : FormGroup;

  // isValid : boolean = false;
  // isReq : boolean = false;
  
  ngOnInit() {
    this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }
   onSubmit(){
     
    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.angForm.value)
    }).then((a)=>a.json())
    .then((b)=> console.log(b)
    )
    fetch('http://localhost:3000/users')
    .then(a => a.json())
    .then(a => console.log)
  //   console.log(this.authForm.controls.password.value);
    
  //   if(this.authForm.status == 'VALID'){
  //     this.isValid = false;
  //     // this.isReq = false;
  //   }

  //   if(this.authForm.controls.password.value === null){
  //     this.isReq = true;
  //   }
    
  //   else{
  //     this.isValid = true;
  //   }
  }
}
