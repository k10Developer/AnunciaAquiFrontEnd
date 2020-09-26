import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/navigation/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import {NavigationItem} from './theme/layout/admin/navigation/navigation';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import {ToggleFullScreenDirective} from './theme/shared/full-screen/toggle-full-screen';
import {NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule, NgbModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import {ChatUserListComponent} from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import {ChatMsgComponent} from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { LoginComponent } from './authentication/login/login.component';
import { AlertNotificationService } from './_services/alert-notification.service';
import { AlertConfirmationComponent } from './Shared/alertConfirmation/alert-confimation';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { BasicAuthInterceptor } from './helpers/BasicAuthInteceptor';
import { ErrorInterceptor } from './helpers/ErrorInterceptor';
import { ToastyService, ToastyComponent, ToastyModule } from 'ng2-toasty';
import { VeiculoService } from './_services/veiculo.service';
import { MarcaService } from './_services/marca.service';
import { ModeloService } from './_services/modelo.service';
import { AnuncioService } from './_services/anuncio.service';
import { DatePipe } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      AdminComponent,
      AuthComponent,
      LoginComponent,
      NavigationComponent,
      NavLogoComponent,
      NavContentComponent,
      NavGroupComponent,
      NavCollapseComponent,
      NavItemComponent,
      NavBarComponent,
      ToggleFullScreenDirective,
      NavLeftComponent,
      NavSearchComponent,
      NavRightComponent,
      ChatUserListComponent,
      FriendComponent,
      ChatMsgComponent,
      ConfigurationComponent,
      AlertConfirmationComponent
   ],
   imports: [
      NgbModule.forRoot(),
      BrowserAnimationsModule,
      BrowserModule,
      ToastyModule.forRoot(),
      AppRoutingModule,
      SharedModule,      
      NgbDropdownModule,
      NgbTooltipModule,
      NgbButtonsModule,
      NgbTabsetModule,
      HttpClientModule,
      ReactiveFormsModule
   ],
   entryComponents: [AlertConfirmationComponent],
   providers: [
      NavigationItem,
      AuthService,
      UserService,
      AnuncioService,
      VeiculoService,
      DatePipe,
      MarcaService,
      ModeloService,
      ToastyService,
      AlertNotificationService,
      { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
