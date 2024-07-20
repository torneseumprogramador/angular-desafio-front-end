import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Produto } from '../../../models/produto';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.scss'
})
export class FormProdutoComponent {
  @Input() produto: Produto = {} as Produto;
  @Input() mensagemDeErro: string = "";
  @Output() submitForm = new EventEmitter<Produto>();
  produtoForm: FormGroup;

  @ViewChild('nomeInput') nomeInput!: ElementRef;
  @ViewChild('precoInput') precoInput!: ElementRef;
  @ViewChild('quantidadeEstoqueInput') quantidadeEstoqueInput!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      preco: [null, Validators.required],
      descricao: [''],
      quantidade_estoque: [null, Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['produto'] && changes['produto'].currentValue) {
      this.produtoForm.patchValue(this.produto);
    }
  }

  onSubmit() {
    this.mensagemDeErro = "";
    
    if (this.produtoForm.invalid) {
      this.mensagemDeErro = "Por favor, preencha todos os campos obrigatórios que estão com *.";
      
      // Focar no primeiro campo inválido
      for (const key of Object.keys(this.produtoForm.controls)) {
        if (this.produtoForm.get(key)?.invalid) {
          switch (key) {
            case 'nome':
              this.nomeInput.nativeElement.focus();
              break;
            case 'preco':
              this.precoInput.nativeElement.focus();
              break;
            case 'quantidade_estoque':
              this.quantidadeEstoqueInput.nativeElement.focus();
              break;
          }
          break;
        }
      }
      
      return;
    }

    this.submitForm.emit(this.produtoForm.value);
  }

}
