import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsComponent } from './settings.component';
import { provideRouter } from '@angular/router';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsComponent],
      providers: [
        provideRouter([]) // satisfies RouterModule dependency
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Persisted settings should be read and applied on init
  it('should read persisted settings on init and apply them', () => {
    // stub localStorage.getItem
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      switch (key) {
        case 'enableDarkMode':    return 'true';
        case 'enableAnimations':  return 'false';
        default:                  return null;
      }
    });
    document.body.classList.remove('dark-mode', 'no-animations');

    component.ngOnInit();

    expect(component.enableDarkMode).toBeTrue();
    expect(component.enableAnimations).toBeFalse();
    expect(document.body.classList.contains('dark-mode')).toBeTrue();
    expect(document.body.classList.contains('no-animations')).toBeTrue();
  });

  // saveSettings() should persist to localStorage and re-apply
  it('saveSettings() should set localStorage and apply both settings', () => {
    component.enableDarkMode = true;
    component.enableAnimations = false;
    spyOn(localStorage, 'setItem');
    spyOn(component, 'applyDarkMode');
    spyOn(component, 'applyAnimations');

    component.saveSettings();

    expect(localStorage.setItem).toHaveBeenCalledWith('enableDarkMode', 'true');
    expect(localStorage.setItem).toHaveBeenCalledWith('enableAnimations', 'false');
    expect(component.applyDarkMode).toHaveBeenCalled();
    expect(component.applyAnimations).toHaveBeenCalled();
  });

  // applyDarkMode toggles the body.dark-mode class
  it('applyDarkMode() should add/remove .dark-mode on body', () => {
    document.body.classList.remove('dark-mode');

    component.enableDarkMode = true;
    component.applyDarkMode();
    expect(document.body.classList.contains('dark-mode')).toBeTrue();

    component.enableDarkMode = false;
    component.applyDarkMode();
    expect(document.body.classList.contains('dark-mode')).toBeFalse();
  });

  // applyAnimations toggles the body.no-animations class
  it('applyAnimations() should add/remove .no-animations on body', () => {
    document.body.classList.remove('no-animations');

    component.enableAnimations = false;
    component.applyAnimations();
    expect(document.body.classList.contains('no-animations')).toBeTrue();

    component.enableAnimations = true;
    component.applyAnimations();
    expect(document.body.classList.contains('no-animations')).toBeFalse();
  });

  it('toggleMenu() should toggle .show on offcanvasNav element', () => {
    const offcanvas = document.createElement('div');
    offcanvas.id = 'offcanvasNav';
    document.body.appendChild(offcanvas);
  
    // Force change detection AFTER adding the element
    fixture.detectChanges();
  
    // First toggle adds 'show'
    component.toggleMenu();
    expect(document.getElementById('offcanvasNav')!.classList.contains('show')).toBeTrue();
  
    // Second toggle removes 'show'
    component.toggleMenu();
    expect(document.getElementById('offcanvasNav')!.classList.contains('show')).toBeFalse();
  
    // Clean up
    document.body.removeChild(offcanvas);
  });
  


  // toggleMenu should not throw if element is missing
  it('toggleMenu() should not throw when offcanvasNav is absent', () => {
    document.getElementById('offcanvasNav')?.remove();
    expect(() => component.toggleMenu()).not.toThrow();
  });
});
