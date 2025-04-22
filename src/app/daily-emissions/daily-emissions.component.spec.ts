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
    // Using the first food entry (index 0)
    const foodIndex = 0;
    component.updateFoodType(foodIndex, 'vegetables');
    expect(component.foodEntries()[foodIndex].type).toBe('vegetables');
  });

  it('should update food quantity', () => {
    // Making sure the food quantity slider works
    // Using the first food entry (index 0)
    const foodIndex = 0;
    component.updateFoodQuantity(foodIndex, 3);
    expect(component.foodEntries()[foodIndex].quantity).toBe(3);
  });

  it('should add new food entry', () => {
    // Test adding a new food entry
    const initialLength = component.foodEntries().length;
    component.addFoodEntry();
    expect(component.foodEntries().length).toBe(initialLength + 1);
  });

  it('should calculate total emissions correctly', () => {
    // Manually setting some values to check if the calculation is accurate
    component.milesDriven.set(10);     // petrol = 0.26473 * 10
    component.hoursWorked.set(8);      // 0.33378 * 8
    component.selectedVehicle.set('petrol');
    
    // Update the first food entry to beef with quantity 2
    const foodEntries = [{ type: 'beef', quantity: 2 }];
    component.foodEntries.set(foodEntries);

    const total = component.totalEmissions();
    expect(total).toBe('59.32');  // Final computed output
  });

  it('should navigate to home on goHome()', () => {
    // Button press should trigger navigation back to home
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });
});