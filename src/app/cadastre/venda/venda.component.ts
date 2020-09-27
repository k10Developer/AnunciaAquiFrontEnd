import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { DBOperation } from 'src/app/Shared/DBOperation';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { MarcaService } from 'src/app/_services/marca.service';
import { ModeloService } from 'src/app/_services/modelo.service';
import { Modelo } from 'src/app/_models/modelo';
import { Marca } from 'src/app/_models/marca';
import { Veiculo } from 'src/app/_models/veiculo';
import { VeiculoService } from 'src/app/_services/veiculo.service';
import { Venda } from 'src/app/_models/venda';
import { Anuncio } from 'src/app/_models/anuncio';
import { VendaService } from 'src/app/_services/vendas.service';
import { VendaAnuncio } from 'src/app/_models/vendaAnuncio';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html'
})
export class VendaComponent implements OnInit {
  position: any;
  venda: Venda;
  anuncios: Anuncio[];
  types = [];
  registerForm: FormGroup;
  modelos: Modelo[];
  marcas: Marca[];
  modeloId: number;
  write:boolean;
  public data: any;
  constructor(private router: Router,        
             private _vendaService: VendaService,
             private _notificationService: AlertNotificationService,             
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();
        var vendaAnuncio = new VendaAnuncio();
        vendaAnuncio.detalheVeiculo = this.data.venda.detalhesVeiculo;
        vendaAnuncio.titulo = this.data.venda.titulo;
        vendaAnuncio.descricao = this.data.venda.descricao;
        vendaAnuncio.valor = this.data.venda.valor;        

        if (this.data.dbop === DBOperation.create){
          vendaAnuncio.detalheAnuncio = "";
          vendaAnuncio.valorDeVenda = 0;
          this.write = true;
          this.registerForm.setValue(vendaAnuncio);
        }else{
          this._vendaService.getVendaPorAnuncioId(Global.BASE_USER_ENDPOINT + "venda/v1/Vendas/Anuncio",this.data.venda.id).subscribe(result => {
            vendaAnuncio.detalheAnuncio = result.detalheAnuncio;
            vendaAnuncio.valorDeVenda = result.valorDeVenda;
            this.write = false;
            this.registerForm.setValue(vendaAnuncio);
          }, error => {
            this._notificationService.Notification(error, 'error');
          }, () => {          
          })
        }      
       
     }      
  
  createForm() {
    this.registerForm = this.fb.group({
      titulo:[''],
      descricao:[''],      
      detalheAnuncio:['', Validators.required],
      detalheVeiculo:[''],
      valor:[''],
      valorDeVenda: ['', Validators.required]
   })
  }

  onSubmit(){
  if(this.data.dbop === DBOperation.create)
        this.new();   
   else{
          this.router.navigate(['/anuncios']);
      }
  }

  new() {
    if (this.registerForm.valid) {
      this.venda = Object.assign({}, this.registerForm.value); 
     var venda = this.validarVenda();
      this._vendaService.create(Global.BASE_USER_ENDPOINT + "venda/v1/Vendas",venda).subscribe(result => {
        this._notificationService.Notification(result.message, 'success');
        this.router.navigate(['/anuncios']);
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {
        this.router.navigate(['/anuncios']);
      })
    }
  }
  validarVenda():Venda{
    var venda = new Venda();
    venda.anuncioId = this.data.venda.id,
    venda.id = 0;
    venda.ativo = true;
    venda.detalheAnuncio = this.venda.detalheAnuncio;
    venda.valorDeVenda = this.venda.valorDeVenda;
    return venda;    
  }  
  
}
