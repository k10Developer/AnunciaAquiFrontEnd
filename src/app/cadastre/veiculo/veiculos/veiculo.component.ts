import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { CompanySummaryInformation } from 'src/app/_models/companySummaryInformation';
import { UserCompany } from 'src/app/_models/userCompany';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { Veiculo } from 'src/app/_models/veiculo';
import { VeiculoService } from 'src/app/_services/veiculo.service';
import { MarcaService } from 'src/app/_services/marca.service';
import { ModeloService } from 'src/app/_services/modelo.service';
import { Modelo } from 'src/app/_models/modelo';
import { Marca } from 'src/app/_models/marca';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html'
})
export class VeiculoComponent implements OnInit {
  position: any
  veiculo: Veiculo;
  types = [];
  registerForm: FormGroup;
  modelos: Modelo[];
  marcas: Marca[];
  modeloId: number;
  public data: any;
  constructor(private router: Router,
             private _veiculoService: VeiculoService,
             private _marcaService: MarcaService,
             private _modeloService: ModeloService,
             private _notificationService: AlertNotificationService,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();
    this.getMarca();
    if (this.data.dbop === DBOperation.create){
        this.registerForm.reset();
     }
     else {
       this.getModelo(this.data.veiculo.marcaId);
       this.registerForm.setValue(this.data.veiculo);
     }   
  }
  
  createForm() {
    this.registerForm = this.fb.group({
      id: [''],
      marcaId: ['', Validators.required],
      marcaDescricao:[''],
      modeloId: ['', Validators.required],
      modeloDescricao: [''],
      placa: ['', Validators.required],
      ano: ['', Validators.required],
      cor: ['', Validators.required],
      tipoCombustivel: ['', Validators.required],
      valorDeCompra: ['', Validators.required],   
      ativo: true
   })
  }

  onSubmit(){
    if (this.data.dbop === DBOperation.create){
        this.new();
    }    
    else if(this.data.dbop === DBOperation.update){
      this.update();
    }
        
  }

  new() {
    if (this.registerForm.valid) {
      this.veiculo = Object.assign({}, this.registerForm.value); 
     this.validarVeiculo();
      this._veiculoService.create(Global.BASE_USER_ENDPOINT + "veiculo/v1/Veiculos",this.veiculo).subscribe(result => {
        this._notificationService.Notification(result.message, 'success');
        this.router.navigate(['/veiculos']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/veiculos']);
      })
    }
  }
  validarVeiculo(){
    this.veiculo.id = 0;
    this.veiculo.ano = Number(this.veiculo.ano);
    this.veiculo.valorDeCompra = Number(this.veiculo.valorDeCompra);
    var marca = this.marcas.filter(c=> c.id == this.veiculo.marcaId);
    this.veiculo.marcaDescricao = marca[0].descricao;
    var modelo = this.modelos.filter(c=> c.id == this.veiculo.modeloId);
    this.veiculo.modeloDescricao = modelo[0].descricao;
    this.veiculo.ativo = this.veiculo.ativo?true:false;
  }
  update() {
    this.veiculo = Object.assign({}, this.registerForm.value);
    this.validarVeiculo();
    this.veiculo.id = this.data.veiculo.id;
    this._veiculoService.update(Global.BASE_USER_ENDPOINT + "veiculo/v1/Veiculos", this.veiculo).subscribe(result => {
      this._notificationService.Notification(result.message, 'success');
      this.router.navigate(['/veiculos']);
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      this.router.navigate(['/veiculos']);
    })
  }
  getCor(){
   return Global.GetCor();
  }
  getCombustivel(){
    return Global.GetTipoCombustivel();
  }
  changed(e){
    var idModelo = e.target.value.toString().split(':');
    this.getModelo(idModelo[0]);
}
  getModelo(id:string){
    // var idModelo = id.split(':');
    this._modeloService.getByMarcaId(Global.BASE_USER_ENDPOINT + "modelo/v1/Modelos/Marca",id).subscribe(result => {
         this.modelos = result;
       }, error => {
          this._notificationService.Notification(error, 'error');
       }, () => {
          
          }) 
        }
  
  getMarca(){
    this._marcaService.getTodos(Global.BASE_USER_ENDPOINT + "marca/v1/marcas").subscribe(result => {
          this.marcas = result;
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      
    })  
  }
}
