import { Produto } from './Produto';
export interface UsrProdutoEmpresa
{
    id?: number;
    qtd: number;
    dataHora?: Date;
    cpf: string;
    cnpj: string;
    produto: Produto;
  }