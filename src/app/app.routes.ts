import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { SobreComponent } from './paginas/sobre/sobre.component';
import { NaoEncontradoComponent } from './paginas/nao-encontrado/nao-encontrado.component';
import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'login', component: LoginComponent },
  { path: 'produtos', loadComponent: () => import('./paginas/produtos/produtos.component').then(m => m.ProdutosComponent) },
  { path: '**', component: NaoEncontradoComponent },
];