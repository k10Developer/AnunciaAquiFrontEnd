import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToastyModule} from 'ng2-toasty';
import { ListModeloRoutingModule } from './list-modelo-routing.module';
import { ListModeloComponent } from './list-modelo.component';


@NgModule({
  imports: [
    ListModeloRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    ToastyModule.forRoot()
  ],
  declarations: [ListModeloComponent]
})
export class ListModeloModule { }
