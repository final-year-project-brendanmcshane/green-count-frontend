import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: {
    id: string;
    email: string;
    role: string;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
      <div
      class="container d-flex align-items-center justify-content-center"
      style="min-height: 100vh;"
    >
      <div class="card shadow" style="max-width: 400px; width: 100%;">
        <div class="card-body p-4">
          <h2 class="text-center mb-4">Login</h2>
          <!-- Angular template-driven form -->
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                [(ngModel)]="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                [(ngModel)]="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" class="btn btn-success w-100">
              Login
            </button>
            <button
              type="button"
              class="btn btn-outline-success w-100 mt-2"
              (click)="onSignup()"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
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
        if (response.access_token) {
          this.authService.setUserSession(
            response.access_token,
            response.user.id
          );
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
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
