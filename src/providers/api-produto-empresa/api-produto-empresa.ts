import { UsrProdutoEmpresa } from './../../model/UsrProdutoEmpresa';
import { HttpClient } from '@angular/common/http';
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

  cadastrarListaProdutos(produtos: UsrProdutoEmpresa[]) {
    return this.post('/estoque-api/cadastrar-lista-produtos', produtos);
  }

}
