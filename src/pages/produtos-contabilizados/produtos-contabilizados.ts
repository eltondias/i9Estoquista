import { ApiProdutoEmpresaProvider } from './../../providers/api-produto-empresa/api-produto-empresa';
import { IncrementarPage } from './../incrementar/incrementar';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-produtos-contabilizados',
  templateUrl: 'produtos-contabilizados.html',
})
export class ProdutosContabilizadosPage {

  produtosContabilizados: UsrProdutoEmpresa[] = [];
  cnpj: string;
  cpf: string;
  produtosEmpresa: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private api: ApiProdutoEmpresaProvider,
    public alertController: AlertController,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewWillEnter() {
    this.inicializar();
  }

  ionViewDidLoad() {
    this.inicializar();
  }

  async getCnpj() {
    this.cnpj = await this.storage.get('cnpj');
  }

  async getProdutosEmpresa() {
    // this.api.getListaProdutos( this.cpf,this.cnpj ).subscribe(produtos => {
    //   // this.produtosEmpresa = <UsrProdutoEmpresa[]>produtos;
    // });
    this.produtosEmpresa = await this.storage.get('produtos_' + this.cnpj);
  }

  async getProdutosContabilizados() {
    this.produtosContabilizados = await this.storage.get('produtosContabilizados_' + this.cnpj);
  }

  inicializar() {
    this.getCnpj().then(() => {
      this.getProdutosEmpresa();
      this.getProdutosContabilizados();
    });
  }

  atualizarProduto(produto) {
    const produtoSelecionado = this.produtosEmpresa.find(x => x.id == produto.produto.id);
    this.navCtrl.push(IncrementarPage, { produtoSelecionado: produtoSelecionado });
  }


  showAlert(title, subTitle, buttons: any[]) {
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
    const loading = this.loading("Exportando...", 30000000);
    this.storage.get('produtosContabilizados_' + this.cnpj).then(produtos => {
      this.api.cadastrarListaProdutos(produtos)
        .then(response => {
          this.storage.set('produtosContabilizados_' + this.cnpj, []).then(() => {
            this.produtosContabilizados = [];
            loading.dismiss();
            this.showAlert('Exportação realizada com sucesso', '', ['OK']);
          });
        })
        .catch(error => {
          loading.dismiss();
          this.showAlert('Erro ao realizada exportação.', 'Tente novamente', ['OK']);
        });

    });


  }

}
