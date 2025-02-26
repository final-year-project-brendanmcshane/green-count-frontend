import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyEmissionsComponent } from './daily-emissions.component';

describe('DailyEmissionsComponent', () => {
  let component: DailyEmissionsComponent;
  let fixture: ComponentFixture<DailyEmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyEmissionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DailyEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
