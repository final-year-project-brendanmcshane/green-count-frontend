import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmissionChatComponent } from './emission-chat.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('EmissionChatComponent', () => {
  let component: EmissionChatComponent;
  let fixture: ComponentFixture<EmissionChatComponent>;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [EmissionChatComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmissionChatComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send a message and receive AI response', () => {
    component.userMessage = 'Hello AI';
    component.sendMessage();

    // Simulate request sent to backend
    const req = httpMock.expectOne('http://127.0.0.1:5000/chat');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ message: 'Hello AI' });

    // Simulate response
    req.flush({ response: 'Hello human' });

    expect(component.messages.length).toBe(2);
    expect(component.messages[0].text).toBe('Hello AI');
    expect(component.messages[1].text).toBe('Hello human');
  });

  it('should not send empty messages', () => {
    component.userMessage = '   ';
    component.sendMessage();
    expect(component.messages.length).toBe(0);
  });

  it('should navigate to home', () => {
    component.goHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
