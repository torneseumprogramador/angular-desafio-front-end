import { Component } from '@angular/core';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';
import { ProdutoService } from '../../services/produto.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    BuscadorComponent,
    DatePipe,
    RouterLink
  ],
  standalone: true,
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  titulo:string = "Opassss"

  produtos: any[] = [];

  constructor(private produtosService: ProdutoService) {
    console.log('ProdutosComponent has been loaded');
  }

  ngOnInit() {
    console.log('HomeComponent - ngOnInit has been loaded');
    this.carregar();
  }

  async carregar() {
    this.produtos = await this.produtosService.getProdutos();
  }

  editarProduto(produtoId:number) {
    window.alert("oi");
  }

  async excluirProduto(produtoId:number) {
    if(window.confirm("confirma?")){
      await this.produtosService.excluir(produtoId);
      await this.carregar();
    }
  }

}
