import { Api } from './../api';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiEmpresaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiEmpresaProvider extends Api {

  super() {}

  getEmpresa( cnpj: String ) {
   return  this.get('empresa-api/cnpj/' + cnpj);
  }

  getProdutosEmpresa( cnpj: String )  {
    return this.http.get(this.url + '/produtos-api/lista/empresa/' + cnpj);
  }

  
}

