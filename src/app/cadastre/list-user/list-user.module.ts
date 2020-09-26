import { NgModule } from '@angular/core';
import { ListUserRoutingModule } from './list-user-routing.module';
import { ListUserComponent } from './list-user.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {ToastyModule} from 'ng2-toasty';
@NgModule({
  imports: [
    ListUserRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    DataTablesModule,
    ToastyModule.forRoot()
  ],
  declarations: [ListUserComponent]
})
export class ListUserModule { }
