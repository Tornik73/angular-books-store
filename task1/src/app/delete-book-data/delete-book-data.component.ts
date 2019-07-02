import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  id: number;
  title: string;
}
@Component({
  selector: 'app-delete-book-data',
  templateUrl: './delete-book-data.component.html',
  styleUrls: ['./delete-book-data.component.css']
})
export class DeleteBookDataComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteBookDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
  ngOnInit() {
  }

}
