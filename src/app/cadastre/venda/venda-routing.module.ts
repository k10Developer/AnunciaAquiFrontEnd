import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendaComponent } from './venda.component';



const routes: Routes = [
  {
    path: '',
    component: VendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule {  }
