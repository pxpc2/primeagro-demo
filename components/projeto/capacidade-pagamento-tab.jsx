"use client";

import { useState, useMemo } from "react";
import Heading from "./Header";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function CapacidadePagamentoTab({
  data,
  isAdmin,
  preAnaliseData,
  identificacaoBeneficiarioData,
  dadosImovelData,
  sibData,
  fluxoCaixaData,
  receitasData,
  despesasData,
}) {
  const [formsDisabled, setFormsDisabled] = useState(true);

  // Calcular tabela de fluxo de caixa localmente
  const tabelaFluxo = useMemo(() => {
    if (!receitasData || !despesasData) return [];

    const anos = 26;
    const tabela = [];

    for (let i = 0; i < anos; i++) {
      let receitaTotal = 0;
      let custoTotal = 0;

      // Primeiros 10 anos: usa dados reais
      if (i < 10) {
        // Soma todas as receitas
        const totalMatrizes =
          receitasData?.dadosReceita?.valorMatrizesDescartadas?.[i] || 0;
        const totalNovilhos =
          receitasData?.dadosReceita?.valorNovilhosVendidos?.[i] || 0;
        const totalNovilhas =
          receitasData?.dadosReceita?.valorNovilhasVendidas?.[i] || 0;
        const totalQueijo = receitasData?.dadosReceita?.valorQueijo?.[i] || 0;
        const totalLeite =
          receitasData?.dadosReceita?.valorLeiteParaVenda?.[i] || 0;

        receitaTotal =
          totalMatrizes +
          totalNovilhos +
          totalNovilhas +
          totalQueijo +
          totalLeite;

        // Usa custos calculados
        custoTotal = despesasData?.totalCustos?.[i] || 0;
      }

      const lucroOperacional = receitaTotal - custoTotal;

      const ano = {
        ano: i,
        receita_total: receitaTotal,
        custo_total: custoTotal,
        lucro_operacional: lucroOperacional,
      };

      tabela.push(ano);
    }

    return tabela;
  }, [receitasData, despesasData]);

  
  // Seção 1 - ATER
  const razaoSocialAter = preAnaliseData?.[0]?.campo_26 || "";
  const cnpjAter = "43.263.293/0001-02"; // Valor fixo - DTS REBOUÇAS LTDA
  const dataElaboracao = preAnaliseData?.[0]?.campo_23 || "";
  const nomeProjetista = preAnaliseData?.[0]?.campo_25 || "";
  const numeroRegistro = preAnaliseData?.[0]?.campo_24 || "";
  const contatoProjetista = preAnaliseData?.[0]?.campo_27 || "";

  console.log("razaoSocialAter:", razaoSocialAter);
  console.log("nomeProjetista:", nomeProjetista);

  // Seção 2 - Proponente
  const nomeProponente1 = identificacaoBeneficiarioData?.[0]?.campo1 || "";
  const cpfProponente1 = identificacaoBeneficiarioData?.[0]?.campo2 || "";
  const estadoCivil = identificacaoBeneficiarioData?.[0]?.campo5 || "";
  const nomeConjuge = identificacaoBeneficiarioData?.[0]?.campo18 || ""; // Nome do cônjuge
  const cpfConjuge = identificacaoBeneficiarioData?.[0]?.campo19 || ""; // CPF do cônjuge
  const contatoProponente = identificacaoBeneficiarioData?.[0]?.campo16 || ""; // Telefone

  // Seção 3 - Financiamento
  const nomeImovel = dadosImovelData?.[0]?.campo1 || "";
  const areaAdquirida = preAnaliseData?.[0]?.campo_7 || "";
  const linhaFinanciamento = preAnaliseData?.[0]?.campo_8 || "";
  const valorNegociado = preAnaliseData?.[0]?.campo_6 || 0;
  const valorSIB = sibData?.valorAvaliado?.valor_total_imovel || 0;
  const valorATER = sibData?.valorImovelCustos?.valorATER || 0;
  const valorITBI = sibData?.valorImovelCustos?.valorITBI || 0;
  const valorMedicao = sibData?.valorImovelCustos?.custoMedicaoInterna || 0;
  const despesasCartorarias = sibData?.valorImovelCustos?.despesasCartorarias || 0;
  
  const totalFinanciamento = 
    Number(valorNegociado) + 
    Number(despesasCartorarias) + 
    Number(valorATER) + 
    Number(valorSIB) + 
    Number(valorITBI) + 
    Number(valorMedicao);
  
  const haveraProNaf = preAnaliseData?.[0]?.campo_8?.includes("PRONAF") ? "SIM" : "NÃO";

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        tabName={"Capacidade de Pagamento"}
        onEdit={() => {}}
        onSave={() => {}}
        isEditing={false}
        isLoading={false}
        isAdmin={isAdmin}
        onCancel={() => {}}
        hideEditButton={true}
      />

      <div className="w-full mt-6 space-y-8">
        {/* Título */}
        <div className="bg-gray-800 p-4 text-center">
          <h1 className="text-xl font-bold text-gray-200">
            PROGRAMA NACIONAL DE CRÉDITO FUNDIÁRIO-PNCF
          </h1>
        </div>

        {/* Seção 1 - Identificação da ATER */}
        <div className="overflow-hidden border-gray-800 border shadow sm:rounded-lg">
          <div className="bg-gray-800 p-4">
            <h2 className="text-lg font-semibold text-gray-200">
              IDENTIFICAÇÃO DA ATER
            </h2>
          </div>
          <div className="bg-gray-950 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  RAZÃO SOCIAL DA ATER
                </label>
                <Input value={razaoSocialAter} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nº DO CNPJ
                </label>
                <Input value={cnpjAter} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  DATA DE ELABORAÇÃO
                </label>
                <Input value={formatDate(dataElaboracao)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  NOME DO(A) PROJETISTA
                </label>
                <Input value={nomeProjetista} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nº DO REGISTO
                </label>
                <Input value={numeroRegistro} disabled className="w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nº PARA CONTATO
                </label>
                <Input value={contatoProjetista} disabled className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Seção 2 - Identificação do Proponente */}
        <div className="overflow-hidden border-gray-800 border shadow sm:rounded-lg">
          <div className="bg-gray-800 p-4">
            <h2 className="text-lg font-semibold text-gray-200">
              IDENTIFICAÇÃO DO PROPONENTE
            </h2>
          </div>
          <div className="bg-gray-950 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  PROPONENTE 1
                </label>
                <Input value={nomeProponente1} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  CPF DO PROPONENTE 1
                </label>
                <Input value={cpfProponente1} disabled className="w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  ESTADO CIVIL
                </label>
                <Input value={estadoCivil} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  NOME DO CANDIDATO(A) 2
                </label>
                <Input value={nomeConjuge} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  CPF DO PROPONENTE 2
                </label>
                <Input value={cpfConjuge} disabled className="w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Nº PARA CONTATO
                </label>
                <Input value={contatoProponente} disabled className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Seção 3 - Dados do Financiamento */}
        <div className="overflow-hidden border-gray-800 border shadow sm:rounded-lg">
          <div className="bg-gray-800 p-4">
            <h2 className="text-lg font-semibold text-gray-200">
              DADOS DO FINANCIAMENTO
            </h2>
          </div>
          <div className="bg-gray-950 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  NOME DO IMÓVEL
                </label>
                <Input value={nomeImovel} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  ÁREA ADQUIRIDA
                </label>
                <Input value={areaAdquirida} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  LINHA DE FINANCIAMENTO
                </label>
                <Input value={linhaFinanciamento} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR NEGOCIADO
                </label>
                <Input value={formatCurrency(valorNegociado)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR DO ITBI
                </label>
                <Input value={formatCurrency(valorITBI)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR DO CARTÓRIO
                </label>
                <Input value={formatCurrency(despesasCartorarias)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR DA MEDIÇÃO
                </label>
                <Input value={formatCurrency(valorMedicao)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR DA ATER
                </label>
                <Input value={formatCurrency(valorATER)} disabled className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  VALOR DO SIB
                </label>
                <Input value={formatCurrency(valorSIB)} disabled className="w-full" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-200 mb-2 font-bold">
                  TOTAL FINANCIAMENTO
                </label>
                <Input 
                  value={formatCurrency(totalFinanciamento)} 
                  disabled 
                  className="w-full font-bold bg-green-900/30" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  HAVERÁ PRONAF?
                </label>
                <Input value={haveraProNaf} disabled className="w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Seção 4 - Tabela de Fluxo de Caixa */}
        <div className="overflow-hidden border-gray-800 border shadow sm:rounded-lg">
          <div className="bg-gray-800 p-4">
            <h2 className="text-lg font-semibold text-gray-200 text-center">
              FLUXO DE CAIXA - CAPACIDADE DE PAGAMENTO (26 ANOS)
            </h2>
          </div>
          
          {tabelaFluxo.length > 0 ? (
            <div className="overflow-x-auto bg-gray-950">
              <Table className="border border-gray-800">
                <TableHeader>
                  <TableRow className="bg-gray-800">
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Ano</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Receitas</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Despesas</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Lucro Operacional</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Total Encargos</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Capacidade Pagamento</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Total Amortizações</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Lucro Líquido</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">% Utilização</TableHead>
                    <TableHead className="border border-gray-700 text-center text-gray-200 font-bold">Valor Líq. Mensal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tabelaFluxo.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-900">
                      <TableCell className="border border-gray-700 text-center font-medium text-gray-200">
                        {2025 + row.ano}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.receita_total)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.custo_total)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.lucro_operacional)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.total_encargos || 0)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.capacidade_pagamento || 0)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.total_amortizacoes || 0)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.lucro_liquido || 0)}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-center text-gray-200">
                        {row.percentual_utilizacao ? `${row.percentual_utilizacao}%` : "-"}
                      </TableCell>
                      <TableCell className="border border-gray-700 text-right text-gray-200">
                        {formatCurrency(row.valor_liquido_mensal || 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-950 text-gray-400">
              <p>Nenhum dado de fluxo de caixa disponível.</p>
              <p className="text-sm mt-2">
                Complete as abas de Receitas, Despesas e Fluxo de Caixa primeiro.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
