import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { EmissionChatComponent } from './emission-chat/emission-chat.component';
import { DailyEmissionsComponent } from './daily-emissions/daily-emissions.component';
import { SettingsComponent } from './settings/settings.component';
import { InformationComponent } from './information/information.component';
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default to login
    { path: 'home', component: HomeComponent }, // Add home component route
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: EmissionChatComponent }, // ✅ New Route for AI Chat
    { path: 'daily-emissions', component: DailyEmissionsComponent },
    {path: 'settings', component: SettingsComponent},
    { path: 'information', component: InformationComponent }
];
