import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



export interface DialogData {
  id: number;
  email: string;
  password: string;
  age: number;
  telephone: string;
  img: any;
}

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.css']
})
export class EditUserDataComponent implements OnInit {
  angForm: FormGroup;
  id:number;
  email: string;
  password: string;
  age: number;
  telephone: string;
  img: any;
  message: string;
  imagePath;

  constructor(
    public dialogRef: MatDialogRef<EditUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
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
      this.img = reader.result;
    }
  }


  onSubmit(){
      //Заполняем новыми данными с формы
      for(let i in this.data)
        if(this.angForm.value[i] != null)
          this.data[i] = this.angForm.value[i];
      

    fetch(`http://localhost:3000/users/${this.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        email: this.data.email, 
        password: this.data.password, 
        telephone: this.data.telephone, 
        age: this.data.age, 
        img: this.img 
      })
    })
      .then(response => response.json())
  }
  ngOnInit() {
    this.img = this.data.img;

    this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }
}

