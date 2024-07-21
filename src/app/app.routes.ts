import { Routes } from '@angular/router';
import { HomeComponent } from './paginas/home/home.component';
import { SobreComponent } from './paginas/sobre/sobre.component';
import { NaoEncontradoComponent } from './paginas/nao-encontrado/nao-encontrado.component';
import { LoginComponent } from './paginas/login/login.component';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [loginGuard] },
  { path: 'sobre', component: SobreComponent, canActivate: [loginGuard] },
  { path: 'produtos', loadComponent: () => import('./paginas/produtos/produtos.component').then(m => m.ProdutosComponent), canActivate: [loginGuard] },
  { path: 'produtos/novo', loadComponent: () => import('./paginas/produtos/novo-produto/novo-produto.component').then(m => m.NovoProdutoComponent), canActivate: [loginGuard] },
  { path: 'produtos/:id', loadComponent: () => import('./paginas/produtos/alterar-produto/alterar-produto.component').then(m => m.AlterarProdutoComponent), canActivate: [loginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NaoEncontradoComponent },
];