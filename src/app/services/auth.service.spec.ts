import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);

    // Clearing localStorage before each test
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
});
