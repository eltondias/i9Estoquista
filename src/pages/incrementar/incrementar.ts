import { ProdutosContabilizadosPage } from './../produtos-contabilizados/produtos-contabilizados';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Tabs, ViewController } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
import { UtilProvider } from '../../providers/util/util';
 

/**
 * Generated class for the IncrementarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-incrementar',
  templateUrl: 'incrementar.html',
})
export class IncrementarPage {

  produtoSelecionado: any;
  produtosContabilizados: UsrProdutoEmpresa[] = [];
  produto: UsrProdutoEmpresa;
  cpf: string;
  cnpj: string;
  modoRapido = false;
  pageOrigem: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private storage: Storage,
    private app: App,
    public viewCtrl: ViewController,
    public util: UtilProvider 
    ) {

      this.getModoRapido();
  }

  ionViewDidLoad() {    
    this.pageOrigem  =  this.navParams.get("origem");
    this.produtoSelecionado  =  this.navParams.get("produtoSelecionado");
    this.getCpfCnpj().then(() => {
      if ( this.produtoSelecionado) {
        this.getProdutosContabilizados().then(() => {
          this.getProduto();
        });
      }
    });
  }
 

  async getCpfCnpj(){
    this.cpf =  await this.storage.get('cpf');
    this.cnpj =  await this.storage.get('cnpj');
  }

  getProduto() {
    const produto =  this.produtosContabilizados.find(x => x.produto.id === this.produtoSelecionado.id);
    if(produto) {
      this.produto =  produto;  
      this.produto.produto = {
        id: this.produtoSelecionado.id, 
        descricao:  this.produtoSelecionado.descricao
      } 
    } else {
      this.produto = { 
        qtd: 0, 
        cpf: this.cpf, 
        cnpj: this.cnpj, 
        produto: {
            id: this.produtoSelecionado.id, 
            descricao:  this.produtoSelecionado.descricao
          } 
      };
    }
  }

  setProdutosContabilizados() {
    const existe =  this.produtosContabilizados.find(x => x.produto.id === this.produto.produto.id);
    if (existe) {
      const indice =  this.produtosContabilizados.indexOf(existe);
      this.produtosContabilizados[indice] = this.produto;
    } else {
      this.produtosContabilizados.push(this.produto);
    }
    this.storage.set('produtosContabilizados_' + this.cnpj, this.produtosContabilizados);
    this.getProdutosContabilizados();
  }

  async getProdutosContabilizados() {
    this.produtosContabilizados =  await this.storage.get('produtosContabilizados_' + this.cnpj);
  }

  async getModoRapido() {
    this.modoRapido =  await  this.storage.get('modoRapido');
  }

  incrementar() {
    this.produto.qtd++;
  }

  decrementar() {
    this.produto.qtd--;
    if(this.produto.qtd < 0) {
      this.produto.qtd = 0;
    }

  }
  
  confirmar() {
    this.setProdutosContabilizados();
    this.setTab();
  }

  descartar() {
    const indice =  this.produtosContabilizados.indexOf(this.produto);
    
    if (indice !== -1) {
      this.produtosContabilizados.splice(indice, 1);
      this.storage.set('produtosContabilizados_' + this.cnpj, this.produtosContabilizados);
    }

    this.setTab();
  }

  setTab() {
    console.log( this.modoRapido);
    this.storage.set('modoRapido', this.modoRapido);

    if( this.pageOrigem === 'ProdutosContabilizadosPage') {
      this.util.atualizarProdutosContabilizadosEmiter.emit();
    }
    
    
    const tabsNav = this.app.getNavByIdOrName('myTabsNav') as Tabs
    console.log(this.navCtrl.id);
    if (this.navCtrl.id === 't0-1' || this.navCtrl.id === 't0-2' || this.navCtrl.id === 'n0') {
      
      if(this.modoRapido) {
        tabsNav.select(1);
        setTimeout(() => {
          this.util.ativarScannerEmiter.emit();
        }, 500);
      } else {
        tabsNav.select(0);
      }
     
    } 
    this.viewCtrl.dismiss();
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }



}
