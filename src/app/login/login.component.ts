import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token?: string;
  user?: {
    id: string;
    email: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
        </div>
        <div>
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
        </div>
        <button type="submit">Login</button>
        <button type="button" (click)="onSignup()">Sign Up</button>
      </form>
    </div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        console.log("Login response:", response);

        if (response?.access_token) {
          this.authService.setSession(response.access_token);

          // Ensure valid navigation
          const targetRoute = this.router.config.some(route => route.path === 'dashboard') ? '/dashboard' : '/';
          this.router.navigate([targetRoute]);
        } else {
          console.warn("Login response is missing access_token.");
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        alert("Login failed. Please check your email and password.");
      }
    });
  }

  onSignup(): void {
    this.authService.signup(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        console.log('Signup successful:', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Signup failed:', error);
        alert("Signup failed. Please try again.");
      }
    });
  }
}
