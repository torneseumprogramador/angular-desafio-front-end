import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { NovoProdutoComponent } from './novo-produto.component';
import { NavComponent } from '../../../componentes/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FormProdutoComponent } from '../form-produto/form-produto.component';

describe('NovoProdutoComponent', () => {
  let component: NovoProdutoComponent;
  let fixture: ComponentFixture<NovoProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NovoProdutoComponent,
        CommonModule,
        FormProdutoComponent,
        NavComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
