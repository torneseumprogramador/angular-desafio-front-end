import { Component } from '@angular/core';
import { BuscadorComponent } from '../../componentes/buscador/buscador.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BuscadorComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
