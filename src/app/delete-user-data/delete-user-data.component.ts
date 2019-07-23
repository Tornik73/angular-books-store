import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  id: number;
  email: string;
}

@Component({
  selector: 'app-delete-user-data',
  templateUrl: './delete-user-data.component.html',
  styleUrls: ['./delete-user-data.component.scss']
})
export class DeleteUserDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }
}

