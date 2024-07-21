import { Component } from '@angular/core';
import { NavComponent } from '../../componentes/nav/nav.component';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.scss'
})
export class SobreComponent {

}
