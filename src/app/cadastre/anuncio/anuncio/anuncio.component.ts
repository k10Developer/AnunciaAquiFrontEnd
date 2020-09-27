import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { Anuncio } from 'src/app/_models/anuncio';
import { AnuncioService } from 'src/app/_services/anuncio.service';
import { MarcaService } from 'src/app/_services/marca.service';
import { ModeloService } from 'src/app/_services/modelo.service';
import { Modelo } from 'src/app/_models/modelo';
import { Marca } from 'src/app/_models/marca';
import { Veiculo } from 'src/app/_models/veiculo';
import { VeiculoService } from 'src/app/_services/veiculo.service';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html'
})
export class AnuncioComponent implements OnInit {
  position: any
  anuncio: Anuncio;
  veiculos: Veiculo[];
  types = [];
  registerForm: FormGroup;
  modelos: Modelo[];
  marcas: Marca[];
  modeloId: number;
  public data: any;
  constructor(private router: Router,
             private _anuncioService: AnuncioService,
             private _veiculos: VeiculoService,
             private _notificationService: AlertNotificationService,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();
    this.getVeiculos();
    if (this.data.dbop === DBOperation.create){
        this.registerForm.reset();
     }
     else {   
       this.registerForm.setValue(this.data.anuncio);
     }   
  }
  
  createForm() {
    this.registerForm = this.fb.group({
      id: [''],
      veiculoId: ['', Validators.required],
      detalhesVeiculo:[''],
      titulo: ['', Validators.required],
      descricao: ['', Validators.required],
      dataDeCriacaoDoAnuncio: [''],
      valor: ['', Validators.required],   
      ativo: true,
      finalizar: ['']
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
      this.anuncio = Object.assign({}, this.registerForm.value); 
     this.validarAnuncio();
      this._anuncioService.create(Global.BASE_USER_ENDPOINT + "anuncio/v1/Anuncios",this.anuncio).subscribe(result => {
        this._notificationService.Notification(result.message, 'success');
        this.router.navigate(['/anuncios']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/anuncios']);
      })
    }
  }
  validarAnuncio(){
    this.anuncio.id = 0;
    this.anuncio.valor = Number(this.anuncio.valor);
    var veiculo = this.veiculos.filter(c=> c.id == this.anuncio.veiculoId);
    this.anuncio.detalhesVeiculo =  `Marca: ${veiculo[0].marcaDescricao} Modelo: ${veiculo[0].modeloDescricao} Palca: ${veiculo[0].placa} Ano: ${veiculo[0].ano}`;
    this.anuncio.ativo = this.anuncio.ativo?true:false;
  }
  update() {
    this.anuncio = Object.assign({}, this.registerForm.value);
    this.validarAnuncio();
    this.anuncio.id = this.data.anuncio.id;
    this.anuncio.dataDeCriacaoDoAnuncio = this.data.anuncio.dataDeCriacaoDoAnuncio;
    this._anuncioService.update(Global.BASE_USER_ENDPOINT + "anuncio/v1/Anuncios", this.anuncio).subscribe(result => {
      this._notificationService.Notification(result.message, 'success');
      this.router.navigate(['/anuncios']);
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      this.router.navigate(['/anuncios']);
    })
  }

  getVeiculos(){
    if(this.data.dbop === DBOperation.create){
      this._veiculos.getTodosSemVinculo(Global.BASE_USER_ENDPOINT + "veiculo/v1/veiculos/semvinculo").subscribe(result => {
        this.veiculos = result;
  }, error => {
    this._notificationService.Notification(error, 'error');
  }, () => {
    
  })  
    }else{
      this._veiculos.getTodos(Global.BASE_USER_ENDPOINT + "veiculo/v1/veiculos").subscribe(result => {
        this.veiculos = result;
  }, error => {
    this._notificationService.Notification(error, 'error');
  }, () => {
    
  })  
    }
    
  }
}
