import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import {SharedModule} from '../../theme/shared/shared.module';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { ToastyModule } from 'ng2-toasty';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [UserComponent]
})
export class UserModule { }
