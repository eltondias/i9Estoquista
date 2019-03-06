import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IncrementarPage } from '../incrementar/incrementar';

@Component({
  selector: 'page-leitor',
  templateUrl: 'leitor.html'
})
export class LeitorPage {

  empresaSelecionada: any;
  produtos: any[];
  codigoProduto: any;
  produtoSelecionado: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage
    ) {
  }

  ionViewDidLoad() {
    this.getEmpresa().then(() => {
        this.getProdutos();
    });
  }

  buscarProduto() {
    this.produtoSelecionado = this.produtos.find( x => x.id == this.codigoProduto);
    if (this.produtoSelecionado) {
      this.navCtrl.push(IncrementarPage, { produtoSelecionado:  this.produtoSelecionado });
    }
  }

  async getProdutos(){
    this.produtos =  await this.storage.get('produtos_' + this.empresaSelecionada.cnpj);
  }

  async getEmpresa(){
    this.empresaSelecionada =  await this.storage.get('empresa');
  }

}
