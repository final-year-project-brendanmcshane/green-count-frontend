import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyEmissionsComponent } from './weekly-emissions.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('WeeklyEmissionsComponent', () => {
  let component: WeeklyEmissionsComponent;
  let fixture: ComponentFixture<WeeklyEmissionsComponent>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  // Set up the testing module and component instance before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, WeeklyEmissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeeklyEmissionsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update vehicle type', () => {
    component.updateVehicleType({ target: { value: 'bus' } } as unknown as Event);
    expect(component.selectedVehicle()).toBe('bus');
  });

  it('should update miles driven', () => {
    component.updateMilesDriven({ target: { value: '70' } } as unknown as Event);
    expect(component.milesDriven()).toBe(70);
  });

  it('should update hours worked', () => {
    component.updateHoursWorked({ target: { value: '35' } } as unknown as Event);
    expect(component.hoursWorked()).toBe(35);
  });

  it('should add new food entry and update it', () => {
    const before = component.foodEntries().length;
    component.addFoodEntry();
    expect(component.foodEntries().length).toBe(before + 1);
  
    const lastIndex = component.foodEntries().length - 1;
    component.updateFoodType(lastIndex, 'chicken');
    component.updateFoodQuantity(lastIndex, 7);
    expect(component.foodEntries()[lastIndex]).toEqual({ type: 'chicken', quantity: 7 });
  });
  
  // Validates that the totalEmissions calculation matches expected output for known inputs
  it('should calculate total emissions correctly', () => {
    component.selectedVehicle.set('diesel');
    component.milesDriven.set(50);
    component.hoursWorked.set(40);
    component.foodEntries.set([{ type: 'beef', quantity: 4 }]);
  
    expect(component.totalEmissions()).toBeCloseTo(135.02, 2); // Value can be adjusted based on logic
  });
  

  it('calculateEmissions() should log the total', () => {
    spyOn(console, 'log');
    component.calculateEmissions();
    expect(console.log).toHaveBeenCalledWith('Total Emissions:', component.totalEmissions());
  });

  it('should navigate home on goHome()', () => {
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  // Tests the toggle functionality of the side navigation menu using DOM manipulation
  describe('toggleMenu()', () => {
    let offcanvas: HTMLElement;
    let getByIdSpy: jasmine.Spy;
  
    beforeEach(() => {
      offcanvas = document.createElement('div');
      offcanvas.id = 'offcanvasNav';
      document.body.appendChild(offcanvas);
  
      getByIdSpy = spyOn(document, 'getElementById')
        .and.callFake((id: string) => id === 'offcanvasNav' ? offcanvas : null);
    });
  
    afterEach(() => {
      document.body.removeChild(offcanvas);
      getByIdSpy.and.callThrough();
    });
  
    it('should toggle .show on #offcanvasNav', () => {
      offcanvas.classList.remove('show');
      component.toggleMenu();
      expect(offcanvas.classList.contains('show')).toBeTrue();
  
      component.toggleMenu();
      expect(offcanvas.classList.contains('show')).toBeFalse();
    });
  
    
    
    
    
  });
  
});
