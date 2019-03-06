import { SelecionarEmpresaPage } from './../selecionar-empresa/selecionar-empresa';
import { ProdutosContabilizadosPage } from './../produtos-contabilizados/produtos-contabilizados';
import { Component } from '@angular/core';
import { LeitorPage } from '../leitor/leitor';
import { NavParams, NavController } from 'ionic-angular';

 

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProdutosContabilizadosPage;
  tab2Root = LeitorPage;
  tab3Root = SelecionarEmpresaPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {

    // if (this.navParams.get("page")) {
    //   this.tab1Root = this.navParams.get("page");
    // }

  }
}
