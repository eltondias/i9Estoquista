import { ApiProdutoEmpresaProvider } from './../../providers/api-produto-empresa/api-produto-empresa';
import { IncrementarPage } from './../incrementar/incrementar';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { Storage } from '@ionic/storage';
import { UtilProvider } from '../../providers/util/util';

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

    public modalCtrl: ModalController,
    public util: UtilProvider
  ) {
    this.util.atualizarProdutosContabilizadosEmiter.subscribe(() => {
      console.log('atualizarProdutosContabilizadosEmiter');
      // const loading = this.util.loading("Aguarde...", 30000000);
      this.getCnpj().then(() => {    
        this.getProdutosContabilizados();   
        // loading.dismiss();  
        
      });
    });
  }

  ionViewWillEnter() {
    
    console.log('ionViewWillEnter');
    const loading = this.util.loading("Aguarde...", 30000000);
    this.getCnpj().then(() => {    
      this.getProdutosContabilizados();   
      loading.dismiss();  
    });
    // this.inicializar();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.inicializar();
  }

  async getCnpj() {
    this.cnpj = await this.storage.get('cnpj');
  }

  getProdutosEmpresa(loading) {
    // this.api.getListaProdutos( this.cpf,this.cnpj ).subscribe(produtos => {
    //   // this.produtosEmpresa = <UsrProdutoEmpresa[]>produtos;
    // });

    this.storage.get('produtos_' + this.cnpj).then((produtos) =>  {
      this.produtosEmpresa = produtos;
      loading.dismiss();
    });
    
  }

  async getProdutosContabilizados() {
    this.produtosContabilizados = await this.storage.get('produtosContabilizados_' + this.cnpj);
  }

  inicializar() {
    const loading = this.util.loading("Aguarde...", 30000000);
    this.getCnpj().then(() => {
      this.getProdutosEmpresa(loading);
      this.getProdutosContabilizados();
    });
  }

  atualizarProduto(produto) {
    const produtoSelecionado = this.produtosEmpresa.find(x => x.id == produto.produto.id);
    const modal = this.modalCtrl.create(IncrementarPage, { produtoSelecionado: produtoSelecionado, origem: 'ProdutosContabilizadosPage' });
    modal.present();
  }

  sincronizarProdutos() {
    const loading = this.util.loading("Exportando...", 30000000);
    this.storage.get('produtosContabilizados_' + this.cnpj).then(produtos => {
      this.api.cadastrarListaProdutos(produtos)
        .then(response => {
          this.storage.set('produtosContabilizados_' + this.cnpj, []).then(() => {
            this.produtosContabilizados = [];
            loading.dismiss();
            this.util.showAlert('Exportação realizada com sucesso', '', ['OK']);
          });
        })
        .catch(error => {
          loading.dismiss();
          this.util.showAlert('Erro ao realizada exportação.', 'Tente novamente', ['OK']);
        });

    });


  }

}
