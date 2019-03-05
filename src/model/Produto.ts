export interface Produto {
    id: number;
    cnpj_empresa?: string;
    cod?: number;
    descricao?: string;
    categoria?: string;
    subcategoria?: string;
    unidade?: string;
    pre_vCusto_medio?: number;
    pre_vCusto_Inicial?: number;
    pre_vPreco_venda?: number;
    est_qtd?: number;
    dt_trans?: Date;
  }