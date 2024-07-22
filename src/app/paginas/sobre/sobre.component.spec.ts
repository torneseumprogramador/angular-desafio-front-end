import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SobreComponent } from './sobre.component';
import { ActivatedRoute } from '@angular/router';

describe('SobreComponent', () => {
  let component: SobreComponent;
  let fixture: ComponentFixture<SobreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SobreComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Quantidade de section', () => {
    const fixture = TestBed.createComponent(SobreComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let sections = compiled.querySelectorAll('section');
    expect(sections.length).toBe(2);
  });
});
