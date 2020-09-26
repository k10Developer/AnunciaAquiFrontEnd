import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Global } from 'src/app/Shared/Global';
import { Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { VeiculoService } from 'src/app/_services/veiculo.service';
import { AnuncioService } from 'src/app/_services/anuncio.service';

@Component({
  selector: 'app-list-anuncio',
  templateUrl: './list-anuncio.component.html',
  styleUrls: ['./list-anuncio.component.scss']
})
export class ListAnuncioComponent implements OnInit  {
  position: any
  anuncios: any;
  data: any;
  // tslint:disable-next-line:no-inferrable-types
  displayTable: boolean = false;
  constructor(private _anuncioService: AnuncioService, 
              private router: Router, private _alertNotification: AlertNotificationService,
             ) { }

  ngOnInit() {
   this.get();
   }
  get(): void {
    this._anuncioService.getTodos(Global.BASE_USER_ENDPOINT + "anuncio/v1/anuncios")
    .subscribe(anuncios => {      
      this.anuncios = anuncios;      
      this.displayTable = true;
    })     
  }

  create() {
    this.router.navigateByUrl('/anuncio',{state:{title : 'Novo Anúncio', btnTitle :  'Adicionar' ,dbop: DBOperation.create }})
  }
  update(id: string) {    
    const anuncio = this.anuncios.filter(c => c.id === id)[0];
    this.router.navigateByUrl('/anuncio',{state:{title : 'Editar Anúncio', btnTitle :  'Editar' ,dbop: DBOperation.update, anuncio : anuncio }})
  }
  vender(id: string) {
     const venda = this.anuncios.filter(c => c.id === id)[0];
     this.router.navigateByUrl('/venda',{state:{title : 'Venda', btnTitle :  'Finalizar' ,dbop: DBOperation.create, venda : venda }})
  }
  delete(id: string){
    this._alertNotification.confirm('Por favor confirme..', 'Deseja realizar essa operação?').
    then((confirmed) => {
      if(confirmed){
        this._anuncioService.delete(Global.BASE_USER_ENDPOINT + "anuncio/v1/anuncios", id)
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
