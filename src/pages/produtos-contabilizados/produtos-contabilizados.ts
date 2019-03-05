import { IncrementarPage } from './../incrementar/incrementar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ProdutosContabilizadosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos-contabilizados',
  templateUrl: 'produtos-contabilizados.html',
})
export class ProdutosContabilizadosPage {

  produtosContabilizados: UsrProdutoEmpresa[] = [];
  cnpj: string;
  produtosEmpresa: any[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private storage: Storage
      ) {
  }

  ionViewDidLoad() {
    this.getCnpj().then( () => {
      this.getProdutosEmpresa();
      this.getProdutosContabilizados();
    });
  }

  async getCnpj(){
    this.cnpj =  await this.storage.get('cnpj');
  }

  async getProdutosEmpresa(){
    this.produtosEmpresa =  await this.storage.get('produtos_' + this.cnpj);
  }
  
  async getProdutosContabilizados() {
    this.produtosContabilizados =  await this.storage.get('produtosContabilizados_' + this.cnpj);
  }

  atualizarProduto(produto) {
    const  produtoSelecionado = this.produtosEmpresa.find( x => x.id == produto.produto.id);
    this.navCtrl.push(IncrementarPage, { produtoSelecionado:  produtoSelecionado });
    console.log(produto);
  }

}
