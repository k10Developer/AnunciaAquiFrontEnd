import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbDropdownModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';import { ToastyModule } from 'ng2-toasty';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AnuncioRoutingModule } from './anuncio-routing.module';
import { AnuncioComponent } from './anuncio.component';


@NgModule({
  imports: [
    CommonModule,
    AnuncioRoutingModule,
    SharedModule,
    NgbDropdownModule,
    NgbTabsetModule,
    ToastyModule.forRoot()
  ],
  declarations: [AnuncioComponent]
})
export class AnuncioModule { }
