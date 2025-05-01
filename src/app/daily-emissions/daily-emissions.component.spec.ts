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
      // include RouterTestingModule so navigate() works in tests
      imports: [RouterTestingModule, DailyEmissionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyEmissionsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');  // spy on router.navigate
    fixture.detectChanges();
  });

  it('should create', () => {
    // sanity check: component instantiates without errors
    expect(component).toBeTruthy();
  });

  it('should update vehicle type', () => {
    // simulate changing the select dropdown
    component.updateVehicleType({ target: { value: 'bus' } } as unknown as Event);
    expect(component.selectedVehicle()).toBe('bus');
  });

  it('should update miles driven', () => {
    component.updateMilesDriven({ target: { value: '25' } } as unknown as Event);
    expect(component.milesDriven()).toBe(25);
  });

  it('should update hours worked', () => {
    component.updateHoursWorked({ target: { value: '10' } } as unknown as Event);
    expect(component.hoursWorked()).toBe(10);
  });

  it('should update first food entry type and quantity', () => {
    // change the very first food entry twice in one test
    component.updateFoodType(0, 'vegetables');
    component.updateFoodQuantity(0, 3);
    const [first] = component.foodEntries();
    expect(first.type).toBe('vegetables');
    expect(first.quantity).toBe(3);
  });

  it('should add new food entry', () => {
    // before + addFoodEntry() ⇒ length +1
    const before = component.foodEntries().length;
    component.addFoodEntry();
    expect(component.foodEntries().length).toBe(before + 1);
    // last entry defaults to beef,1
    const last = component.foodEntries().slice(-1)[0];
    expect(last).toEqual({ type: 'beef', quantity: 1 });
  });

  it('should update second food entry independently', () => {
    // ensure multiple entries don’t bleed into each other
    component.addFoodEntry();                          // now index 1 exists
    component.updateFoodType(1, 'chicken');
    component.updateFoodQuantity(1, 5);
    const entries = component.foodEntries();
    // original at [0] still default
    expect(entries[0].type).not.toBe('chicken');
    expect(entries[1]).toEqual({ type: 'chicken', quantity: 5 });
  });

  it('should calculate total emissions correctly', () => {
    // set up known values to verify the computed formula
    component.selectedVehicle.set('petrol');
    component.milesDriven.set(10);
    component.hoursWorked.set(8);
    component.foodEntries.set([{ type: 'beef', quantity: 2 }]);
    expect(component.totalEmissions()).toBeCloseTo(59.32, 2);

  });

  it('should return "0.00" if all inputs zero or empty', () => {
    // zero miles, no work, no food
    component.selectedVehicle.set('diesel');
    component.milesDriven.set(0);
    component.hoursWorked.set(0);
    component.foodEntries.set([]);
    expect(component.totalEmissions()).toBeCloseTo(0.00, 2);
  });

  it('calculateEmissions() should console.log the total', () => {
    // spy console.log and ensure it logs what totalEmissions() returns
    spyOn(console, 'log');
    component.calculateEmissions();
    expect(console.log)
      .toHaveBeenCalledWith('Total Emissions:', component.totalEmissions());
  });

  it('should navigate to /home on goHome()', () => {
    // simulate clicking "home" button
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  });

  describe('toggleMenu()', () => {
    let offcanvas: HTMLElement;
    let getByIdSpy: jasmine.Spy;

    beforeEach(() => {
      // create a dummy offcanvasNav element in the DOM
      offcanvas = document.createElement('div');
      offcanvas.id = 'offcanvasNav';
      document.body.appendChild(offcanvas);

      // spy document.getElementById to always return our element
      getByIdSpy = spyOn(document, 'getElementById')
        .and.callFake((id: string) => id === 'offcanvasNav' ? offcanvas : null);
    });

    afterEach(() => {
      // clean up
      document.body.removeChild(offcanvas);
      getByIdSpy.and.callThrough();  // restore original
    });

    it('should add "show" when hidden', () => {
      offcanvas.classList.remove('show');
      component.toggleMenu();
      expect(offcanvas.classList.contains('show')).toBeTrue();
    });

    it('should remove "show" when already visible', () => {
      offcanvas.classList.add('show');
      component.toggleMenu();
      expect(offcanvas.classList.contains('show')).toBeFalse();
    });
  });

  // —— Extra edge‐case tests to boost coverage ——
  describe('edge cases & branches', () => {
    it('should default to "0.00" for an unknown vehicle type', () => {
      component.selectedVehicle.set('spaceship');
      component.milesDriven.set(5);
      component.hoursWorked.set(0);
      component.foodEntries.set([]);
      expect(component.totalEmissions()).toBeCloseTo(0.00,2);
    });

    it('should treat non-numeric miles input as zero', () => {
      component.updateMilesDriven({ target: { value: 'not a number' } } as unknown as Event);
      expect(component.milesDriven()).toBe(0);
    });

    it('should treat non-numeric hours input as zero', () => {
      component.updateHoursWorked({ target: { value: 'NaN' } } as unknown as Event);
      expect(component.hoursWorked()).toBe(0);
    });

    it('should treat non-numeric food quantity as zero', () => {
      // start with a valid entry
      component.foodEntries.set([{ type: 'beef', quantity: 2 }]);
      component.updateFoodQuantity(0, 'xyz');
      expect(component.foodEntries()[0].quantity).toBe(0);
    });

    it('should ignore unknown food types (0 emissions)', () => {
      component.foodEntries.set([{ type: 'unicorn', quantity: 10 }]);
      component.selectedVehicle.set('diesel');
      component.milesDriven.set(0);
      component.hoursWorked.set(0);
      // unicorn not in foodEmissions ⇒ counted as 0
      expect(component.totalEmissions()).toBeCloseTo(0.00, 2);
    });
  });
});
