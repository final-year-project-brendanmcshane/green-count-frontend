import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyEmissionsComponent } from './daily-emissions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('DailyEmissionsComponent', () => {
  let component: DailyEmissionsComponent;
  let fixture: ComponentFixture<DailyEmissionsComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // RouterTestingModule gives us routerLink, router.navigate(), etc.
      imports: [RouterTestingModule, DailyEmissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEmissionsComponent);
    component = fixture.componentInstance;
    router    = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    // component instantiation
    expect(component).toBeTruthy();
  });

  it('should update vehicle type', () => {
    // simulate dropdown change event
    component.updateVehicleType({ target: { value: 'bus' } } as unknown as Event);
    expect(component.selectedVehicle()).toBe('bus');
  });

  it('should update miles driven', () => {
    // simulate slider/input change event
    component.updateMilesDriven({ target: { value: '25' } } as unknown as Event);
    expect(component.milesDriven()).toBe(25);
  });

  it('should update hours worked', () => {
    component.updateHoursWorked({ target: { value: '10' } } as unknown as Event);
    expect(component.hoursWorked()).toBe(10);
  });

  it('should update food type', () => {
    // change first food entry from 'beef' to 'vegetables'
    component.updateFoodType(0, 'vegetables');
    expect(component.foodEntries()[0].type).toBe('vegetables');
  });

  it('should update food quantity', () => {
    // change first food entry quantity to 3
    component.updateFoodQuantity(0, 3);
    expect(component.foodEntries()[0].quantity).toBe(3);
  });

  it('should add new food entry', () => {
    // initial array length + 1
    const initialLen = component.foodEntries().length;
    component.addFoodEntry();
    expect(component.foodEntries().length).toBe(initialLen + 1);
  });

  it('should calculate total emissions correctly', () => {
    // set everything manually and compare to fixed formula
    component.selectedVehicle.set('petrol');
    component.milesDriven.set(10);
    component.hoursWorked.set(8);
    component.foodEntries.set([{ type: 'beef', quantity: 2 }]);
    // 10*0.26473 + 8*0.33378 + 2*27 = ~59.31754 ⇒ "59.32"
    expect(component.totalEmissions()).toBe('59.32');
  });

  it('should navigate to home on goHome()', () => {
    // clicking the home button calls router.navigate(['/home'])
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });
});
