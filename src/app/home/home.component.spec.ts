import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockEmissionsService = {
    getUserEmissions: () => of([]),
    addEmission: () => of({ success: true })
  };

  const mockAuthService = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, EmissionChartComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: EmissionsService, useValue: mockEmissionsService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  //  Test the success path of converting data
  it('should handle convertData() success case', () => {
    const mockResponse = { Emissions: 42 };
    spyOn(component['http'], 'post').and.returnValue(of(mockResponse));

    component.conversionMetric = 'Electricity';
    component.conversionValue = 100;
    component.targetUnit = 'kg';
    component.convertData();

    expect(component.energyEmissions).toBe(42);
    expect(component.convertedData).toEqual(mockResponse);
  });

  //  Handle API failure during conversion
  it('should handle convertData() failure case', () => {
    spyOn(component['http'], 'post').and.returnValue(throwError(() => new Error('Conversion failed')));
    spyOn(console, 'error');

    component.conversionMetric = 'Electricity';
    component.conversionValue = 100;
    component.targetUnit = 'kg';
    component.convertData();

    expect(console.error).toHaveBeenCalledWith('Error converting data:', jasmine.any(Error));
  });

  // 📊 Test fetching summarized data and setting it
  it('should call summarizeData() and set summary', () => {
    const mockSummary = { total: 123 };
    spyOn(component['http'], 'get').and.returnValue(of(mockSummary));

    component.metric = 'Electricity';
    component.summarizeData();

    expect(component.summary).toEqual(mockSummary);
  });

  it('should handle summarizeData() error', () => {
    spyOn(component['http'], 'get').and.returnValue(throwError(() => new Error('Summary error')));
    spyOn(console, 'error');

    component.summarizeData();

    expect(console.error).toHaveBeenCalledWith('Error fetching summary:', jasmine.any(Error));
  });

  it('should calculate emissions and store result', () => {
    const mockResult = { Emissions: 88 };
    spyOn(component['http'], 'post').and.returnValue(of(mockResult));

    component.conversionMetric = 'Electricity';
    component.conversionValue = 150;
    component.calculateEmissions();

    expect(component.energyEmissions).toBe(88);
  });

  it('should handle calculateEmissions() error', () => {
    spyOn(component['http'], 'post').and.returnValue(throwError(() => new Error('Calc fail')));
    spyOn(console, 'error');

    component.conversionMetric = 'Electricity';
    component.conversionValue = 150;
    component.calculateEmissions();

    expect(console.error).toHaveBeenCalledWith('Error calculating emissions:', jasmine.any(Error));
  });

  //  Should redirect to chat route
  it('should navigate to /chat from goToChat()', () => {
    component.goToChat();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/chat']);
  });

  //  Should redirect to daily emissions route
  it('should navigate to /daily-emissions from goToDailyEmissions()', () => {
    component.goToDailyEmissions();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/daily-emissions']);
  });

  //  Should logout and navigate to login route
  it('should call logout and navigate to /login', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
