import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockRouter: jasmine.SpyObj<Router>;

  // Create mock services for emissions and auth
  const mockEmissionsService = {
    getUserEmissions: jasmine.createSpy().and.returnValue(of([])),
    addEmission: jasmine.createSpy().and.returnValue(of({ success: true }))
  };

  const mockAuthService = {
    logout: jasmine.createSpy('logout')
  };

  // Set up TestBed with mocks and component under test
  beforeEach(async () => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, EmissionChartComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: HttpClient, useValue: mockHttpClient },
        { provide: EmissionsService, useValue: mockEmissionsService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    // Default welcome message from backend mock
    mockHttpClient.get.and.returnValue(of({ message: 'Welcome!' }));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic component creation check
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Should set the welcome message from backend
  it('should call ngOnInit and set message', () => {
    expect(component.message).toBe('Welcome!');
  });

  // Should load emissions data successfully
  it('should fetch data and set it', () => {
    const mockData = [{ Metric: 'Electricity', Value: 100 }];
    mockHttpClient.get.and.returnValue(of(mockData));
    component.fetchData();
    expect(component.data).toEqual(mockData);
    expect(component.isLoading).toBeFalse();
  });

  // Should handle fetch errors gracefully
  it('should handle fetchData() error', () => {
    spyOn(console, 'error');
    mockHttpClient.get.and.returnValue(throwError(() => new Error('Fetch error')));
    component.fetchData();
    expect(console.error).toHaveBeenCalled();
    expect(component.isLoading).toBeFalse();
  });

  // Should convert energy data successfully
  it('should handle convertData() success case', () => {
    const mockResponse = { Emissions: 42 };
    mockHttpClient.post.and.returnValue(of(mockResponse));
    component.conversionMetric = 'Electricity';
    component.conversionValue = 100;
    component.targetUnit = 'kg';
    component.convertData();
    expect(component.energyEmissions).toBe(42);
    expect(component.convertedData).toEqual(mockResponse);
  });

  // Should handle conversion failure
  it('should handle convertData() error', () => {
    spyOn(console, 'error');
    mockHttpClient.post.and.returnValue(throwError(() => new Error('Conversion failed')));
    component.conversionMetric = 'Electricity';
    component.conversionValue = 100;
    component.targetUnit = 'kg';
    component.convertData();
    expect(console.error).toHaveBeenCalledWith('Error converting data:', jasmine.any(Error));
  });

  // Should get emission summary successfully
  it('should call summarizeData() and set summary', () => {
    const mockSummary = { total: 123 };
    mockHttpClient.get.and.returnValue(of(mockSummary));
    component.metric = 'Electricity';
    component.summarizeData();
    expect(component.summary).toEqual(mockSummary);
  });

  // Should handle summary errors
  it('should handle summarizeData() error', () => {
    spyOn(console, 'error');
    mockHttpClient.get.and.returnValue(throwError(() => new Error('Summary error')));
    component.summarizeData();
    expect(console.error).toHaveBeenCalled();
  });

  // Should calculate emissions correctly
  it('should call calculateEmissions()', () => {
    const mockResult = { Emissions: 88 };
    mockHttpClient.post.and.returnValue(of(mockResult));
    component.conversionMetric = 'Electricity';
    component.conversionValue = 150;
    component.calculateEmissions();
    expect(component.energyEmissions).toBe(88);
  });

  // Should handle calculation error
  it('should handle calculateEmissions() error', () => {
    spyOn(console, 'error');
    mockHttpClient.post.and.returnValue(throwError(() => new Error('Calc fail')));
    component.conversionMetric = 'Electricity';
    component.conversionValue = 150;
    component.calculateEmissions();
    expect(console.error).toHaveBeenCalled();
  });

  // Test router navigation to /chat
  it('should navigate to /chat from goToChat()', () => {
    component.goToChat();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
  });

  // Test router navigation to /daily-emissions
  it('should navigate to /daily-emissions from goToDailyEmissions()', () => {
    component.goToDailyEmissions();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/daily-emissions']);
  });

  // Should log out user and redirect
  it('should call logout and navigate to /login', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  // Should load and store user emissions
  it('should call loadUserEmissions and store emissions', () => {
    component.loadUserEmissions();
    expect(mockEmissionsService.getUserEmissions).toHaveBeenCalled();
    expect(component.userEmissions).toEqual([]);
  });

  // Should post emission with valid form data
  it('should add emission with valid data', () => {
    component.newEmission = {
      category: 'Transport',
      type: 'Car',
      value: 50
    };
    component.addEmission();
    expect(mockEmissionsService.addEmission).toHaveBeenCalledWith({
      category: 'Transport',
      type: 'Car',
      value: 50
    });
  });

  // Should block form submit with invalid data
  it('should not add emission with invalid data', () => {
    spyOn(window, 'alert');
    component.newEmission = { category: '', type: '', value: 0 };
    component.addEmission();
    expect(window.alert).toHaveBeenCalled();
  });

  // Should handle error response when posting emission
  it('should handle error when adding emission', () => {
    spyOn(console, 'error');
    spyOn(window, 'alert');
    mockEmissionsService.addEmission = jasmine.createSpy().and.returnValue(throwError(() => new Error('API Error')));
    component.newEmission = { category: 'Transport', type: 'Bus', value: 10 };
    component.addEmission();
    expect(console.error).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });

  // Should call food impact calculation API successfully
  it('should call convertFoodImpact and store emissions', () => {
    const mockResponse = { Emissions: 70 };
    mockHttpClient.post.and.returnValue(of(mockResponse));
    component.foodItem = 'beef';
    component.foodWeight = 2;
    component.convertFoodImpact();
    expect(component.foodEmissions).toBe(70);
  });

  // Should catch errors from convertFoodImpact API
  it('should handle error in convertFoodImpact()', () => {
    spyOn(console, 'error');
    mockHttpClient.post.and.returnValue(throwError(() => new Error('Food fail')));
    component.foodItem = 'beef';
    component.foodWeight = 2;
    component.convertFoodImpact();
    expect(console.error).toHaveBeenCalled();
  });
});
