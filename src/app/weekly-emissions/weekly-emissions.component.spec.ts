import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyEmissionsComponent } from './weekly-emissions.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('WeeklyEmissionsComponent', () => {
  let component: WeeklyEmissionsComponent;
  let fixture: ComponentFixture<WeeklyEmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyEmissionsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ]
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
