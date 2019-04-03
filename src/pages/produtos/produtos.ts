import { ApiEmpresaProvider } from './../../providers/api-empresa/api-empresa';
import { ApiProdutoEmpresaProvider } from './../../providers/api-produto-empresa/api-produto-empresa';
import { IncrementarPage } from './../incrementar/incrementar';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs, AlertController, LoadingController, Loading, InfiniteScroll, ModalController } from 'ionic-angular';
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
  produtosListados = [];
  limitItems = 10;
  pageActual = 1;
  searchTerm : any="";
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;
  

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private storage: Storage,
      private app: App,
      private api: ApiProdutoEmpresaProvider,
      public alertController: AlertController,
      public loadingCtrl: LoadingController,
      public apiEmpresa: ApiEmpresaProvider,
      public modalCtrl: ModalController
      ) {
  }

  ionViewWillEnter() {
    // this.inicializar();
  }

  ionViewDidLoad() {
    this.inicializar();
  }

  filtrarProdutos(event) {
    this.pageActual = 1;
    this. produtosListados = [];
    const result =  this.produtosEmpresa.filter((item) => {
        return item.descricao.toLowerCase().includes(this.searchTerm.toLowerCase());
    });  

    this.loadingProdutos(result);
    
  }

  async getCnpj(){
    this.cnpj =  await this.storage.get('cnpj');
  }

  async getProdutosEmpresa(){
    this.produtosEmpresa =  await this.storage.get('produtos_' + this.cnpj);
    this.loadingProdutos(this.produtosEmpresa);
  }
  

  loadingProdutos(lista) {
    const produtos =  this.listItems(lista, this.pageActual, this.limitItems);
    produtos.forEach(produto => {
      this.produtosListados.push(produto);
    });
    this.infiniteScroll.complete();
  }

  ativarScroll(){
    this.loadingProdutos(this.produtosEmpresa);
  }


  listItems(items, pageActual, limitItems){
    let result = [];
    let totalPage = Math.ceil( items.length / limitItems );
    let count = ( pageActual * limitItems ) - limitItems;
    let delimiter = count + limitItems;
    
    if(pageActual <= totalPage){
        for(let i=count; i<delimiter; i++){
            if(items[i] != null){
                result.push(items[i]);
            }
            count++;
        }
    }

    this.pageActual++;

    return result;
};
 


  inicializar(){
    this.getCnpj().then( () => {
      this.getProdutosEmpresa();
    });
  }

  atualizarProduto(produto) {
    const  produtoSelecionado = this.produtosEmpresa.find( x => x.id == produto.id);
    // this.navCtrl.push(IncrementarPage, { produtoSelecionado:  produtoSelecionado });

    const modal = this.modalCtrl.create(IncrementarPage, { produtoSelecionado: produtoSelecionado });
    modal.present();
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
