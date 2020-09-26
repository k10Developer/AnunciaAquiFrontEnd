import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';import { ToastyModule } from 'ng2-toasty';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VendaRoutingModule } from './venda-routing.module';
import { VendaComponent } from './venda.component';

@NgModule({
  imports: [
    CommonModule,
    VendaRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [VendaComponent]
})
export class VendaModule { }
