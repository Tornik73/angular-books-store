import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from './auth.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogDataExampleDialog} from '../app/admin-panel/admin-panel.component'

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    RegisterComponent,
    AdminPanelComponent,
    ProfileComponent,
    DialogDataExampleDialog
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
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule

  ],
  entryComponents: [
    DialogDataExampleDialog
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
