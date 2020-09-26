import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';import { ToastyModule } from 'ng2-toasty';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { RelatorioRoutingModule } from './relatorio-routing.module';
import { RelatorioComponent } from './relatorio.component';


@NgModule({
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [RelatorioComponent]
})
export class RelatorioModule { }
