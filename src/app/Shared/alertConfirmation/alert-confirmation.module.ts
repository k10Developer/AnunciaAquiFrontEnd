import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbPopoverModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { AlertConfirmationComponent } from './alert-confimation';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbPopoverModule,
    NgbTooltipModule
  ],
  declarations: [AlertConfirmationComponent]
})
export class AlertConfirmation { }
