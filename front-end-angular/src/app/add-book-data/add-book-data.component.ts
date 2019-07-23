import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminToolsService } from '../services/admin-tools.service';
import { RequestsService } from '../services/requests.service';
import { ExtensionsService } from '../services/extensions.service';

export interface DialogData {
  id: number;
  title: string;
}

@Component({
  selector: 'app-add-book-data',
  templateUrl: './add-book-data.component.html',
  styleUrls: ['./add-book-data.component.css']
})
export class AddBookDataComponent implements OnInit {
  angForm: FormGroup;
  public title: string;
  public author: string;
  public price: number;
  public description: string;
  img: string = this.extensionServ.defaultBookImg;

  constructor(public dialogRef: MatDialogRef<AddBookDataComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private toastrService: ToastrService,
              private adminService: AdminToolsService,
              private requestServ: RequestsService,
              private extensionServ: ExtensionsService) { }

  ngOnInit() {
    this.angForm = new FormGroup({
      title: new FormControl(this.title, [Validators.required]),
      author: new FormControl(this.author, [Validators.required]),
      price: new FormControl(this.price, [Validators.required]),
      description: new FormControl(this.description, [Validators.required])
    });
  }

  successRegistration(): void {
    this.toastrService.success('added new book', 'Success');
  }

  onSubmit(): void  {
    this.angForm.value.img = this.img;
    this.requestServ.httpBooksPost(this.angForm.value)
      .subscribe(data => {
        console.log(data);
        this.successRegistration();
        this.adminService.upload(data);
      });
  }
}
