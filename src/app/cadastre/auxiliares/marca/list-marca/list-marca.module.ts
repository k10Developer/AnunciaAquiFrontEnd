import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToastyModule} from 'ng2-toasty';
import { ListMarcaRoutingModule } from './list-marca-routing.module';
import { ListMarcaComponent } from './list-marca.component';

@NgModule({
  imports: [
    ListMarcaRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    ToastyModule.forRoot()
  ],
  declarations: [ListMarcaComponent]
})
export class ListMarcaModule { }
