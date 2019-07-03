import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminToolsService } from '../services/admin-tools.service';
import { DialogDataAdd} from '../add-user-data/add-user-data.component';
import { EditUserDataComponent } from '../edit-user-data/edit-user-data.component';
import { DeleteUserDataComponent } from '../delete-user-data/delete-user-data.component';
import { HeaderObserveService } from '../services/header-observe.service';
import { SelectionModel } from '@angular/cdk/collections';
import { RequestsService } from '../services/requests.service';
import {User} from '../models/user';

export interface DialogData {
  id: number;
  email: string;
}

const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  id : number;
  email: number;
  displayedColumns: string[] = ['select', 'id', 'email', 'password', 'age', 'telephone', 'action'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
  selection = new SelectionModel<User>(true, []);
  
  constructor(public dialog: MatDialog, 
    private adminService: AdminToolsService, 
    private infoService: HeaderObserveService,
    private requestServ: RequestsService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    // Есть баг при переходе с MainPage
    // Чтобы не добавлялись одни и те же юзеры 
    if(this.dataSource.filteredData.length === 0){
      this.requestServ.httpClientGet("users")
        .subscribe(data => {
          for (let key in data) {
            ELEMENT_DATA.push(data[key]);
            this.dataSource = new MatTableDataSource<User>(ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
          }
        });
    }
}
  addUser(){
    const dialogRef = this.dialog.open(DialogDataAdd);

    dialogRef.afterClosed().subscribe(result => {
      if (this.adminService.dataResponse){
        let data = this.dataSource.data;

        //берем последний элемент и прибавляем + 1 его айди
        this.adminService.dataResponse.id = 
            this.dataSource.filteredData[this.dataSource.filteredData.length - 1].id + 1;

        data.push(this.adminService.dataResponse);
        this.dataSource = new MatTableDataSource<User>(data);
        this.adminService.dataResponse = null;
      }
    });
    
  }

  openDialogDelete(user) {
    let index = ELEMENT_DATA.indexOf(user)
    const dialogRef = this.dialog.open(DeleteUserDataComponent, { data: { id: user.id, email: user.email }});

      dialogRef.afterClosed().subscribe( result => {
        //duplication
        if (result) {
          this.deleteUser(user)
            //багало при удалении
            .subscribe(response => {
              if (response) {
                let data = this.dataSource.data;
                data.splice(index, 1);
                this.dataSource = new MatTableDataSource<User>(data);
              }
            });
      } 
    });
  }

  openDialogEdit(user){

    //БАГ при вызове индекса второй раз прилетит -1;
    //Происходит из-за того что таблицы изменилась, а элемента_дата константа потому и не находит.

    const dialogRef = this.dialog.open(EditUserDataComponent, 
      { data: 
        { 
          id: user.id, 
          email: user.email, 
          password: user.password, 
          age: user.age,
          telephone: user.telephone,
          img: user.img
        } 
      }
    );

    dialogRef.componentInstance.update.subscribe(onChanged =>{
      let data = [];
      let dataImg;

      for(let i in this.dataSource.filteredData){
        if(this.dataSource.filteredData[i].id === onChanged.id){
          this.dataSource.filteredData[i] = onChanged;
        }
        data.push(this.dataSource.filteredData[i]);
      }
      this.dataSource = new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      
      if (user.email === "admin@gmail.com") {
        let index = data.findIndex(i => i.email === user.email);
        dataImg = this.dataSource.filteredData;
        this.infoService.anounceHeaderImg(dataImg[index].img);
      }
    });
  }

  deleteRows() {
      this.selection.selected.forEach((user, i) => {
      setTimeout(() => {
        let index = this.dataSource.data.indexOf(user);

        this.deleteUser(user).subscribe(response => {
          //duplication
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource<User>(this.dataSource.data);
          this.selection = new SelectionModel<User>(true, []);
        });
        }, 100 * (i + 1));
    })
  }
  deleteUser(user){
    if(user.email != "admin@gmail.com")
      return this.requestServ.httpClientDelete("users", user.id);
    else
      console.log("Удалить админа нельзя");
    
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;   
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
}