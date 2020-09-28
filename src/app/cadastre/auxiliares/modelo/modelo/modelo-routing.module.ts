import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModeloComponent } from './modelo.component';



const routes: Routes = [
  {
    path: '',
    component: ModeloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModeloRoutingModule {  }
