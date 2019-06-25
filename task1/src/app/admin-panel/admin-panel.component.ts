import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AdminToolsService } from '../admin-tools.service';
import { DialogDataAdd} from '../add-user-data/add-user-data.component';
import { EditUserDataComponent } from '../edit-user-data/edit-user-data.component';
import { DeleteUserDataComponent } from '../delete-user-data/delete-user-data.component';
import { HeaderObserveService } from '../header-observe.service';

export interface UsersElements {
  //*поменять типы
  id: number;
  email: string;
  password: string;
  age: string;
  telephone: string;
}

export interface DialogData {
  id: number;
  email: string;
}

const ELEMENT_DATA: UsersElements[] = [];

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  id : number;
  email: number;
  displayedColumns: string[] = ['id', 'email', 'password', 'age', 'telephone', 'action'];
  dataSource = new MatTableDataSource<UsersElements>(ELEMENT_DATA);
  
  constructor(public dialog: MatDialog, private adminService: AdminToolsService, private infoService: HeaderObserveService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {

    // Есть баг при переходе с MainPage
    //Чтобы не добавлялись одни и те же юзеры 
    if(this.dataSource.filteredData.length === 0){
      fetch('http://localhost:3000/users').then(item => item.json()).then(elem => {
        //Заполняем массив полученными данными
        return elem.map(item => ELEMENT_DATA.push(item))

      }).then(() => this.dataSource = new MatTableDataSource<UsersElements>(ELEMENT_DATA))
        .then(() => this.dataSource.paginator = this.paginator)
        
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
        this.dataSource = new MatTableDataSource<UsersElements>(data);
        this.adminService.dataResponse = null;
      }
    });
    
  }
  async openDialogDelete(user) {
    let index = ELEMENT_DATA.indexOf(user)
    const dialogRef = this.dialog.open(DeleteUserDataComponent, { data: { id: user.id, email: user.email }});

      dialogRef.afterClosed().subscribe(async result => {
      if(result){
        let response = await this.deleteUser(user);
        if (response){
          let data = this.dataSource.data;
          data.splice(index, 1);
          this.dataSource = new MatTableDataSource<UsersElements>(data);
        }
      } 
    });
  }

  openDialogEdit(user){
    debugger;

    //БАГ при вызове индекса второй раз прилетит -1;
    //Происходит из-за того что таблицы изменилась, а элемента_дата константа потому и не находит.
    let index = ELEMENT_DATA.indexOf(user);
    
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

    dialogRef.afterClosed().subscribe(result => {
      let data = [];
      let dataImg;
      //ИЗМЕНИТЬ
      fetch('http://localhost:3000/users').then(item => item.json()).then(elem => {
        //Заполняем массив полученными данными
        return elem.map(item => data.push(item))

      })
      .then(() => this.dataSource = new MatTableDataSource<UsersElements>(data))
        .then(() => this.dataSource.paginator = this.paginator)
        .then(() => {
          dataImg = this.dataSource.filteredData;
          for(let i in dataImg){
            console.log(dataImg[i].img);
            
          }
          console.log(index);
          
        })
      })
  }
  
  async deleteUser(user){
    //ИЗМЕНИТЬ
    return fetch(`http://localhost:3000/users/${user.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: null
    })
  }
}