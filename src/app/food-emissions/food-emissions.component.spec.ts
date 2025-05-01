import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodEmissionsComponent } from './food-emissions.component';

describe('FoodEmissionsComponent', () => {
  let component: FoodEmissionsComponent;
  let fixture: ComponentFixture<FoodEmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodEmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
