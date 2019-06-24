import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  //*поменять типы
  id: number;
  email: string;
  password: string;
  age: string;
  telephone: string;
}
export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'email', 'password', 'age', 'telephone', 'action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(public dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    fetch('http://localhost:3000/users').then(item=> item.json()).then(elem => {
      //Заполняем массив полученными данными
      return elem.map(item => ELEMENT_DATA.push(item))
      
    }).then(() => this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA))
      .then(() => this.dataSource.paginator = this.paginator)
  }

  openDialog(user) {
    const dialogRef = this.dialog.open(DialogDataExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
      if(result) this.deleteUser(user);
    });
  }

  deleteUser(user){
    console.log(user.id);
    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    })
  }
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
}