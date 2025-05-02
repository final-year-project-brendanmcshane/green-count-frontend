import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmissionChartComponent } from './emission-chart.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { EmissionsService } from '../services/emissions.service';

describe('EmissionChartComponent', () => {
  let component: EmissionChartComponent;
  let fixture: ComponentFixture<EmissionChartComponent>;
  let mockEmissionsService: jasmine.SpyObj<EmissionsService>;

  // Sample mock data returned by the service
  const mockEmissionData = [
    { created_at: '2024-04-01T00:00:00Z', emissions: 10 },
    { created_at: '2024-04-02T00:00:00Z', emissions: 20 }
  ];

  beforeEach(async () => {
    // Sets up a spy object for EmissionsService with a default return value
    mockEmissionsService = jasmine.createSpyObj('EmissionsService', ['getUserEmissions']);
    mockEmissionsService.getUserEmissions.and.returnValue(of(mockEmissionData));

    await TestBed.configureTestingModule({
      imports: [EmissionChartComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: EmissionsService, useValue: mockEmissionsService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data and update chart options', () => {
    expect(component.isDataLoaded).toBeTrue();
    expect(component.chartOptions.series?.length).toBeGreaterThan(0);
  });

  it('should update chart type when changeChartType is called', () => {
    // Simulate user selecting a different chart type
    const event = { target: { value: 'bar' } } as unknown as Event;
    component.changeChartType(event);
    expect(component.selectedChartType).toBe('bar');
  });

  it('should handle error in fetchChartData gracefully', () => {
    // Simulate an error from the emissions service
    mockEmissionsService.getUserEmissions.and.returnValue(throwError(() => new Error('API Error')));
    component.fetchChartData();
    expect(component.isDataLoaded).toBeTrue();
  });
});
