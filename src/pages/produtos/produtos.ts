import { ApiEmpresaProvider } from './../../providers/api-empresa/api-empresa';
import { ApiProdutoEmpresaProvider } from './../../providers/api-produto-empresa/api-produto-empresa';
import { IncrementarPage } from './../incrementar/incrementar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProdutosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  produtosContabilizados: UsrProdutoEmpresa[] = [];
  cnpj: string;
  cpf: string;
  produtosEmpresa: any[];

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private storage: Storage,
      private app: App,
      private api: ApiProdutoEmpresaProvider,
      public alertController: AlertController,
      public loadingCtrl: LoadingController,
      public apiEmpresa: ApiEmpresaProvider,
      ) {
  }

  ionViewWillEnter() {
    // this.inicializar();
  }

  ionViewDidLoad() {
    this.inicializar();
  }


  async getCnpj(){
    this.cnpj =  await this.storage.get('cnpj');
  }

  async getProdutosEmpresa(){
    this.produtosEmpresa =  await this.storage.get('produtos_' + this.cnpj);
    console.log(this.produtosEmpresa );
    // this.api.getListaProdutos( this.cpf,this.cnpj ).subscribe(produtos => {
    //   // this.produtosEmpresa = <UsrProdutoEmpresa[]>produtos;
    // });
  }
  
 

  inicializar(){
    this.getCnpj().then( () => {
      this.getProdutosEmpresa();
    });
  }

  atualizarProduto(produto) {
    const  produtoSelecionado = this.produtosEmpresa.find( x => x.id == produto.id);
    this.navCtrl.push(IncrementarPage, { produtoSelecionado:  produtoSelecionado });
    console.log(produto);
  }


  showAlert(title, subTitle, buttons: any[]  ) {
    const alert = this.alertController.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }

  loading(mensagem, duracao): Loading {
    const loader = this.loadingCtrl.create({
      content: mensagem,
      duration: duracao
    });
    loader.present();
    return loader;
  }


  sincronizarProdutos() {
    const loading = this.loading("Carregando produtos...", 30000000);
    this.apiEmpresa.getProdutosEmpresa(this.cnpj).subscribe( (produtos: any[]) => {
      loading.dismiss();
      this.storage.set('produtos_' + this.cnpj, produtos); 
      this.inicializar();   
    });
 }

}
