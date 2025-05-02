import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipOfTheDayComponent } from './tip-of-the-day.component';
import { By } from '@angular/platform-browser';

describe('TipOfTheDayComponent', () => {
  let component: TipOfTheDayComponent;
  let fixture: ComponentFixture<TipOfTheDayComponent>;

  // Configure the testing module and create a fresh instance of the component before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipOfTheDayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TipOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit calls getNewTip once', () => {
    spyOn(component, 'getNewTip');
    component.ngOnInit();
    expect(component.getNewTip).toHaveBeenCalled();
  });

  // Ensures getNewTip goes through each tip once before repeating any, simulating tip rotation
  it('getNewTip cycles through all tips without repetition then resets', () => {
    const tips: any[] = (component as any).tips;
    // wipe out any tip that ran in ngOnInit
    (component as any).usedIndices.clear();

    const seen = new Set<string>();
    for (let i = 0; i < tips.length; i++) {
      component.getNewTip();
      seen.add(component.currentTip.title);
    }
    expect(seen.size).toBe(tips.length, 'should show each tip exactly once');

    // now we've exhausted the list; next call should reset and still pick one of them
    component.getNewTip();
    expect(seen.has(component.currentTip.title)).toBeTrue();
  });

  it('getCategoryClass returns correct CSS classes', () => {
    expect(component.getCategoryClass('Energy')).toBe('bg-warning text-dark');
    expect(component.getCategoryClass('transport')).toBe('bg-info text-dark');
    expect(component.getCategoryClass('Food')).toBe('bg-success text-white');
    expect(component.getCategoryClass('Waste')).toBe('bg-danger text-white');
    expect(component.getCategoryClass('Water')).toBe('bg-primary text-white');
    expect(component.getCategoryClass('Shopping')).toBe('bg-secondary text-white');
    expect(component.getCategoryClass('Unknown')).toBe('bg-light text-dark');
  });

  it('should render currentTip title, description, category badge and impact', () => {
    component.currentTip = {
      title: 'Test Tip',
      description: 'This is a test.',
      category: 'Food',
      impact: 'Low'
    };
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css('.card-body h5')).nativeElement;
    expect(titleEl.textContent).toContain('Test Tip');

    const descEl = fixture.debugElement.query(By.css('.card-body p')).nativeElement;
    expect(descEl.textContent).toContain('This is a test.');

    const badgeEl = fixture.debugElement.query(By.css('.badge')).nativeElement;
    expect(badgeEl.textContent).toContain('Food');

    const impactEl = fixture.debugElement.query(By.css('small.text-muted')).nativeElement;
    expect(impactEl.textContent).toContain('Impact: Low');
  });

  // Simulates a user clicking the button and confirms the method to load a new tip is triggered
  it('clicking "Show another tip" button triggers getNewTip()', () => {
    spyOn(component, 'getNewTip');
    const btn = fixture.debugElement.query(By.css('button')).nativeElement;
    btn.click();
    expect(component.getNewTip).toHaveBeenCalled();
  });
});
