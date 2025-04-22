import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InformationComponent } from './information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('InformationComponent', () => {
  let component: InformationComponent;
  let fixture: ComponentFixture<InformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InformationComponent, // ✅ it's standalone so we import it here
        HttpClientTestingModule,
        RouterTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the InformationComponent', () => {
    expect(component).toBeTruthy(); // sanity check – component should be made
  });

  it('should render a non-empty header', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const header = compiled.querySelector('h1, h2, h3');
    expect(header?.textContent?.trim().length).toBeGreaterThan(0); // header should not be blank
  });

  it('should display cards or informative content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBeGreaterThan(0); // checking at least 1 .card exists
  });

  it('should have at least one link to a useful resource', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].href).toContain('http'); // quick check for external links
  });
});
