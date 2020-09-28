import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { Modelo } from 'src/app/_models/modelo';
import { ModeloService } from 'src/app/_services/modelo.service';
import { MarcaService } from 'src/app/_services/marca.service';
import { Marca } from 'src/app/_models/marca';

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html'
})
export class ModeloComponent implements OnInit {
  position: any
  modelo: Modelo;
  marcas: Marca[];
  registerForm: FormGroup;
  modelos: Modelo[];
  public data: any;
  constructor(private router: Router,
             private _modeloService: ModeloService,
             private _marcaService: MarcaService,
             private _notificationService: AlertNotificationService,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();    
    if (this.data.dbop === DBOperation.create){
        this.getMarca(this.data.marca.id);
        var modelo = new Modelo();
        modelo.id = 0;
        modelo.descricao = null,
        modelo.marcaId = this.data.marca.id;
        this.registerForm.setValue(modelo);
     }
     else {   
      this.getMarca(this.data.modelo.marcaId);
       this.registerForm.setValue(this.data.modelo);
     }   
  }
  
  createForm() {
    this.registerForm = this.fb.group({
      id: [''],
      descricao: ['', Validators.required],
      marcaId: ['']     
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
      this.modelo = Object.assign({}, this.registerForm.value);
      this.modelo.id = 0;
      this._modeloService.create(Global.BASE_USER_ENDPOINT + "modelo/v1/Modelos",this.modelo).subscribe(result => {
        this._notificationService.Notification(result.message, 'success');
        this.router.navigate(['/modelos']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/modelos']);
      })
    }
  }
  update() {
    this.modelo = Object.assign({}, this.registerForm.value);
    this.modelo.id = this.data.modelo.id;
    this._modeloService.update(Global.BASE_USER_ENDPOINT + "modelo/v1/Modelos", this.modelo).subscribe(result => {
      this._notificationService.Notification(result.message, 'success');
      this.router.navigate(['/modelos']);
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      this.router.navigate(['/modelos']);
    })
  }

  getMarca(id: number){
      this._marcaService.getById(Global.BASE_USER_ENDPOINT + "marca/v1/marcas",id).subscribe(result => {
        if(result!=null){
          this.marcas = [result];
        }           
      }, error => {
       this._notificationService.Notification(error, 'error');
  }, () => {
    
  })     
    
  }
}
