import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Global } from 'src/app/Shared/Global';
import { Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { MarcaService } from 'src/app/_services/marca.service';

@Component({
  selector: 'app-list-marca',
  templateUrl: './list-marca.component.html',
  styleUrls: ['./list-marca.component.scss']
})
export class ListMarcaComponent implements OnInit  {
  position: any
  marcas: any;
  data: any;
  // tslint:disable-next-line:no-inferrable-types
  displayTable: boolean = false;
  constructor(private _marcaService: MarcaService, 
              private router: Router, private _alertNotification: AlertNotificationService,
             ) { }

  ngOnInit() {
   this.get();
   }
  get(): void {
    this._marcaService.getTodos(Global.BASE_USER_ENDPOINT + "marca/v1/marcas")
    .subscribe(marcas => {      
      this.marcas = marcas;      
      this.displayTable = true;
    })     
  }

  create() {
    this.router.navigateByUrl('/marca',{state:{title : 'Nova Marca', btnTitle :  'Adicionar' ,dbop: DBOperation.create }})
  }
  update(id: string) {    
    const marca = this.marcas.filter(c => c.id === id)[0];
    this.router.navigateByUrl('/marca',{state:{title : 'Editar Marca', btnTitle :  'Editar' ,dbop: DBOperation.update, marca : marca }})
  }
  
  delete(id: string){
    this._alertNotification.confirm('Por favor confirme..', 'Deseja realizar essa operação?').
    then((confirmed) => {
      if(confirmed){
        this._marcaService.delete(Global.BASE_USER_ENDPOINT + "marca/v1/marcas", id)
        .subscribe(result => {  
          this._alertNotification.Notification(result.message, 'success');    
          this.get();
        }
        , error => {
          this._alertNotification.Notification(error, 'error');
        },
        )  
      }     
    });
    
  }

}
