import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertConfirmationComponent } from '../Shared/alertConfirmation/alert-confimation';
import { ToastyService, ToastOptions, ToastData } from 'ng2-toasty';



@Injectable()
export class AlertNotificationService {

  // mensagem 
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'success';
  closeOther = false;


  constructor(private modalService: NgbModal,  private toastyService: ToastyService) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Sim',
    btnCancelText: string = 'Cancelar',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(AlertConfirmationComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }

  public Notification(msg: string, type: any){
    
    const toastOptions: ToastOptions = {
      title:'Nofiticação',
      msg: msg,
      // showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast: ToastData) => {
        /* added */
      },
      onRemove: (toast: ToastData) => {
        /* removed */
      }
    };
    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }


}
