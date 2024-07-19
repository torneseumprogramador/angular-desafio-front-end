import { Component } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
    RouterLink
  ],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(){
    this.carregar();
  }

  async carregar(): Promise<void>{
    try {
      this.produtos = await this.produtoService.getProdutos();
    } catch (error) {
      console.error('Erro ao carregar produtos', error);
    }
  }

  async apagar(produtoId: number): Promise<void>{
    if(window.confirm("Confirma?")){
      try {
        await this.produtoService.apagar(produtoId);
      } catch (error) {
        console.error('Erro ao carregar produtos', error);
      }
      
      this.carregar();
    }
  }
}
