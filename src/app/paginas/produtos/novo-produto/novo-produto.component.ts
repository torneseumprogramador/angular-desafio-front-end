import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Produto } from '../../../models/produto';
import { ProdutoService } from '../../../services/produto.service';

@Component({
  selector: 'app-novo-produto',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
})
export class NovoProdutoComponent {
  produtoForm: FormGroup;
  message: string = "";

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private router: Router
  ) {
    this.produtoForm = this.fb.group({
      nome: [''],
      preco: [null],
      descricao: [''],
      quantidade_estoque: [null]
    });
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

    try{
      await this.produtoService.salvar(produto);
      this.router.navigate(['/produtos']);
    }
    catch(e: any){
      this.message = e.message
    }
  }
}
