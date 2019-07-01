import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExtensionsService } from '../services/extensions.service';
import { RequestsService } from '../services/requests.service';


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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private previewPhotoService: ExtensionsService,
    private requestServ: RequestsService ) {}
  
  preview(files) {
    this.previewPhotoService.preview(files)
      .then(result =>
        this.img = result
      );
  }

  onSubmit(){
      //Заполняем новыми данными с формы
      for(let i in this.data)
        if(this.angForm.value[i] != null)
          this.data[i] = this.angForm.value[i];
          
      //Разобраться с ИМГ
    this.requestServ.httpPUT(this.data, this.img)
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
