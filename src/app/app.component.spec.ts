import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DataService } from './data.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Import the AppComponent as a standalone component
      imports: [AppComponent],
      providers: [
        // Mock HttpClient to avoid real HTTP requests
        provideHttpClientTesting(),

        // Provide empty router config to satisfy routing dependencies
        provideRouter([]),

        // Provide a mock DataService with dummy getData and addData methods
        {
          provide: DataService,
          useValue: {
            getData: () => ({ subscribe: () => {} }),
            addData: () => ({ subscribe: () => {} })
          }
        }
      ]
    }).compileComponents();

    // Create the component instance and trigger initial change detection
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Basic test to ensure the component is created successfully
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Verify that the title property is correctly set
  it('should have title "green-count"', () => {
    expect(component.title).toBe('green-count');
  });
});
