import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { Global } from 'src/app/Shared/Global';
import { Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { VeiculoService } from 'src/app/_services/veiculo.service';

@Component({
  selector: 'app-list-veiculo',
  templateUrl: './list-veiculo.component.html',
  styleUrls: ['./list-veiculo.component.scss']
})
export class ListVeiculosComponent implements OnInit  {
  position: any
  veiculos: any;
  data: any;
  // tslint:disable-next-line:no-inferrable-types
  displayTable: boolean = false;
  constructor(private _veiculoService: VeiculoService, 
              private router: Router, private _alertNotification: AlertNotificationService,
             ) { }

  ngOnInit() {
   this.get();
   }
  get(): void {
    this._veiculoService.getTodos(Global.BASE_USER_ENDPOINT + "veiculo/v1/Veiculos")
    .subscribe(veiculos => {      
      this.veiculos = veiculos;      
      this.displayTable = true;
    })     
  }

  create() {
    this.router.navigateByUrl('/veiculo',{state:{title : 'Novo Veículo', btnTitle :  'Adicionar' ,dbop: DBOperation.create }})
  }
  update(id: string) {    
    const veiculo = this.veiculos.filter(c => c.id === id)[0];
    this.router.navigateByUrl('/veiculo',{state:{title : 'Editar Veículo', btnTitle :  'Editar' ,dbop: DBOperation.update, veiculo : veiculo }})
  }
  delete(id: string){
    this._alertNotification.confirm('Por favor confirme..', 'Deseja realizar essa operação?').
    then((confirmed) => {
      if(confirmed){
        this._veiculoService.delete(Global.BASE_USER_ENDPOINT + "veiculo/v1/Veiculos", id)
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
