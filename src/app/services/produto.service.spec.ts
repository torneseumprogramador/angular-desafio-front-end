import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProdutoService } from './produto.service';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(ProdutoService);
  });

  it('deveria ter uma instancia criada para o serviço de produto', () => {
    expect(service).toBeTruthy();
  });

  it('Se na instancia do produtoService existe o método getProdutos', async () => {
    expect(service.getProdutos).toBeTruthy();
  });

  it('Se na instancia do produtoService existe o método salvar', async () => {
    expect(service.salvar).toBeTruthy();
  });

  it('Se na instancia do produtoService existe o método buscarPorId', async () => {
    expect(service.buscarPorId).toBeTruthy();
  });

  it('Se na instancia do produtoService existe o método apagar', async () => {
    expect(service.apagar).toBeTruthy();
  });

});
