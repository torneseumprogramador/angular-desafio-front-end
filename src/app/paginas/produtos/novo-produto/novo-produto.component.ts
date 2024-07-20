import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { FormProdutoComponent } from '../form-produto/form-produto.component';

@Component({
  selector: 'app-novo-produto',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormProdutoComponent
  ],
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent {
  mensagem: string = ""

  constructor(
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  async criarProduto(produtoForm:Produto): Promise<void> {
    try{
      await this.produtoService.salvar(produtoForm);
      this.router.navigate(['/produtos']);
    }
    catch(e: any){
      this.mensagem = e.message
    }
  }
}
