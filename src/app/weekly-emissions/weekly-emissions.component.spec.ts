import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyEmissionsComponent } from './weekly-emissions.component';

describe('WeeklyEmissionsComponent', () => {
  let component: WeeklyEmissionsComponent;
  let fixture: ComponentFixture<WeeklyEmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyEmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
