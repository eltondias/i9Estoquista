import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsrProdutoEmpresa } from '../../model/UsrProdutoEmpresa';
import { ProdutosContabilizadosPage } from '../produtos-contabilizados/produtos-contabilizados';
import { Storage } from '@ionic/storage';
 

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private storage: Storage
    ) {
   
  }

  ionViewDidLoad() {
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
    this.navCtrl.push(ProdutosContabilizadosPage);
  }
}
