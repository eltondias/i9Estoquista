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

    

    this.navParams.get("empresas").forEach(empresa => {
      this.getEmpresa(empresa.cadUsuario.cadUsuarioPK.cnpjEmpresa);
    });
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
    console.log(empresa);
    this.storage.set('cnpj', empresa.cnpj);
    this.storage.get('produtosContabilizados_' + empresa.cnpj).then((produtosContabilizados: any[]) => {
      if(produtosContabilizados === null) {
        this.storage.set('produtosContabilizados_' + empresa.cnpj, []);
      }
    });
   
    this.empresaSelecionada = empresa;
    this.storage.get('produtos_' + this.empresaSelecionada.cnpj).then((produtos) => {
      if (produtos) {
        console.log('produtos_' + this.empresaSelecionada.cnpj, produtos);
        this.goLeitor();
      } else {
        this.getProdutosEmpresa(this.empresaSelecionada.cnpj);
      }
    });
  }


  goLeitor() {
    this.navCtrl.push(LeitorPage, { empresa:  this.empresaSelecionada });
  }


  getProdutosEmpresa(cnpj) {
    const loading = this.loading("Carregando produtos...", 30000000);
    this.apiEmpresa.getProdutosEmpresa(cnpj).subscribe( (produtos: any[]) => {
      loading.dismiss();
      this.storage.set('produtos_' + cnpj, produtos);
      this.goLeitor();
    });
 }

}
