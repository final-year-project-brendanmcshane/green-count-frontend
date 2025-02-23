import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmissionChatComponent } from './emission-chat.component';

describe('EmissionChatComponent', () => {
  let component: EmissionChatComponent;
  let fixture: ComponentFixture<EmissionChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmissionChatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmissionChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
