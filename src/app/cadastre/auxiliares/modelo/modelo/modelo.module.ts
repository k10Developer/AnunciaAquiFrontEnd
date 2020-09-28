import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';import { ToastyModule } from 'ng2-toasty';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModeloRoutingModule } from './modelo-routing.module';
import { ModeloComponent } from './modelo.component';



@NgModule({
  imports: [
    CommonModule,
    ModeloRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [ModeloComponent]
})
export class ModeloModule { }
