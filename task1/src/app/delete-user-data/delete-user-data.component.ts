import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminToolsService } from '../admin-tools.service';

export interface DialogData {
  id: number;
  email: string;
}

@Component({
  selector: 'app-delete-user-data',
  templateUrl: './delete-user-data.component.html',
  styleUrls: ['./delete-user-data.component.css']
})
export class DeleteUserDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
}

