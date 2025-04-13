import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

// Mock HttpClient
class MockHttpClient {
  post = jasmine.createSpy().and.returnValue(of({ success: true }));
  get = jasmine.createSpy().and.returnValue(of({ message: 'Welcome' }));
}

// Mock EmissionsService
const mockEmissionsService = {
  getUserEmissions: () => of([]),
  addEmission: () => of({ success: true })
};

// Mock AuthService
const mockAuthService = {
  logout: () => {}
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let http: MockHttpClient;

  beforeEach(async () => {
    http = new MockHttpClient();

    await TestBed.configureTestingModule({
      imports: [HomeComponent, EmissionChartComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: HttpClient, useValue: http },
        { provide: EmissionsService, useValue: mockEmissionsService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // confirms component loads without crashing
  });

  it('should call addData and reset fields on success', () => {
    // Simulate valid form inputs
    component.metric = 'Electricity';
    component.unit = 'kWh';
    component.value = 100;

    component.addData(); // Trigger addData()

    // Check that the post request was made correctly
    expect(http.post).toHaveBeenCalledWith(
      'http://127.0.0.1:5000/add',
      { Metric: 'Electricity', Unit: 'kWh', Value: 100 }
    );

    // Check that input fields were reset
    expect(component.metric).toBe('');
    expect(component.unit).toBe('');
    expect(component.value).toBeNull();
  });

  it('should alert and not call post if input is invalid', () => {
    spyOn(window, 'alert'); // Spy on alert()

    // Simulate invalid inputs
    component.metric = '';
    component.unit = '';
    component.value = null;

    component.addData(); // Try to submit

    // Make sure alert was shown and post wasn't called
    expect(window.alert).toHaveBeenCalledWith('Please provide valid Metric, Unit, and Value.');
    expect(http.post).not.toHaveBeenCalled();
  });
});
