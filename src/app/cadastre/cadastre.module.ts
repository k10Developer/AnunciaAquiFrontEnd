import { UserModule } from './user/user.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user/user-routing.module';
import {SharedModule} from '../theme/shared/shared.module';
import { ListUserComponent } from './list-user/list-user.component';
import { ListVeiculoModule } from './veiculo/list-veiculo/list-veiculo.module';
import { ListVeiculosComponent } from './veiculo/list-veiculo/list-veiculo.component';
import { VeiculoRoutingModule } from './veiculo/veiculos/veiculo-routing.module';
import { VeiculoModule } from './veiculo/veiculos/veiculo.module';
import { ListAnuncioComponent } from './anuncio/list-anuncio/list-anuncio.component';
import { AnuncioRoutingModule } from './anuncio/anuncio/anuncio-routing.module';
import { AnuncioModule } from './anuncio/anuncio/anuncio.module';
import { VendaRoutingModule } from './venda/venda-routing.module';
import { VendaModule } from './venda/venda.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { RelatorioRoutingModule } from './relatorio/relatorio-routing.module';
import { ListMarcaComponent } from './auxiliares/marca/list-marca/list-marca.component';
import { MarcaModule } from './auxiliares/marca/marca/marca.module';
import { ListModeloComponent } from './auxiliares/modelo/list-modelo/list-modelo.component';
import { ModeloModule } from './auxiliares/modelo/modelo/modelo.module';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    UserModule,
    VeiculoRoutingModule,
    VeiculoModule,
    AnuncioRoutingModule,
    AnuncioModule,
    VendaRoutingModule,
    VendaModule,
    UserRoutingModule,
    MarcaModule,
    ModeloModule,
    RelatorioRoutingModule,
    RelatorioModule,
    SharedModule

  ],
  declarations: [ListUserComponent,ListVeiculosComponent,ListAnuncioComponent,ListMarcaComponent,ListModeloComponent]
})
export class CadastreModule { }
