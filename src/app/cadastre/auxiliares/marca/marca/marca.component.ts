import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { Marca } from 'src/app/_models/marca';
import { MarcaService } from 'src/app/_services/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html'
})
export class MarcaComponent implements OnInit {
  position: any
  marca: Marca;

  registerForm: FormGroup;
  marcas: Marca[];
  public data: any;
  constructor(private router: Router,
             private _marcaService: MarcaService,
             private _notificationService: AlertNotificationService,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();
    this.getMarcas();
    if (this.data.dbop === DBOperation.create){
        this.registerForm.reset();
     }
     else {   
       this.registerForm.setValue(this.data.marca);
     }   
  }
  
  createForm() {
    this.registerForm = this.fb.group({
      id: [''],
      descricao: ['', Validators.required]     
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
      this.marca = Object.assign({}, this.registerForm.value);
      this.marca.id = 0;
      this._marcaService.create(Global.BASE_USER_ENDPOINT + "marca/v1/Marcas",this.marca).subscribe(result => {
        this._notificationService.Notification(result.message, 'success');
        this.router.navigate(['/marcas']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/marcas']);
      })
    }
  }
  update() {
    this.marca = Object.assign({}, this.registerForm.value);
    this.marca.id = this.data.marca.id;
    this._marcaService.update(Global.BASE_USER_ENDPOINT + "marca/v1/Marcas", this.marca).subscribe(result => {
      this._notificationService.Notification(result.message, 'success');
      this.router.navigate(['/marcas']);
    }, error => {
      this._notificationService.Notification(error, 'error');
    }, () => {
      this.router.navigate(['/marcas']);
    })
  }

  getMarcas(){

      this._marcaService.getTodos(Global.BASE_USER_ENDPOINT + "marca/v1/marcas").subscribe(result => {
        this.marcas = result;
      }, error => {
       this._notificationService.Notification(error, 'error');
  }, () => {
    
  })     
    
  }
}
