import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import{LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { 
    path: 'login',
    component: LoginComponent, 
    canActivate: [AuthGuard]
    },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'admin-panel', component: AdminPanelComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'details/books/:id', component: DetailsComponent },
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }

