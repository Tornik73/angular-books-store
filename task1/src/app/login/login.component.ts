import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "Books||Lib"
  authForm : FormGroup;
  email: string;
  password: string;
  incorectPassword: boolean = false;
  constructor(private _router : Router, private service : AuthService, private navHi: AppComponent) {   
  }

  checkUser(data, db):boolean{
    for(let i in data){
      if(db.email === data[i].email && db.password === data[i].password){
        //можно сделать функцией
        localStorage.currentUserId = data[i].id;
        localStorage.currentUser = data[i].email;
        localStorage.currentUserPassword = data[i].password;
        localStorage.currentUserAge = data[i].age; 
        localStorage.currentUserTelephone = data[i].telephone;    
        
        localStorage.currentUserImg = data[i].img;
        return true;
      }
    }
    return false;
  }

  onSubmit(){
    fetch('http://localhost:3000/users', {
      headers:{
        "Content-Type": "application/json"
      },
      body: null
    })
    .then(response => response.json(),
      error => error)
      .then(data => {
        if(this.checkUser(data, this.authForm.value)){
          console.log("hi " + this.authForm.value.email);
          this.service.AuthUser(); // меняем AuthStatus теперь пользователь авторизирован
          this.navHi.hiUser();
          this._router.navigate(['/']);
        }
        else{
          // console.log("I dont know you!");
          // console.log(this.incorectPassword);
          this.incorectPassword = true;
          // console.log(this.incorectPassword);
          
        }
      });
      
  }
  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }
  
}
