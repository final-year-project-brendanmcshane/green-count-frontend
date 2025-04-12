import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { EmissionsService } from '../services/emissions.service';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

// You also need to import this since EmissionChartComponent is a standalone dependency of HomeComponent
import { EmissionChartComponent } from '../emission-chart/emission-chart.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockEmissionsService = {
    getUserEmissions: () => of([]),
    addEmission: () => of({ success: true })
  };

  const mockAuthService = {
    logout: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, EmissionChartComponent],
      providers: [
        provideHttpClient(), // Use non-deprecated version for HttpClient
        provideRouter([]),
        { provide: EmissionsService, useValue: mockEmissionsService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // confirms the component bootstraps without crashing
  });
});
