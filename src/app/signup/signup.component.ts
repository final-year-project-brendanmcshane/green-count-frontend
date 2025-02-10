import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="signup-container">
      <h2>Sign Up</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <input type="email" [(ngModel)]="email" name="email" placeholder="Email">
        </div>
        <div>
          <input type="password" [(ngModel)]="password" name="password" placeholder="Password">
        </div>
        <button type="submit">Sign Up</button>
        <button type="button" (click)="goToLogin()">Back to Login</button>
      </form>
    </div>
  `,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.signup(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}