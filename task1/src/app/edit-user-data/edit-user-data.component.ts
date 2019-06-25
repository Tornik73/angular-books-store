import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminToolsService } from '../admin-tools.service';
import { DialogDataAdd } from '../add-user-data/add-user-data.component';


export interface DialogData {
  id: number;
  email: string;
}

@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.css']
})
export class EditUserDataComponent implements OnInit {
  angForm: FormGroup;
  public email: string;
  public password: string;
  public age: number;
  public telephone: string;
  constructor(
    public dialogRef: MatDialogRef<EditUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    fetch('http://localhost:3000/users', {
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.angForm.value)
    })
      .then(data => {
        console.log(data);
      })

    this.angForm = new FormGroup({
      email: new FormControl(this.email, [Validators.required, Validators.email]),
      password: new FormControl(this.password, [Validators.required, Validators.minLength(8)]),
      age: new FormControl(this.age, [Validators.required, Validators.min(18)]),
      telephone: new FormControl(this.telephone, [Validators.required])
    });
  }
}

