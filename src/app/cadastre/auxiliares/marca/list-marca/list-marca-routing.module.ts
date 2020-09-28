import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMarcaComponent } from './list-marca.component';


const routes: Routes = [
  {
    path: '',
    component: ListMarcaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListMarcaRoutingModule { }
