import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule, MatMenuModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from './services/auth.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataAdd } from './add-user-data/add-user-data.component'
import { EditUserDataComponent } from './edit-user-data/edit-user-data.component';
import { DeleteUserDataComponent } from './delete-user-data/delete-user-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BooksTableComponent } from './books-table/books-table.component';
import { AddBookDataComponent } from './add-book-data/add-book-data.component';
import { EditBookDataComponent } from './edit-book-data/edit-book-data.component';
import { DeleteBookDataComponent } from './delete-book-data/delete-book-data.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ProfileComponent,
    DialogDataAdd,
    EditUserDataComponent,
    DeleteUserDataComponent,
    PageNotFoundComponent,
    BooksTableComponent,
    AddBookDataComponent,
    EditBookDataComponent,
    DeleteBookDataComponent,
    DetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTableModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatCheckboxModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule
  ],
  entryComponents: [
    DeleteUserDataComponent,
    DialogDataAdd,
    EditUserDataComponent,
    AddBookDataComponent,
    EditBookDataComponent,
    DeleteBookDataComponent,
  ],
  providers: [
    AuthService,
    DetailsComponent
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
