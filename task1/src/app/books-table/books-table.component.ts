import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminToolsService } from '../services/admin-tools.service';
import { HeaderObserveService } from '../services/header-observe.service';
import { SelectionModel } from '@angular/cdk/collections';
import { RequestsService } from '../services/requests.service';
import { AddBookDataComponent } from '../add-book-data/add-book-data.component';
import { EditBookDataComponent } from '../edit-book-data/edit-book-data.component';
import { DeleteBookDataComponent } from '../delete-book-data/delete-book-data.component';
import { Book } from '../models/book';

export interface DialogData {
  id: number;
  title: string;
}

const ELEMENT_DATA: Book[] = [];

@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  styleUrls: ['./books-table.component.css']
})
export class BooksTableComponent implements OnInit {
  id: number;
  title: number;
  displayedColumns: string[] = ['select', 'id', 'title', 'author', 'img', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource<Book>(ELEMENT_DATA);
  selection = new SelectionModel<Book>(true, []);

  constructor(public dialog: MatDialog,
    private adminService: AdminToolsService,
    private infoService: HeaderObserveService,
    private requestServ: RequestsService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    // Есть баг при переходе с MainPage
    // Чтобы не добавлялись одни и те же юзеры 

    if (this.dataSource.filteredData.length === 0) {
      this.requestServ.httpClientGet("books")
        .subscribe(data => {
          for(let key in data){
            ELEMENT_DATA.push(data[key]);
            this.dataSource = new MatTableDataSource<Book>(ELEMENT_DATA)
            this.dataSource.paginator = this.paginator
          }
        });

      // this.requestServ.httpGET("books")
      //   .then(item => item.json())
      //   .then(elem => {
      //     console.log(elem);
      //     //Заполняем массив полученными данными
      //     return elem.map(item => ELEMENT_DATA.push(item))
      //   }).then(() => this.dataSource = new MatTableDataSource<Book>(ELEMENT_DATA))
      //   .then(() => this.dataSource.paginator = this.paginator)

    }
  }
  addBook() {
    const dialogRef = this.dialog.open(AddBookDataComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (this.adminService.dataResponse) {
        let data = this.dataSource.data;

        //берем последний элемент и прибавляем + 1 его айди
        this.adminService.dataResponse.id =
          this.dataSource.filteredData[this.dataSource.filteredData.length - 1].id + 1;

        data.push(this.adminService.dataResponse);
        this.dataSource = new MatTableDataSource<Book>(data);
        this.adminService.dataResponse = null;
      }
    });

  }

  async openDialogDelete(book) {
    let index = ELEMENT_DATA.indexOf(book)
    const dialogRef = this.dialog.open(DeleteBookDataComponent, { data: { id: book.id, title: book.title }});

    dialogRef.afterClosed().subscribe(async result => {
      //duplication
      if (result) {
        let response = await this.deleteUser(book);
        if (response) {
          let data = this.dataSource.data;
          data.splice(index, 1);
          this.dataSource = new MatTableDataSource<Book>(data);
        }
      }
    });
  }

  openDialogEdit(book) {

    //БАГ при вызове индекса второй раз прилетит -1;
    //Происходит из-за того что таблицы изменилась, а элемента_дата константа потому и не находит.
    
    const dialogRef = this.dialog.open(EditBookDataComponent,
      {
        data:
        {
          id: book.id,
          title: book.title,
          author: book.author,
          price: book.price,
          description: book.description,
          img: book.img
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      let data = [];
      let dataImg;
      // this.requestServ.httpGET("books").then(item => item.json()).then(elem => {
      //   //Заполняем массив полученными данными
      //   return elem.map(item => data.push(item))
      // })
      //   .then(() => this.dataSource = new MatTableDataSource<Book>(data))
      //   .then(() => this.dataSource.paginator = this.paginator)
      //   .then(() => {
      this.requestServ.httpClientGet("books")
        .subscribe(response => {
          for (let key in response) {
            data.push(response[key]);
            this.dataSource = new MatTableDataSource<Book>(data);
            this.dataSource.paginator = this.paginator;
          }
          // if (book.title === "admin@gmail.com") {
          //   let index = data.findIndex(i => i.title === book.title);
          //   dataImg = this.dataSource.filteredData;
          //   this.infoService.anounceHeaderImg(dataImg[index].img);
          // }
        });
        })
    }

  deleteRows() {
    this.selection.selected.forEach((user, i) => {
      setTimeout(() => {
        let index = this.dataSource.data.indexOf(user);

        this.deleteUser(user);
        //duplication
        this.dataSource.data.splice(index, 1);
        this.dataSource = new MatTableDataSource<Book>(this.dataSource.data);
        this.selection = new SelectionModel<Book>(true, []);
      }, 100 * (i + 1));
    })
  }
  async deleteUser(book) {
    return this.requestServ.httpDeleteBook(book.id);
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
  checkboxLabel(row?: Book): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

}
