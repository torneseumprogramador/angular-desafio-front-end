import { Component } from '@angular/core';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BuscadorComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  titulo:string = "Opassss"
  produtos: any[] = [];

  constructor(private produtosService: ProdutoService) {
    console.log('HomeComponent has been loaded');
  }
}
