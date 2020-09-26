import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToastyModule} from 'ng2-toasty';
import { ListVeiculosRoutingModule } from './list-veiculo-routing.module';
import { ListVeiculosComponent } from './list-veiculo.component';
@NgModule({
  imports: [
    ListVeiculosRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    ToastyModule.forRoot()
  ],
  declarations: [ListVeiculosComponent]
})
export class ListVeiculoModule { }
