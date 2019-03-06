import { ProdutosContabilizadosPage } from './../produtos-contabilizados/produtos-contabilizados';
import { TabsPage } from './../tabs/tabs';
import { ApiEmpresaProvider } from './../../providers/api-empresa/api-empresa';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
// import { ProdutosContabilizadosPage } from '../produtos-contabilizados/produtos-contabilizados';
import { FirestoreService } from '../../providers/api-firebase/firestore.service';
// import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import { LeitorPage } from '../leitor/leitor';

@Component({
  selector: 'page-selecionar-empresa',
  templateUrl: 'selecionar-empresa.html'
})
export class SelecionarEmpresaPage {

  empresas: any[] = [];
  produtos: any[] = [];
  empresaSelecionada: any;
  empresasFirebase = this.db.getCollection("empresas");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiEmpresa: ApiEmpresaProvider,
    private sanitizer:DomSanitizer,
    private db: FirestoreService,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {

    this.storage.get('empresas').then( empresas => {
      empresas.forEach(empresa => {
        this.getEmpresa(empresa.cadUsuario.cadUsuarioPK.cnpjEmpresa);
      });
    });
  }

  async getEmpresas(){
    this.empresaSelecionada =  await this.storage.get('empresas');
  }

  loading(mensagem, duracao): Loading {
    const loader = this.loadingCtrl.create({
      content: mensagem,
      duration: duracao
    });
    loader.present();
    return loader;
  }


  getEmpresa(cnpj) {
     this.apiEmpresa.getEmpresa(cnpj).subscribe( empresa => {
       this.empresas.push(empresa);
     });
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  selecionarEmpresa(empresa) {
    this.empresaSelecionada = empresa;    
    this.storage.set('empresa', empresa);
    this.storage.set('cnpj', empresa.cnpj);
   
    this.storage.get('produtosContabilizados_' + this.empresaSelecionada.cnpj).then((produtosContabilizados: any[]) => {
      if(produtosContabilizados === null) {
        this.storage.set('produtosContabilizados_' + this.empresaSelecionada.cnpj, []);
      }
    });

    this.storage.get('produtos_' + empresa.cnpj).then((produtos) => {
      if (produtos === null) {
        this.getProdutosEmpresa(empresa.cnpj);
      } else {
        this.navCtrl.push(TabsPage);
      } 
    });

  }


  getProdutosEmpresa(cnpj) {
    const loading = this.loading("Carregando produtos...", 30000000);
    this.apiEmpresa.getProdutosEmpresa(cnpj).subscribe( (produtos: any[]) => {
      loading.dismiss();
      this.storage.set('produtos_' + cnpj, produtos);
      this.navCtrl.push(TabsPage);
    });
 }

}
