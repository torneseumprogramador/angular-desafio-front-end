import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';
import { FormProdutoComponent } from '../form-produto/form-produto.component';
import { NavComponent } from '../../../componentes/nav/nav.component';

@Component({
  selector: 'app-alterar-produto',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormProdutoComponent,
    NavComponent
  ],
  templateUrl: './alterar-produto.component.html',
  styleUrl: './alterar-produto.component.scss'
})
export class AlterarProdutoComponent {
  produto:Produto = {} as Produto
  mensagem: string = ""

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let produtoId:number = Number(this.route.snapshot.paramMap.get('id'));
    this.carregar(produtoId);
  }

  async carregar(produtoId: number): Promise<void> {
    this.produto = await this.produtoService.buscarPorId(produtoId);
  }

  async atualizarProduto(produtoForm:Produto): Promise<void> {
    try{
      produtoForm.id = this.produto.id
      await this.produtoService.salvar(produtoForm);
      this.router.navigate(['/produtos']);
    }
    catch(e: any){
      this.mensagem = e.message
    }
  }
}
