"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Heading from "./Header";
import { Loader2 } from "lucide-react";

const formatValue = (value) => {
  if (!value) return "-";
  return String(value);
};

const formatCurrency = (value) => {
  if (!value) return "-";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "-";
  return numValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatArea = (value) => {
  if (!value) return "-";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "-";
  return numValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

const getFieldFromData = (data, fieldPath) => {
  if (!data) return "-";
  const fields = fieldPath.split(".");
  let value = data;
  for (const field of fields) {
    if (value && typeof value === "object" && field in value) {
      value = value[field];
    } else {
      return "-";
    }
  }
  return value || "-";
};

export default function SumulaTab({
  preAnaliseData,
  identificacaoBeneficiarioData,
  dadosImovelData,
  investimentosData,
  receitasData,
  despesasData,
  simuladorPNCFData,
  simuladorPRONAFData,
  fluxoCaixaData,
  isAdmin,
}) {
  const [loading, setLoading] = useState(false);

  // Extrair dados da Pré-análise (campo_X)
  const parsePreAnalise = () => {
    if (!preAnaliseData || !preAnaliseData[0]) return {};
    const data = preAnaliseData[0];
    return {
      municipioReferencia: formatValue(data.campo_3),
      nomeImovel: formatValue(data.campo_4),
      areaTotalImovel: formatArea(data.campo_5),
      areaSerAdquirida: formatArea(data.campo_7),
      numeroDoLote: formatValue(data.campo_15),
      protocoloObterCredito: formatValue(data.campo_1),
      nomeCanditato: formatValue(data.campo_9),
      cpfCandidato: formatValue(data.campo_10),
      estadoCivil: formatValue(data.campo_12),
      agenteFinanceiro: formatValue(data.campo_21),
      agenciaInteresse: formatValue(data.campo_22),
      creaCfta: formatValue(data.campo_24),
      engenheiroResponsavel: formatValue(data.campo_25),
      entidadeAter: formatValue(data.campo_26),
      contatoTecnico: formatValue(data.campo_27),
      emailResponsavel: formatValue(data.campo_28),
      dataValidadeCertificado: formatValue(data.campo_29),
    };
  };

  const parseBeneficiario = () => {
    if (!identificacaoBeneficiarioData || !identificacaoBeneficiarioData[0])
      return {};
    const data = identificacaoBeneficiarioData[0];
    return {
      nomeBeneficiario: formatValue(data.campo_1),
      cpfBeneficiario: formatValue(data.campo_2),
      dataNascimento: formatValue(data.campo_3),
      estadoCivil: formatValue(data.campo_4),
      profissao: formatValue(data.campo_5),
      telefoneBeneficiario: formatValue(data.campo_6),
      emailBeneficiario: formatValue(data.campo_7),
    };
  };

  const parseDadosImovel = () => {
    if (!dadosImovelData || !dadosImovelData[0]) return {};
    const data = dadosImovelData[0];
    return {
      areaTotalImovel: formatArea(data.campo2),
      areaSerAdquirida: formatArea(data.campo3),
      nomeImovel: formatValue(data.campo1),
      municipio: formatValue(data.campo4),
      referencia: formatValue(data.campo5),
      latitude: formatValue(data.campo6),
      longitude: formatValue(data.campo7),
      alturaMedia: formatValue(data.campo8),
    };
  };

  const parseInvestimentos = () => {
    if (!investimentosData) return { totalInvestimento: 0 };
    let total = 0;
    if (investimentosData.dadosInvestimentos) {
      investimentosData.dadosInvestimentos.forEach((item) => {
        const valor = parseFloat(
          String(item.valor || 0).replace(".", "").replace(",", ".")
        );
        total += isNaN(valor) ? 0 : valor;
      });
    }
    return {
      totalInvestimento: total,
      investimentoFormatado: formatCurrency(total),
    };
  };

  const parseReceitas = () => {
    if (!receitasData) return { totalReceitas: 0 };
    let total = 0;
    if (Array.isArray(receitasData)) {
      receitasData.forEach((item) => {
        if (item.totalReceitas) {
          const valor = parseFloat(
            String(item.totalReceitas).replace(".", "").replace(",", ".")
          );
          total += isNaN(valor) ? 0 : valor;
        }
      });
    }
    return {
      totalReceitas: total,
      totalReceitasFormatado: formatCurrency(total),
    };
  };

  const parseDespesas = () => {
    if (!despesasData) return { totalDespesas: 0 };
    let total = 0;
    if (Array.isArray(despesasData)) {
      despesasData.forEach((item) => {
        if (item.totalDespesas) {
          const valor = parseFloat(
            String(item.totalDespesas).replace(".", "").replace(",", ".")
          );
          total += isNaN(valor) ? 0 : valor;
        }
      });
    }
    return {
      totalDespesas: total,
      totalDespesasFormatado: formatCurrency(total),
    };
  };

  const parseSimuladorPNCF = () => {
    if (!simuladorPNCFData) return { juros: "-", carencia: "-" };
    const data = simuladorPNCFData[0] || {};
    return {
      juros: formatValue(data.juros),
      carencia: formatValue(data.carencia),
      rebate: formatValue(data.rebate),
    };
  };

  const parseSimuladorPRONAF = () => {
    if (!simuladorPRONAFData) return { juros: "-", carencia: "-" };
    const data = simuladorPRONAFData[0] || {};
    return {
      juros: formatValue(data.juros),
      carencia: formatValue(data.carencia),
    };
  };

  const preAnalise = parsePreAnalise();
  const beneficiario = parseBeneficiario();
  const dadosImovel = parseDadosImovel();
  const investimentos = parseInvestimentos();
  const receitas = parseReceitas();
  const despesas = parseDespesas();
  const simuladorPNCF = parseSimuladorPNCF();
  const simuladorPRONAF = parseSimuladorPRONAF();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-white text-gray-900 p-8">
      <Heading
        tabName="Súmula (PAG01)"
        onSave={handlePrint}
        saveButtonText="Imprimir Súmula"
        isAdmin={isAdmin}
      />

      <div className="print:p-4">
        {/* Cabeçalho */}
        <div className="text-center mb-8 border-b pb-6 print:mb-4 print:pb-3 print:border-b">
          <h1 className="text-sm font-bold mb-1 print:text-xs">
            GOVERNO DO ESTADO DO TOCANTINS
          </h1>
          <h2 className="text-sm font-bold mb-1 print:text-xs">
            SECRETARIA DE AGRICULTURA E PECUÁRIA DO TOCANTINS - SEAGRO
          </h2>
          <h3 className="text-sm font-bold mb-1 print:text-xs">
            DIRETORIA DE CRÉDITO FUNDIÁRIO
          </h3>
          <h3 className="text-sm font-bold mb-4 print:text-xs print:mb-2">
            UNIDADE TÉCNICA ESTADUAL DO TOCANTINS
          </h3>

          <p className="text-xs font-semibold mb-4 print:text-xs print:mb-2">
            PROJETO TÉCNICO DE FINANCIAMENTO DO IMÓVEL {preAnalise.nomeImovel},
            LOCALIZADO NO MUNICÍPIO DE {preAnalise.municipioReferencia}, NA LINHA
            DE FINANCIAMENTO: PNCF {preAnalise.agenteFinanceiro || "SOCIAL"}
          </p>

          <h2 className="text-sm font-bold print:text-xs">
            SÚMULA DO PROJETO TÉCNICO DE FINANCIAMENTO
          </h2>
        </div>

        {/* Seção 1: Dados do Imóvel e Projeto */}
        <div className="mb-8 print:mb-4">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/2 print:p-1">
                  MUNICÍPIO DE REFERÊNCIA
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.municipioReferencia}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  NOME DO IMÓVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.nomeImovel}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  ÁREA TOTAL DO IMÓVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.areaTotalImovel}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  ÁREA A SER ADQUIRIDA
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.areaSerAdquirida}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  IDENTIDICAÇÃO DO LOTE A SER ADQUIRIDO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.numeroDoLote}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  PROTOCOLO NO OBTER CRÉDITO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.protocoloObterCredito}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 2: Dados do Beneficiário */}
        <div className="mb-8 print:mb-4">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/2 print:p-1">
                  NOME DO CANDIDATO(A)
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.nomeBeneficiario || preAnalise.nomeCanditato}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  CPF DO CANDIDATO(A)
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.cpfBeneficiario || preAnalise.cpfCandidato}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  DATA DE NASCIMENTO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.dataNascimento}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  ESTADO CIVIL DO CANDIDATO(A)
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.estadoCivil || preAnalise.estadoCivil}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  PROFISSÃO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.profissao}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  TELEFONE
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.telefoneBeneficiario}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  EMAIL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {beneficiario.emailBeneficiario}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 3: Dados Financeiros */}
        <div className="mb-8 print:mb-4">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/2 print:p-1">
                  AGENTE FINANCEIRO A CONTRATAR O FINANCIAMENTO
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.agenteFinanceiro}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  AGÊNCIA DE INTERESSE
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.agenciaInteresse}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  TOTAL DE INVESTIMENTOS
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {investimentos.investimentoFormatado}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  TOTAL DE RECEITAS
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {receitas.totalReceitasFormatado}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  TOTAL DE DESPESAS
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {despesas.totalDespesasFormatado}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 4: Dados do Responsável Técnico */}
        <div className="mb-8 print:mb-4">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/3 print:p-1">
                  CREA/CFTA
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.creaCfta}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  ENGENHEIRO(A) RESPONSÁVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.engenheiroResponsavel}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  ENTIDADE DE ATER
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.entidadeAter}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  Nº DE CONTATO DO ENGENHEIRO(A) RESPONSÁVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.contatoTecnico}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  EMAIL DO(A) ENGENHEIRO(A) RESPONSÁVEL
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.emailResponsavel}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  DATA DE VALIDADE DO CERTIFICADO CET
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {preAnalise.dataValidadeCertificado}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 5: Simuladores */}
        <div className="mb-8 print:mb-4">
          <h3 className="text-sm font-bold mb-4 print:text-xs print:mb-2">
            DADOS DO SIMULADOR PNCF
          </h3>
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/2 print:p-1">
                  TAXA DE JUROS
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {simuladorPNCF.juros}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  PERÍODO DE CARÊNCIA
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {simuladorPNCF.carencia}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  REBATE
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {simuladorPNCF.rebate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 6: Simulador PRONAF */}
        <div className="mb-8 print:mb-4">
          <h3 className="text-sm font-bold mb-4 print:text-xs print:mb-2">
            DADOS DO SIMULADOR PRONAF
          </h3>
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/2 print:p-1">
                  TAXA DE JUROS
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {simuladorPRONAF.juros}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  PERÍODO DE CARÊNCIA
                </td>
                <td className="border border-gray-400 p-2 print:p-1">
                  {simuladorPRONAF.carencia}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Botão Imprimir */}
      <div className="flex justify-center gap-4 mt-8 print:hidden">
        <Button
          onClick={handlePrint}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Imprimir Súmula
        </Button>
      </div>
    </div>
  );
}
