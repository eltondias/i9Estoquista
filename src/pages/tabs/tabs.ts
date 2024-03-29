import { UtilProvider } from './../../providers/util/util';
import { SelecionarEmpresaPage } from './../selecionar-empresa/selecionar-empresa';
import { ProdutosContabilizadosPage } from './../produtos-contabilizados/produtos-contabilizados';
import { Component } from '@angular/core';
import { LeitorPage } from '../leitor/leitor';
import { NavParams, NavController } from 'ionic-angular';
import { ProdutosPage } from '../produtos/produtos';

 

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProdutosContabilizadosPage;
  tab2Root = LeitorPage;
  tab3Root = ProdutosPage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public util: UtilProvider 
  ) {

    if (this.navParams.get("page")) {
      this.tab1Root = this.navParams.get("page");
    }

    // this.util.atualizarTabsEmiter.subscribe( page => {
    //   console.log(page);
    //   this.tab1Root = page;
    // });

  }
}
