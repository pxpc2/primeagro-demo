"use client";

import { Button } from "../ui/button";
import Heading from "./Header";

const formatValue = (value) => {
  if (!value) return "";
  return String(value);
};

const formatCurrency = (value) => {
  if (!value) return "R$ 0,00";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "R$ 0,00";
  return numValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

const formatNumber = (value) => {
  if (!value) return "0,00";
  const numValue = parseFloat(String(value).replace(",", "."));
  if (isNaN(numValue)) return "0,00";
  return numValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function Pag03ResumoFinanciamento({
  preAnaliseData,
  dadosImovelData,
  investimentosData,
  identificacaoBeneficiarioData,
  sibData,
  isAdmin,
}) {
  // Parse dados da pré-análise
  const parsePreAnalise = () => {
    if (!preAnaliseData || !preAnaliseData[0]) return {};
    const data = preAnaliseData[0];
    return {
      nomeImovel: formatValue(data.campo_4),
      municipio: formatValue(data.campo_3),
      nomeCanditato: formatValue(data.campo_9),
      cpfCandidato: formatValue(data.campo_10),
    };
  };

  // Parse dados do imóvel
  const parseDadosImovel = () => {
    if (!dadosImovelData || !dadosImovelData[0]) return {};
    const data = dadosImovelData[0];
    return {
      valorNegociado: formatValue(data.campo13) || "177.372,96",
    };
  };

  // Parse beneficiário
  const parseBeneficiario = () => {
    if (!identificacaoBeneficiarioData || !identificacaoBeneficiarioData[0])
      return {};
    const data = identificacaoBeneficiarioData[0];
    return {
      nomeBeneficiario: formatValue(data.campo_1),
      cpfBeneficiario: formatValue(data.campo_2),
    };
  };

  // Parse investimentos
  const parseInvestimentos = () => {
    if (!investimentosData || !investimentosData.dadosInvestimentos) return [];
    return investimentosData.dadosInvestimentos.map((inv) => ({
      descricao: formatValue(inv.descricao),
      unidade: formatValue(inv.unidade),
      quantidade: formatNumber(inv.quantidade),
      valorUnitario: formatCurrency(inv.valorUnitario),
      valorTotal: formatCurrency(inv.valor),
      fonte: formatValue(inv.categoria) || "SIB",
      categoria: formatValue(inv.categoria),
    }));
  };

  // Calcular totais por categoria
  const calcularTotaisPorCategoria = (investimentos) => {
    const totais = {
      AMBIENTAL: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      ELETRIFICAÇÃO: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      HABITAÇÃO: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      EQUIPAMENTOS: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      OUTROS: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      PRODUTIVO: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      HIDRICOS: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
      ACESSOS: { SIB: 0, "PRONAF-A": 0, "RECURSOS PRÓPRIOS": 0, TOTAL: 0 },
    };

    investimentos.forEach((inv) => {
      const categoria = inv.categoria?.toUpperCase() || "OUTROS";
      const valor = parseFloat(
        String(inv.valorTotal).replace("R$", "").replace(/\./g, "").replace(",", ".")
      );
      
      if (!isNaN(valor)) {
        const fonte = inv.fonte?.toUpperCase() || "SIB";
        if (totais[categoria]) {
          totais[categoria][fonte] = (totais[categoria][fonte] || 0) + valor;
          totais[categoria].TOTAL += valor;
        }
      }
    });

    return totais;
  };

  // Calcular resumo do financiamento
  const calcularResumoFinanciamento = () => {
    const investimentos = parseInvestimentos();
    let totalInvestimentos = 0;
    
    investimentos.forEach((inv) => {
      const valor = parseFloat(
        String(inv.valorTotal).replace("R$", "").replace(/\./g, "").replace(",", ".")
      );
      if (!isNaN(valor)) {
        totalInvestimentos += valor;
      }
    });

    const valorImovelNegociado = parseFloat(
      dadosImovel.valorNegociado.replace(".", "").replace(",", ".")
    ) || 177372.96;

    const custoMedicaoInterna = 2500.0;
    const valorITBI = 5000.0;
    const despesasCartorarias = 8000.0;
    const elaboracaoProjeto = 2500.0;
    const valorATER = 18000.0;

    const valorTotalFinanciamento =
      valorImovelNegociado +
      custoMedicaoInterna +
      valorITBI +
      despesasCartorarias +
      elaboracaoProjeto +
      valorATER +
      totalInvestimentos;

    return {
      valorImovelNegociado,
      custoMedicaoInterna,
      valorITBI,
      despesasCartorarias,
      elaboracaoProjeto,
      valorATER,
      totalInvestimentos,
      valorTotalFinanciamento,
    };
  };

  const preAnalise = parsePreAnalise();
  const dadosImovel = parseDadosImovel();
  const beneficiario = parseBeneficiario();
  const investimentos = parseInvestimentos();
  const resumo = calcularResumoFinanciamento();
  const totaisPorCategoria = calcularTotaisPorCategoria(investimentos);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-900 text-gray-100 p-8 print:bg-white print:text-gray-900">
      <Heading
        tabName="Resumo do Financiamento (PAG03)"
        onSave={handlePrint}
        saveButtonText="Imprimir Página 03"
        isAdmin={isAdmin}
      />

      <div className="print:p-4">
        {/* Cabeçalho */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-center mb-4 print:text-base">
            RESUMO DO FINANCIAMENTO
          </h2>
        </div>

        {/* Seção 1: Resumo Financeiro */}
        <div className="mb-6">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-bold w-1/4 print:p-1">
                  VALOR DO IMÓVEL NEGOCIADO
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.valorImovelNegociado)}
                </td>
                <td className="border border-gray-400 p-2 font-bold w-1/4 print:p-1">
                  ELABORAÇÃO DO PROJETO
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.elaboracaoProjeto)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  CUSTO DE MEDIÇÃO INTERNA
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.custoMedicaoInterna)}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR DA ATER
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.valorATER)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR DO ITBI
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.valorITBI)}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR TOTAL DOS INVESTIMENTOS
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.totalInvestimentos)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  DESPESAS CARTORÁRIAS
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.despesasCartorarias)}
                </td>
                <td className="border border-gray-400 p-2 font-bold print:p-1">
                  VALOR TOTAL DO FINANCIAMENTO
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1 bg-yellow-100">
                  {formatCurrency(resumo.valorTotalFinanciamento)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 2: Relação dos Investimentos */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 print:text-xs print:mb-2">
            RELAÇÃO DOS INVESTIMENTOS A SEREM IMPLANTADOS NO {preAnalise.nomeImovel} -{" "}
            {preAnalise.municipio}
          </h3>

          <table className="w-full text-xs border-collapse print:text-xs">
            <thead>
                <tr className="bg-gray-800 print:bg-gray-100">
                <th className="border border-gray-400 p-2 print:p-1 text-left">
                  DESCRIÇÃO BÁSICA DO PROJETO
                </th>
                <th className="border border-gray-400 p-2 print:p-1">
                  UNIDADE DE MEDIDA
                </th>
                <th className="border border-gray-400 p-2 print:p-1">QUANTIDADE</th>
                <th className="border border-gray-400 p-2 print:p-1">
                  VALOR UNITÁRIO
                </th>
                <th className="border border-gray-400 p-2 print:p-1">VALOR TOTAL</th>
                <th className="border border-gray-400 p-2 print:p-1">FONTE</th>
              </tr>
            </thead>
            <tbody>
              {investimentos.length > 0 ? (
                investimentos.map((inv, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-2 print:p-1">
                      {inv.descricao}
                    </td>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {inv.unidade}
                    </td>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {inv.quantidade}
                    </td>
                    <td className="border border-gray-400 p-2 text-right print:p-1">
                      {inv.valorUnitario}
                    </td>
                    <td className="border border-gray-400 p-2 text-right print:p-1">
                      {inv.valorTotal}
                    </td>
                    <td className="border border-gray-400 p-2 text-center print:p-1">
                      {inv.fonte}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="border border-gray-400 p-2 text-center print:p-1"
                  >
                    Nenhum investimento cadastrado
                  </td>
                </tr>
              )}
              {/* Linhas vazias para preencher a tabela */}
              {Array.from({ length: Math.max(0, 10 - investimentos.length) }).map(
                (_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                    <td className="border border-gray-400 p-2 print:p-1">&nbsp;</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Seção 3: Quadro Resumo dos Investimentos */}
        <div className="mb-6">
          <h3 className="text-sm font-bold mb-3 text-center print:text-xs print:mb-2">
            QUADRO RESUMO DOS INVESTIMENTOS
          </h3>

          <table className="w-full text-xs border-collapse print:text-xs">
            <thead>
              <tr className="bg-gray-800 print:bg-gray-100">
                <th className="border border-gray-400 p-2 print:p-1">ITEM</th>
                <th className="border border-gray-400 p-2 print:p-1">SIB</th>
                <th className="border border-gray-400 p-2 print:p-1">PRONAF-A</th>
                <th className="border border-gray-400 p-2 print:p-1">
                  RECURSOS PRÓPRIOS
                </th>
                <th className="border border-gray-400 p-2 print:p-1">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totaisPorCategoria).map(([categoria, valores]) => (
                <tr key={categoria}>
                  <td className="border border-gray-400 p-2 font-semibold print:p-1">
                    {categoria}
                  </td>
                  <td className="border border-gray-400 p-2 text-right print:p-1">
                    {valores.SIB > 0 ? formatCurrency(valores.SIB) : ""}
                  </td>
                  <td className="border border-gray-400 p-2 text-right print:p-1">
                    {valores["PRONAF-A"] > 0
                      ? formatCurrency(valores["PRONAF-A"])
                      : ""}
                  </td>
                  <td className="border border-gray-400 p-2 text-right print:p-1">
                    {valores["RECURSOS PRÓPRIOS"] > 0
                      ? formatCurrency(valores["RECURSOS PRÓPRIOS"])
                      : ""}
                  </td>
                  <td className="border border-gray-400 p-2 text-right print:p-1">
                    {valores.TOTAL > 0 ? formatCurrency(valores.TOTAL) : ""}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-700 font-bold print:bg-gray-200">
                <td className="border border-gray-400 p-2 print:p-1">
                  TOTAL INVESTIDO
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(
                    Object.values(totaisPorCategoria).reduce(
                      (acc, cat) => acc + cat.SIB,
                      0
                    )
                  )}
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(
                    Object.values(totaisPorCategoria).reduce(
                      (acc, cat) => acc + cat["PRONAF-A"],
                      0
                    )
                  )}
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(
                    Object.values(totaisPorCategoria).reduce(
                      (acc, cat) => acc + cat["RECURSOS PRÓPRIOS"],
                      0
                    )
                  )}
                </td>
                <td className="border border-gray-400 p-2 text-right print:p-1">
                  {formatCurrency(resumo.totalInvestimentos)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Seção 4: Termo de Concordância */}
        <div className="mb-6">
          <table className="w-full text-xs border-collapse print:text-xs">
            <tbody>
              <tr>
                <td className="border border-gray-400 p-3 print:p-2" colSpan={2}>
                  <p className="font-bold mb-2">
                    TERMO DE CONCORDÂNCIA DA ELABORAÇÃO DO PROJETO TÉCNICO DE
                    FINANCIAMENTO - PTF.
                  </p>
                  <p className="mb-4">
                    EU, {beneficiario.nomeBeneficiario || preAnalise.nomeCanditato},{" "}
                    DECLARO QUE TODOS OS INVESTIMENTOS PREVISTOS NESTE PTF FORAM
                    DEFINIDOS POR MIM E DISCUTIDOS COM O TÉCNICO RESPONSÁVEL,
                    CONSIDERANDO A VIABILIDADE ECONÔMICA, AMBIENTAL E SUSTENTÁVEL NA
                    CONSTRUÇÃO DO FINANCIAMENTO.
                  </p>
                </td>
                <td className="border border-gray-400 p-3 print:p-2">
                  <p className="font-bold mb-4">
                    ASSINATURA DO POTÊNCIAL BENEFICIÁRIO.
                  </p>
                  <div className="mt-8 pt-4 border-t border-gray-400">
                    <p className="text-center">
                      BENEFICIÁRIO(A):{" "}
                      {beneficiario.nomeBeneficiario || preAnalise.nomeCanditato}
                    </p>
                    <p className="text-center">
                      CPF: {beneficiario.cpfBeneficiario || preAnalise.cpfCandidato}
                    </p>
                  </div>
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
          Imprimir Página 03
        </Button>
      </div>
    </div>
  );
}
