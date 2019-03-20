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
   return  this.http. get(this.url + '/login-api/farma?login='+ login + '&senha=' + senha);
  }

}
