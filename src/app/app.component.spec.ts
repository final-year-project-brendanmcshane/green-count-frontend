import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { DataService } from './data.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let dataServiceMock: any; // Mock version of the DataService

  beforeEach(async () => {
    // Set up spies for getData and addData methods
    dataServiceMock = {
      getData: jasmine.createSpy('getData'),
      addData: jasmine.createSpy('addData')
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent], // Since AppComponent is standalone
      providers: [
        provideHttpClientTesting(), // Mock HttpClient
        provideRouter([]),          // Provide empty router config
        { provide: DataService, useValue: dataServiceMock } // Inject mock DataService
      ]
    }).compileComponents();

    // Create the component and run initial change detection
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Ensure the component is successfully created
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // Check if the title is correctly set
  it('should have title "green-count"', () => {
    expect(component.title).toBe('green-count');
  });

  // Simulate a call to fetchData and verify that data is assigned
  it('should fetch data and assign it to component.data', () => {
    const mockResponse = { message: 'mock data' };

    // Simulate observable behavior
    dataServiceMock.getData.and.returnValue({
      subscribe: (cb: any) => cb(mockResponse)
    });

    component.fetchData();

    expect(dataServiceMock.getData).toHaveBeenCalled();           // Verify getData was called
    expect(component.data).toEqual(mockResponse);                 // Verify response was assigned
  });

  // Simulate addData() and check if console.log is called
  it('should call addData and log the response', () => {
    const mockResponse = { success: true };
    const consoleSpy = spyOn(console, 'log'); // Spy on console.log

    dataServiceMock.addData.and.returnValue({
      subscribe: (cb: any) => cb(mockResponse)
    });

    component.addData();

    expect(dataServiceMock.addData).toHaveBeenCalledWith({ id: 2 });      // Ensure addData was called with correct input
    expect(consoleSpy).toHaveBeenCalledWith('Data added:', mockResponse); // Ensure console.log happened
  });
});
