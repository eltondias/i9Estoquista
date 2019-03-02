import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    this.empresaSelecionada = this.navParams.get('empresa');
    this.storage.get('produtos').then((produtos) => {
          this.produtos = produtos;
          // console.log(this.produtos);
    });

    this.leitorScanner();

  }

  buscarProduto() {
    this.produtoSelecionado = this.produtos.find( x => x.id == this.codigoProduto);
    console.log(this.produtos.find( x => x.id == this.codigoProduto)); 
  }


  leitorScanner() {
  }
  
}
