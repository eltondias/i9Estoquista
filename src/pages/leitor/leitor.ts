import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { IncrementarPage } from '../incrementar/incrementar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

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
    private storage: Storage,
    private barcodeScanner: BarcodeScanner,
    public alertController: AlertController,
    ) {
  }

  ionViewDidLoad() {
    this.getEmpresa().then(() => {
        this.getProdutos();
    });
  }
  ionViewWillEnter() {
    // console.log('ativarScanner -  ionViewWillEnter')
  }



  buscarProduto() {
    this.produtoSelecionado = this.produtos.find( x => x.codbarra == this.codigoProduto);
    if (this.produtoSelecionado) {
      this.navCtrl.push(IncrementarPage, { produtoSelecionado:  this.produtoSelecionado });
    } else {
      this.showAlert('Produto não encontrado', 'verifique o código barras', ['OK']);
    }
  }

  async getProdutos(){
    this.produtos =  await this.storage.get('produtos_' + this.empresaSelecionada.cnpj);
  }

  async getEmpresa(){
    this.empresaSelecionada =  await this.storage.get('empresa');
  }

  ativarScanner() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.codigoProduto =  barcodeData.text;+
      this.buscarProduto();
      // this.showAlert('Código de barras', barcodeData.text, ['OK']);
     }).catch(err => {
         this.showAlert('Erro', err, ['OK']);
     });
  }

  showAlert(title, subTitle, buttons: any[]  ) {
    const alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

}
