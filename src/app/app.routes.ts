import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { SobreComponent } from './paginas/sobre/sobre.component';
import { NaoEncontradoComponent } from './paginas/nao-encontrado/nao-encontrado.component';
import { NovoComponent } from './paginas/produtos/novo/novo.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { AlterarComponent } from './paginas/produtos/alterar/alterar.component';
//import { LoginComponent } from './paginas/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre', component: SobreComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produtos/novo', component: NovoComponent },
  { path: 'produtos/:id', component: AlterarComponent },
  //{ path: 'login', component: LoginComponent },
  {
    path: 'login',
    loadComponent: () => import('./paginas/login/login.component').then(m => m.LoginComponent)
  },
  { path: '**', component: NaoEncontradoComponent },
];
