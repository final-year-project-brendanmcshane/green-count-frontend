import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmissionsService, EmissionData } from './emissions.service';
import { AuthService } from './auth.service';

describe('EmissionsService', () => {
  let service: EmissionsService;
  let httpMock: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Use the old method for compatibility
      providers: [
        EmissionsService,
        { provide: AuthService, useValue: authSpy }
      ]
    });

    service = TestBed.inject(EmissionsService);
    httpMock = TestBed.inject(HttpTestingController);
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockAuthService.getToken.and.returnValue('mocked-token');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to add-user-emission with auth header', () => {
    const testData: EmissionData = {
      category: 'Transport',
      type: 'Diesel',
      value: 100
    };

    service.addEmission(testData).subscribe();

    const req = httpMock.expectOne('http://localhost:5000/add-user-emission');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');
    expect(req.request.body).toEqual(testData);

    req.flush({ message: 'Success' });
  });

  it('should send a GET request to get-user-emissions with auth header', () => {
    service.getUserEmissions().subscribe();

    const req = httpMock.expectOne('http://localhost:5000/get-user-emissions');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mocked-token');

    req.flush([{ category: 'Transport', type: 'Diesel', value: 100 }]);
  });
});
