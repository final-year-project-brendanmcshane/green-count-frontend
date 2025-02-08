import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

// Add interfaces for response types
interface AuthResponse {
  session?: {
    access_token: string;
    // Add other session properties if needed
  };
  user?: {
    id: string;
    email: string;
  };
}

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email">
        </div>
        <div>
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password">
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
        if (response.session?.access_token) {
          this.authService.setSession(response.session.access_token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error: any) => {
        console.error('Login failed:', error);
      }
    });
  }

  onSignup(): void {
    this.authService.signup(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Signup failed:', error);
      }
    });
  }
}