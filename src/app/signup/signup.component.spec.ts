import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

// Create a basic mock of AuthService
class MockAuthService {
  signup(email: string, password: string) {
    return of({ message: 'Signup successful' });
  }
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AuthService, useClass: MockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signup on submit', () => {
    const spy = spyOn(component['authService'], 'signup').and.callThrough();
    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
