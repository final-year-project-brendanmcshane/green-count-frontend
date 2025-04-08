import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock versions of AuthService and Router
    mockAuthService = jasmine.createSpyObj('AuthService', ['login', 'signup', 'setUserSession']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideHttpClientTesting(), // Allows HttpClient calls to be mocked
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Checks if the component is created successfully
  });

  it('should call login and navigate to /home on success', () => {
    const mockResponse = {
      access_token: 'token',
      refresh_token: 'refresh',
      expires_in: 3600,
      user: { id: '123', email: 'test@test.com', role: 'user' }
    };

    mockAuthService.login.and.returnValue(of(mockResponse));

    component.email = 'test@test.com';
    component.password = 'password';
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith('test@test.com', 'password');
    expect(mockAuthService.setUserSession).toHaveBeenCalledWith('token', '123');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should log error on login failure', () => {
    const consoleSpy = spyOn(console, 'error');
    mockAuthService.login.and.returnValue(throwError(() => new Error('Login failed')));

    component.email = 'fail@test.com';
    component.password = 'wrongpass';
    component.onSubmit();

    expect(consoleSpy).toHaveBeenCalledWith('Login failed:', jasmine.any(Error));
  });

  it('should call signup and navigate to /login on success', () => {
    const mockResponse = {
      access_token: 'signup-token',
      refresh_token: 'signup-refresh',
      expires_in: 3600,
      user: { id: '456', email: 'signup@test.com', role: 'user' }
    };

    mockAuthService.signup.and.returnValue(of(mockResponse));

    component.email = 'signup@test.com';
    component.password = 'password';
    component.onSignup();

    // Check that signup method is called and user is redirected
    expect(mockAuthService.signup).toHaveBeenCalledWith('signup@test.com', 'password');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
