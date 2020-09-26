import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';
import { VeiculoRoutingModule } from './veiculo-routing.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VeiculoComponent } from './veiculo.component';

@NgModule({
  imports: [
    CommonModule,
    VeiculoRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [VeiculoComponent]
})
export class VeiculoModule { }
