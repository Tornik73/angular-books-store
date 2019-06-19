import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title="BooksLib"
  constructor() { }
  public authForm : FormGroup;
  public email: string;
  public password: string;
  isChecked:boolean = true;

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required])
    });
  }

  onSubmit(){
    var user = null
    console.log(this.authForm.value.email);
    
    function checkUser(data, db){
     for(let i in data){
       
       if(db.email === data[i].email 
        && db.password === data[i].password)
       console.log("Hello " + data[i].email);
       
     }
    }
    fetch('http://localhost:3000/users', {
      headers:{
        "Content-Type": "application/json"
      },
      body: null
    })
    .then(response => response.json(),
      error=> error)
      .then(data => checkUser(data, this.authForm.value));
      
      // item.email === this.authForm.value.email
      // let current = user.filter(item => console.log(item));
      // let password = user.filter(item => item.password === this.authForm.value.password);
      // console.log(current);
      
    }
    
  }
