import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './authentication/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './cadastre/list-user/list-user.module#ListUserModule'
      },
      {
        path: 'user',
        loadChildren: './cadastre/user/user.module#UserModule'
      },
      {
        path: 'veiculos',
        loadChildren: './cadastre/veiculo/list-veiculo/list-veiculo.module#ListVeiculoModule'
      },
      {
        path: 'veiculo',
        loadChildren: './cadastre/veiculo/veiculos/veiculo.module#VeiculoModule'
      },
      {
        path: 'anuncios',
        loadChildren: './cadastre/anuncio/list-anuncio/list-anuncio.module#ListAnuncioModule'
      },
      {
        path: 'anuncio',
        loadChildren: './cadastre/anuncio/anuncio/anuncio.module#AnuncioModule'
      },
      {
        path: 'venda',
        loadChildren: './cadastre/venda/venda.module#VendaModule'
      },
      {
        path: 'relatorio',
        loadChildren: './cadastre/relatorio/relatorio.module#RelatorioModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }
    ]
  }, 
  {
    path: 'login',
    component: LoginComponent,
    children: [
      {
        path: 'login',
        loadChildren: './authentication/login/login.module#LoginModule'
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
