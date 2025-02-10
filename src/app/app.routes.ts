import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login
    { path: 'home', component: HomeComponent }, // Add home component route
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
];
