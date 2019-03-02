import { ApiEmpresaProvider } from './../../providers/api-empresa/api-empresa';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ProdutosContabilizadosPage } from '../produtos-contabilizados/produtos-contabilizados';
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
    // private nativeStorage: NativeStorage
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
    console.log(cnpj);
     this.apiEmpresa.getEmpresa(cnpj).subscribe( empresa => {
       this.empresas.push(empresa);
       console.log(this.empresas);
     });
  }

  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }

  selecionarEmpresa(empresa) {
    this.empresaSelecionada = empresa;
    // this.navCtrl.push(ProdutosContabilizadosPage, { empresa:  this.empresaSelecionada });
    this.navCtrl.push(LeitorPage, { empresa:  this.empresaSelecionada });
    // this.salvarEmpresaBaseLocal();

    this.storage.get('produtos').then((val) => {
      if (val) {
        console.log('Produtos => ', val);
      } else {
        this.getProdutosEmpresa(this.empresaSelecionada.cnpj);
      }
     
    });

    
  }

  salvarEmpresaBaseLocal() {
    this.empresasFirebase.doc(this.empresaSelecionada.cnpj).set(this.empresaSelecionada).then( () => {
    
    });
  }

  getProdutosEmpresaFirebase(cnpj, collectionReference: firebase.firestore.CollectionReference) {
     this.apiEmpresa.getProdutosEmpresa(cnpj).subscribe( (produtos: any[]) => {
      this.loading("Carregando produtos...", 3000);

      // this.empresasFirebase.doc(this.empresaSelecionada.cnpj).collection('produtos').get().then( produtos  => {
      //   console.log(produtos.docs.length);
      // });

      console.log(produtos);

      // produtos.forEach(produto => {
      //  collectionReference.doc(produto.id.toString()).set(produto).then( valor => {
      //    console.log(produto.id);
      //  });
      // });


     });
  }

  getProdutosEmpresa(cnpj) {
    const loading = this.loading("Carregando produtos...", 30000);
    this.apiEmpresa.getProdutosEmpresa(cnpj).subscribe( (produtos: any[]) => {
      loading.dismiss();
      this.storage.set('produtos', produtos);
    });
 }

}
