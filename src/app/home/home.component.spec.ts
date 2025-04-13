import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let emissionsService: jasmine.SpyObj<EmissionsService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    // Create spies for services
    emissionsService = jasmine.createSpyObj('EmissionsService', ['getUserEmissions', 'addEmission']);
    authService = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [HomeComponent, EmissionChartComponent],
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: EmissionsService, useValue: emissionsService },
        { provide: AuthService, useValue: authService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    // Default successful responses
    emissionsService.getUserEmissions.and.returnValue(of([]));
    emissionsService.addEmission.and.returnValue(of({ success: true }));

    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user emissions on loadUserEmissions', () => {
    component.loadUserEmissions();
    expect(emissionsService.getUserEmissions).toHaveBeenCalled();
    expect(component.userEmissions).toEqual([]);
  });

  it('should call logout and navigate to login', () => {
    spyOn(component['router'], 'navigate');
    component.logout();
    expect(authService.logout).toHaveBeenCalled();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not add emission if inputs are invalid', () => {
    spyOn(window, 'alert');
    component.newEmission = { category: '', type: '', value: null };
    component.addEmission();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should call emissionsService.addEmission when valid emission is added', () => {
    component.newEmission = { category: 'Transport', type: 'Car', value: 10 };
    component.addEmission();
    expect(emissionsService.addEmission).toHaveBeenCalledWith({
      category: 'Transport',
      type: 'Car',
      value: 10
    });
  });

  it('should handle errors from emissionsService.addEmission', () => {
    emissionsService.addEmission.and.returnValue(throwError(() => new Error('Add failed')));
    spyOn(window, 'alert');
    component.newEmission = { category: 'Transport', type: 'Car', value: 10 };
    component.addEmission();
    expect(window.alert).toHaveBeenCalledWith('Error adding emission: Add failed');
  });
});
