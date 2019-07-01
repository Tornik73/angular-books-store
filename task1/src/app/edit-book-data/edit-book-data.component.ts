import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ExtensionsService } from '../services/extensions.service';
import { RequestsService } from '../services/requests.service';



export interface DialogData {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  img: string;
}

@Component({
  selector: 'app-edit-book-data',
  templateUrl: './edit-book-data.component.html',
  styleUrls: ['./edit-book-data.component.css']
})
export class EditBookDataComponent implements OnInit {
  angForm: FormGroup;
  public title: string;
  public author: string;
  public price: number;
  public description: string;
  img: any;
  message: string;

  constructor(
    public dialogRef: MatDialogRef<EditBookDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private previewPhotoService: ExtensionsService,
    private requestServ: RequestsService) { }

  preview(files) {
    this.previewPhotoService.preview(files)
      .then(result =>
        this.img = result
      );
  }

  onSubmit() {
    //Заполняем новыми данными с формы
    for (let i in this.data)
      if (this.angForm.value[i] != null)
        this.data[i] = this.angForm.value[i];

    //Разобраться с ИМГ
    this.requestServ.httpPutBook(this.data, this.img)
      .then(response => response.json())
  }
  ngOnInit() {
    this.img = this.data.img;

    this.angForm = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      author: new FormControl(this.author, [Validators.required]),
      price: new FormControl(this.price, [Validators.required]),
      description: new FormControl(this.description, [Validators.required])
    });
  }

}