import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.produtos = await this.produtoService.getProdutos();
    } catch (error) {
      console.error('Erro ao carregar produtos', error);
    }
  }
}
