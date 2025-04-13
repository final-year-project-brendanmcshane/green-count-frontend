import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyEmissionsComponent } from './daily-emissions.component';
import { Router } from '@angular/router';

describe('DailyEmissionsComponent', () => {
  let component: DailyEmissionsComponent;
  let fixture: ComponentFixture<DailyEmissionsComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mocking Router so I can test navigation without actually triggering it
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DailyEmissionsComponent],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DailyEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Just confirming that the component loads properly
    expect(component).toBeTruthy();
  });

  it('should update vehicle type', () => {
    // Simulating selecting a different vehicle from the dropdown
    const event = { target: { value: 'bus' } } as unknown as Event;
    component.updateVehicleType(event);
    expect(component.selectedVehicle()).toBe('bus');
  });

  it('should update miles driven', () => {
    // Testing the miles driven slider
    const event = { target: { value: '25' } } as unknown as Event;
    component.updateMilesDriven(event);
    expect(component.milesDriven()).toBe(25);
  });

  it('should update hours worked', () => {
    // Same idea, but for the hours worked slider
    const event = { target: { value: '10' } } as unknown as Event;
    component.updateHoursWorked(event);
    expect(component.hoursWorked()).toBe(10);
  });

  it('should update food type', () => {
    // Checking if food type selection updates properly
    const event = { target: { value: 'vegetables' } } as unknown as Event;
    component.updateFoodType(event);
    expect(component.selectedFood()).toBe('vegetables');
  });

  it('should update food quantity', () => {
    // Making sure the food quantity slider works
    const event = { target: { value: '3' } } as unknown as Event;
    component.updateFoodQuantity(event);
    expect(component.foodQuantity()).toBe(3);
  });

  it('should calculate total emissions correctly', () => {
    // Manually setting some values to check if the calculation is accurate
    component.milesDriven.set(10);     // petrol = 0.26473 * 10
    component.hoursWorked.set(8);      // 0.33378 * 8
    component.foodQuantity.set(2);     // beef = 27 * 2
    component.selectedVehicle.set('petrol');
    component.selectedFood.set('beef');

    const total = component.totalEmissions();
    expect(total).toBe('59.32');  // Just checking the final computed output
  });

  it('should navigate to home on goHome()', () => {
    // Button press should trigger navigation back to home
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});
