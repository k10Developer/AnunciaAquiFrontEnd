import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListModeloComponent } from './list-modelo.component';



const routes: Routes = [
  {
    path: '',
    component: ListModeloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListModeloRoutingModule { }
