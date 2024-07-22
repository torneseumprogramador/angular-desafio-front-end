import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'test-id' } } } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deveria ter o app_nav incluido', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let app_nav = compiled.querySelector('app-nav');
    expect(app_nav).not.toBeNull();
  });

  it('Deveria ter o app_buscador incluido', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    let app_buscador = compiled.querySelector('app-buscador');
    expect(app_buscador).not.toBeNull();
  });

  it('Deveria ter o texto "Fully Responsive Design"', () => {
    // Arrage
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Act
    let texto = compiled.querySelector(".container-fluid h2")?.textContent;

    //Assert
    expect(texto).toBe("Fully Responsive Design");
  });
});
