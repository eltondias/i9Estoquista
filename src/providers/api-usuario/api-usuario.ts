import { Injectable } from '@angular/core';
import { Api } from '../api';

/*
  Generated class for the ApiUsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUsuarioProvider extends Api {

  super() {}

  login( login: String, senha: String ) {
    const params =   [];
    params['login'] =  login;
    params['senha'] =  senha;
   return  this.get('login-api/farma', params);
  }

}
