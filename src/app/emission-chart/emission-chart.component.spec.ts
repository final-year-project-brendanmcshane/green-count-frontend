import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionChartComponent } from './emission-chart.component';

describe('EmissionChartComponent', () => {
  let component: EmissionChartComponent;
  let fixture: ComponentFixture<EmissionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
