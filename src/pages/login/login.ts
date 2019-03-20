import { ApiEmpresaProvider } from './../../providers/api-empresa/api-empresa';
import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, Loading } from 'ionic-angular';
import { SelecionarEmpresaPage } from '../selecionar-empresa/selecionar-empresa';
import { ApiUsuarioProvider } from './../../providers/api-usuario/api-usuario';
import { FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  login: string;
  senha: string;
  empresaList  = [];
  
  constructor(
    public navCtrl: NavController, 
    public apiUsuario: ApiUsuarioProvider,
    public apiEmpresa: ApiEmpresaProvider,
    private formBuilder: FormBuilder,
    private storage: Storage,
    public loadingCtrl: LoadingController,
     ) {
       
      this.login =  '67374212291';
      this.senha = 'a'; 

      this.storage.get('cpf').then( cpf => {
        console.log(cpf);
        if (cpf) {
            this.navCtrl.push(SelecionarEmpresaPage);
        }
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


  formDeValidacao = this.formBuilder.group({
    login: new FormControl({ value: null, disabled: false}, Validators.compose([
      Validators.required,
      Validators.minLength(11),
      Validators.pattern('([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})'),
      GenericValidator.isValidCpf()
    ])),
    senha: new FormControl({ value: null, disabled: false}, Validators.compose([
      Validators.required,
    ])),
  });

  entrar() {
    
    const loading = this.loading("Aguarde...", 30000000);
  
    this.apiUsuario.login( this.login.toString(), this.senha.toString()).subscribe( (empresas:any[]) => {
      this.storage.set('cpf', this.login);
      loading.dismiss();
      empresas.forEach(empresa => {
        this.apiEmpresa.getEmpresa(empresa.cadUsuario.cadUsuarioPK.cnpjEmpresa).subscribe( empresa => {
          this.empresaList.push(empresa);
          if (empresas.length === this.empresaList.length) {
            this.storage.set('empresas', this.empresaList).then(() => {
              this.navCtrl.push(SelecionarEmpresaPage, { empresas: this.empresaList });
            });
          }
        });
      });

    });
  }




  goToSelecionarEmpresa(params){
    if (!params) params = {};
    this.navCtrl.push(SelecionarEmpresaPage);
  }

}



export class GenericValidator {
  constructor() {}

  /**
   * Valida se o CPF é valido. Deve-se ser informado o cpf sem máscara.
  */
  static isValidCpf() {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;
        if (cpf.length < 11) {
         return null;
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { cpfNotValid: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { cpfNotValid: true };
          }
          return null;
        } else {
          return { cpfNotValid: true };
        }
     }
   return null;
 };
}
}
