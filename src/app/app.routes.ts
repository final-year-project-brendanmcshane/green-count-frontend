import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login
    { path: 'home', component: HomeComponent }, // Add home component route
    { path: 'login', component: LoginComponent },
];
