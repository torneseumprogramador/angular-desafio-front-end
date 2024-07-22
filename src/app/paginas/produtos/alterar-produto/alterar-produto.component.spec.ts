import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { AlterarProdutoComponent } from './alterar-produto.component';
import { NavComponent } from '../../../componentes/nav/nav.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormProdutoComponent } from '../form-produto/form-produto.component';

describe('AlterarProdutoComponent', () => {
  let component: AlterarProdutoComponent;
  let fixture: ComponentFixture<AlterarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AlterarProdutoComponent, 
        NavComponent,
        RouterLink,
        CommonModule,
        FormProdutoComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlterarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
