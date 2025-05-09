import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { EmissionChatComponent } from './emission-chat/emission-chat.component';
import { DailyEmissionsComponent } from './daily-emissions/daily-emissions.component';
import { SettingsComponent } from './settings/settings.component';
import { InformationComponent } from './information/information.component';
import { WeeklyEmissionsComponent } from './weekly-emissions/weekly-emissions.component';
import { FoodEmissionsComponent } from './food-emissions/food-emissions.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login
    { path: 'home', component: HomeComponent }, // Add home component route
    { path: 'signup', component: SignupComponent }, // Sign in component
    { path: 'login', component: LoginComponent }, // Log in component
    { path: 'chat', component: EmissionChatComponent }, // ✅ New Route for AI Chat
    { path: 'daily-emissions', component: DailyEmissionsComponent },
    {path: 'settings', component: SettingsComponent}, // Settings component
    { path: 'information', component: InformationComponent }, //Information component
    { path: 'weekly-emissions', component: WeeklyEmissionsComponent }, //Weekly emissions component
    { path: 'food-emissions', component: FoodEmissionsComponent } // Food emissions component
];
