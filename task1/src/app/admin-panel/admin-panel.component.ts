import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  //*поменять типы
  id: number;
  email: string;
  password: string;
  age: string;
  telephone: string;
}

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  
  displayedColumns: string[] = ['id', 'email', 'password', 'age', 'telephone'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  returnData: object[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    fetch('http://localhost:3000/users').then(item=> item.json()).then(elem => {
      //Заполняем массив полученными данными
      return elem.map(item => ELEMENT_DATA.push(item))
      
    }).then(() => this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA))
    this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}

const ELEMENT_DATA: PeriodicElement[] = [];
