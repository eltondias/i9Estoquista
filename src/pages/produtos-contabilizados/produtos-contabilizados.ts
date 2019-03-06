import { ApiProdutoEmpresaProvider } from './../../providers/api-produto-empresa/api-produto-empresa';
import { IncrementarPage } from './../incrementar/incrementar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs, AlertController, LoadingController, Loading } from 'ionic-angular';
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
      private storage: Storage,
      private app: App,
      private api: ApiProdutoEmpresaProvider,
      public alertController: AlertController,
      public loadingCtrl: LoadingController
      ) {
  }

  ionViewWillEnter() {
    this.inicializar();
  }

  ionViewDidLoad() {
    this.inicializar();
  }

  async getCnpj(){
    this.cnpj =  await this.storage.get('cnpj');
  }

  async getProdutosEmpresa(){
    this.produtosEmpresa =  await this.storage.get('produtos_' + this.cnpj);
  }
  
  async getProdutosContabilizados() {
    this.produtosContabilizados =  await this.storage.get('produtosContabilizados_' + this.cnpj);
    if (this.produtosContabilizados.length === 0) {
      const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs;
      tabsNav.select(1);      
    }
  }

  inicializar(){
    console.log('ProdutosContabilizadosPage');
    this.getCnpj().then( () => {
      this.getProdutosEmpresa();
      this.getProdutosContabilizados();
    });
  }

  atualizarProduto(produto) {
    const  produtoSelecionado = this.produtosEmpresa.find( x => x.id == produto.produto.id);
    this.navCtrl.push(IncrementarPage, { produtoSelecionado:  produtoSelecionado });
    console.log(produto);
  }


  showAlert() {
    const alert = this.alertController.create({
      title: 'Sincronização finalizada',
      subTitle: 'Os produtos foram sincronizados com sucesso.',
      buttons: ['OK']
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
    const loading = this.loading("Sincronizando...", 30000000);
   this.storage.get('produtosContabilizados_' + this.cnpj).then(produtos => {
    this.api.cadastrarListaProdutos(produtos).subscribe( response => {
      console.log(response);
      this.storage.set('produtosContabilizados_' + this.cnpj, response).then(() => {
        loading.dismiss();
        this.showAlert();
      });
    });
   });

  
  }

}
