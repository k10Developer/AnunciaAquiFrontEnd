import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Global } from 'src/app/Shared/Global';
import { Router } from '@angular/router';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { ModeloService } from 'src/app/_services/modelo.service';
import { MarcaService } from 'src/app/_services/marca.service';
import { Marca } from 'src/app/_models/marca';

@Component({
  selector: 'app-list-modelo',
  templateUrl: './list-modelo.component.html',
  styleUrls: ['./list-modelo.component.scss']
})
export class ListModeloComponent implements OnInit  {
  position: any
  modelos: any;
  marcas:any;
  marca:any;
  data: any;
  // tslint:disable-next-line:no-inferrable-types
  displayTable: boolean = false;
  constructor(
              private _modeloService: ModeloService, 
              private _marcaService: MarcaService, 
              private router: Router, private _alertNotification: AlertNotificationService,
             ) { }

  ngOnInit() {
   this.getMarca();
   this.get();
   }
  getMarca() {
    this._marcaService.getTodos(Global.BASE_USER_ENDPOINT + "marca/v1/marcas")
    .subscribe(marcas => {      
      this.marcas = marcas;      
      this.displayTable = true;
    })   
  }
  get(): void {
    this._modeloService.getTodos(Global.BASE_USER_ENDPOINT + "modelo/v1/modelos")
    .subscribe(modelos => {      
      this.modelos = modelos;      
      this.displayTable = true;
    })     
  }

  create() {
    const marca = this.marca;
    this.router.navigateByUrl('/modelo',{state:{title : 'Nova Modelo', btnTitle :  'Adicionar' ,dbop: DBOperation.create, marca: marca }})
  }
  update(id: string) {    
    const modelo = this.modelos.filter(c => c.id === id)[0];
    this.router.navigateByUrl('/modelo',{state:{title : 'Editar Modelo', btnTitle :  'Editar' ,dbop: DBOperation.update, modelo : modelo }})
  }

  setMarca(id:any){
      const m = this.marcas.filter(c => c.id ===  Number(id))[0];
      this.marca = m;
      if(this.marca == undefined)
          this.get();
      else
         this.getModelosPelaMarca();     
  }
  getModelosPelaMarca(){
    this._modeloService.getByMarcaId(Global.BASE_USER_ENDPOINT + "modelo/v1/modelos/marca",this.marca.id)
    .subscribe(modelos => {      
      this.modelos = modelos;      
      this.displayTable = true;
    })    
  }
  delete(id: string){
    this._alertNotification.confirm('Por favor confirme..', 'Deseja realizar essa operação?').
    then((confirmed) => {
      if(confirmed){
        this._modeloService.delete(Global.BASE_USER_ENDPOINT + "modelo/v1/modelos", id)
        .subscribe(result => {  
          this._alertNotification.Notification(result.message, 'success'); 
          if(this.marca!=undefined)
              this.getModelosPelaMarca(); 
          else
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
