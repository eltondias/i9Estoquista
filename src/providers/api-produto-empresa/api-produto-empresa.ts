import { UsrProdutoEmpresa } from './../../model/UsrProdutoEmpresa';
import { Injectable } from '@angular/core';
import { Api } from '../api';

/*
  Generated class for the ApiProdutoEmpresaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProdutoEmpresaProvider extends Api {

  super() {}

  cadastrarListaProdutos(produtos: UsrProdutoEmpresa[], callback?) {
      const cb = callback || function() {};
      return new Promise((resolve, reject) => {
        this.post('estoque-api/cadastrar-lista-produtos', produtos).subscribe(
            data => {
                resolve(data);
                return cb();
            },
            err => {
                reject(err);
                return cb(err);
            }
        );
    });
  }
  
  getListaProdutos(cpf, cnpj) {
    
    return this.get('estoque-api/lista-produtos-usuario/' + cpf + '/' + cnpj );
  }

}
