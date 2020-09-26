import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToastyModule} from 'ng2-toasty';
import { ListAnuncioComponent } from './list-anuncio.component';
import { ListAnuncioRoutingModule } from './list-anuncio-routing.module';
@NgModule({
  imports: [
    ListAnuncioRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    ToastyModule.forRoot()
  ],
  declarations: [ListAnuncioComponent]
})
export class ListAnuncioModule { }
