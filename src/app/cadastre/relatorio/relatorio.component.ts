import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Global } from 'src/app/Shared/Global';
import { AlertNotificationService } from 'src/app/_services/alert-notification.service';
import { VendaService } from 'src/app/_services/vendas.service';
import { Relatorio } from 'src/app/_models/relatorio';
import { RelatorioVenda } from 'src/app/_models/relatorioVenda';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
// import { pdfMake } from 'pdfmake/build/pdfmake';
// import { pdfMake } from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
registerLocaleData(localePt);


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html'
})
export class RelatorioComponent implements OnInit {

  relatorio: Relatorio;
  registerForm: FormGroup;
  dataSource: RelatorioVenda[]; 
  public data: any;
  constructor(private router: Router,        
             private _vendaService: VendaService,
             private _notificationService: AlertNotificationService,
             private datePipe: DatePipe,
    private fb: FormBuilder) { 
      const nav = this.router.getCurrentNavigation();
      this.data = nav.extras.state;
    }

  ngOnInit() {
    this.createForm();  
        var relatorio = new relatorio();
        relatorio.dataInicial = null;
        relatorio.dataFim = null;
        this.registerForm.setValue(relatorio);          
  }
  
  createForm() {
    this.registerForm = this.fb.group({
      dataInicial:['',  Validators.required],
      dataFim:['',  Validators.required]   
     
   })
  }

  onSubmit(){
  
        this.gerar();   
  }

  gerar() {
    if (this.registerForm.valid) {
      this.relatorio = Object.assign({}, this.registerForm.value);
     
      this._vendaService.getVendaPorData(Global.BASE_USER_ENDPOINT + "venda/v1/Vendas",this.relatorio).subscribe(result => {
        this.dataSource = result; 
        this.imprimir(); 
      }, error => {
        this._notificationService.Notification(error, 'error');
      }, () => {       
      })
    }
  }
  
  imprimir(){
    var total = 0;
    this.dataSource.forEach(c=> total += c.lucro);
    var dd = {
      content: [       
        {
          columns:[
            [
              {text: [ {text:'Razão social: ',bold: true},'Kennedy LTDA']},
              {text: [ {text:'Endereço:       ',bold: true},'Rua da coias. cep: 74000-000']},
              {text: [ {text:'Site:                 ',bold: true},'www.kennedy.com']},
              {text: [ {text:'Telefone:        ',bold: true},'(62) 98193-5425']}
           ]
          ]  
        },
        {
          text: 'Vendas',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          layout:{
            fillColor: function (i, node) {
              return (i % 2 === 0) ?  '#EFEFFB' : null;
            }
          }, // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', '*', '*'],
  
            body: [
              [{
                fillColor: '#AFEEEE',
                text:'Veiculo',style: 'tableHeader',
                bold: true
               }, 
               {
                fillColor: '#AFEEEE',
                 text:'Data da Venda',style: 'tableHeader',
                 bold: true
               },   
               {
                fillColor: '#AFEEEE',
                 text:'Lucro',style: 'tableHeader',alignment:'right',bold: true
               },               
              ],
              ...this.dataSource.map(a=> {
                return [a.veiculo, this.datePipe.transform(a.dataDaVenda, 'dd/MM/yyyy'), {text:a.lucro.toLocaleString('pt-BR'), alignment:'right'}];
              }),
              [ { text: 'Total', bold: true },{text:""},{text:total.toLocaleString('pt-BR') , alignment:'right',bold: true}]
            ]
          }
        }
      ]
    };
  pdfMake.createPdf(dd).open();
  }
}
