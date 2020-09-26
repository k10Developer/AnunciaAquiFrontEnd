import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAnuncioComponent } from './list-anuncio.component';


const routes: Routes = [
  {
    path: '',
    component: ListAnuncioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListAnuncioRoutingModule { }
