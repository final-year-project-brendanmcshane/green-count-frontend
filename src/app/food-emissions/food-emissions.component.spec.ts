import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FoodEmissionsComponent } from './food-emissions.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FoodEmissionsComponent', () => {
  let component: FoodEmissionsComponent;
  let fixture: ComponentFixture<FoodEmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the standalone FoodEmissionsComponent for testing
      imports: [FoodEmissionsComponent],
      providers: [
        {
          // Provide a mocked ActivatedRoute for compatibility, even if unused
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            queryParams: of({}),
            paramMap: of({ get: () => null })  // mock get() for paramMap.get('someParam'), Safe default to prevent errors in tests
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodEmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
