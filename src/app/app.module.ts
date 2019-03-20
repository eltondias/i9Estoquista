import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProdutosPageModule } from './../pages/produtos/produtos.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SelecionarEmpresaPage } from '../pages/selecionar-empresa/selecionar-empresa';
import { LeitorPage } from '../pages/leitor/leitor';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiUsuarioProvider } from '../providers/api-usuario/api-usuario';
import { HttpClientModule } from '@angular/common/http';
import {NgxMaskModule} from 'ngx-mask';
import { ApiEmpresaProvider } from '../providers/api-empresa/api-empresa';
import { ProdutosContabilizadosPage } from '../pages/produtos-contabilizados/produtos-contabilizados';
import { FirestoreService } from '../providers/api-firebase/firestore.service';
import { AppService } from '../providers/api-firebase/app.service';
import { IonicStorageModule } from '@ionic/storage';
import { IncrementarPageModule } from '../pages/incrementar/incrementar.module';
import { TabsPage } from '../pages/tabs/tabs';
import { ApiProdutoEmpresaProvider } from '../providers/api-produto-empresa/api-produto-empresa';
import { LoginPageModule } from '../pages/login/login.module';

@NgModule({
  declarations: [
    MyApp,
    // LoginPage,
    SelecionarEmpresaPage,
    LeitorPage,
    ProdutosContabilizadosPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IncrementarPageModule,
    LoginPageModule,
    ProdutosPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SelecionarEmpresaPage,
    LeitorPage,
    ProdutosContabilizadosPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiUsuarioProvider,
    ApiEmpresaProvider,
    AppService,
    FirestoreService,
    ApiProdutoEmpresaProvider,
    BarcodeScanner 
  ]
})
export class AppModule {}
