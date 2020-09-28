import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';import { ToastyModule } from 'ng2-toasty';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MarcaRoutingModule } from './marca-routing.module';
import { MarcaComponent } from './marca.component';



@NgModule({
  imports: [
    CommonModule,
    MarcaRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [MarcaComponent]
})
export class MarcaModule { }
