import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear any previous localStorage data before each test to ensure a clean state
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a token', () => {
    service.setSession('test-token');
    expect(service.getToken()).toBe('test-token');
  });

  it('should return true if token exists', () => {
    localStorage.setItem('token', 'token-value');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false if token doesn’t exist', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should clear token and userId on logout', () => {
    localStorage.setItem('token', 'some-token');
    localStorage.setItem('userId', 'some-id');
    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
  });

  // Simulates a successful signup API call and checks the response
  it('should call signup API and store user session on success', () => {
    const mockResponse = { token: 'test-token', userId: '12345' };
    const email = 'test@test.com';
    const password = 'password123';

    service.signup(email, password).subscribe((res) => {
      expect(res.token).toBe(mockResponse.token);
      expect(res.userId).toBe(mockResponse.userId);
    });

    const req = httpMock.expectOne('http://localhost:5000/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Simulates a successful login API call and checks the response
  it('should call login API and store user session on success', () => {
    const mockResponse = { token: 'login-token', userId: '12345' };
    const email = 'test@test.com';
    const password = 'password123';

    service.login(email, password).subscribe((res) => {
      expect(res.token).toBe(mockResponse.token);
      expect(res.userId).toBe(mockResponse.userId);
    });

    const req = httpMock.expectOne('http://localhost:5000/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  // Verifies that both token and userId are saved correctly
  it('should store token and userId with setUserSession()', () => {
    const token = 'test-session-token';
    const userId = 'user-12345';

    service.setUserSession(token, userId);

    expect(localStorage.getItem('token')).toBe(token);
    expect(localStorage.getItem('userId')).toBe(userId);
  });

  // Test error handling for failed signup
  it('should handle signup API failure', () => {
    const email = 'test@test.com';
    const password = 'password123';

    service.signup(email, password).subscribe(
      () => fail('Expected error, but got success'),
      (error) => {
        expect(error.status).toBe(0);
        expect(error.statusText).toBe('Unknown Error');
      }
    );

    const req = httpMock.expectOne('http://localhost:5000/auth/signup');
    req.error(new ErrorEvent('API Error'));
  });

  // Test error handling for failed login
  it('should handle login API failure', () => {
    const email = 'test@test.com';
    const password = 'password123';

    service.login(email, password).subscribe(
      () => fail('Expected error, but got success'),
      (error) => {
        expect(error.status).toBe(0);
        expect(error.statusText).toBe('Unknown Error');
      }
    );

    const req = httpMock.expectOne('http://localhost:5000/auth/login');
    req.error(new ErrorEvent('API Error'));
  });

  afterEach(() => {
    // Verifies that no unmatched HTTP requests are left after each test
    httpMock.verify();
  });
});
