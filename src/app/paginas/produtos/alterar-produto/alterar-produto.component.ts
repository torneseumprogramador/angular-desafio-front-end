import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-alterar-produto',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './alterar-produto.component.html',
  styleUrl: './alterar-produto.component.scss'
})
export class AlterarProdutoComponent {
  produtoForm: FormGroup;
  message: string = "";
  produto:Produto = {} as Produto

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produtoForm = this.fb.group({
      nome: [''],
      preco: [null],
      descricao: [''],
      quantidade_estoque: [null]
    });
  }

  ngOnInit(): void {
    let produtoId:number = Number(this.route.snapshot.paramMap.get('id'));
    this.carregar(produtoId);
  }

  async carregar(produtoId: number): Promise<void> {
    try{
      this.produto = await this.produtoService.buscarPorId(produtoId);
      this.produtoForm.get("nome")?.setValue(this.produto.nome)
      this.produtoForm.get("preco")?.setValue(this.produto.preco)
      this.produtoForm.get("descricao")?.setValue(this.produto.descricao)
      this.produtoForm.get("quantidade_estoque")?.setValue(this.produto.quantidade_estoque)
    }
    catch(e: any){
      this.message = e.message
    }
  }

  async onSubmit(): Promise<void> {
    this.message = "";
    if( this.produtoForm.get("nome")?.value == "" ){
      window.document.getElementById("nome")?.focus();
      this.message = "O nome não pode ser vazio";
      return;
    }

    if( this.produtoForm.get("preco")?.value == null){
      window.document.getElementById("preco")?.focus();
      this.message = "O preço não pode ser vazio";
      return;
    }

    if( this.produtoForm.get("quantidade_estoque")?.value == null){
      window.document.getElementById("quantidade_estoque")?.focus();
      this.message = "O quantidade em estoque não pode ser vazio";
      return;
    }

    let produto:Produto = this.produtoForm.value;
    produto.id = this.produto.id

    try{
      await this.produtoService.salvar(produto);
      this.router.navigate(['/produtos']);
    }
    catch(e: any){
      this.message = e.message
    }
  }
}
