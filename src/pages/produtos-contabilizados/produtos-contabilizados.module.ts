import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosContabilizadosPage } from './produtos-contabilizados';

@NgModule({
  declarations: [
    ProdutosContabilizadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosContabilizadosPage),
  ],
})
export class ProdutosContabilizadosPageModule {}
