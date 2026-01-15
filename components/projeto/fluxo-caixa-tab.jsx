import { useEffect, useState } from "react";
import Heading from "./Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import { submitFluxoCaixa } from "@/app/projeto/actions";
import { ANO_INICIAL } from "@/utils/constants";

export default function FluxoCaixaTab({
  fluxoCaixaData,
  isAdmin,
  preAnaliseData,
  dadosImovelData,
  identificacaoBeneficiarioData,
  despesasData,
  receitasData,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [valorSalarioMinimoMensal, setValorSalarioMinimoMensal] = useState(
    fluxoCaixaData?.[0]?.valor_salario_minimo || 0.0
  );
  const [municipioReferencia, setMunicipioReferencia] = useState(
    preAnaliseData?.[0]?.campo_3 || ""
  );
  const [nomeImovel, setNomeImovel] = useState(
    dadosImovelData?.[0]?.campo1 || ""
  );
  const [nomeCandidato, setNomeCandidato] = useState(
    identificacaoBeneficiarioData?.campo1 || ""
  );
  const [linhaFinanciamento, setLinhaFinanciamento] = useState(
    preAnaliseData?.[0]?.campo_8 || ""
  );

  const [totalReceitas, setTotalReceitas] = useState(Array(12).fill(0));
  const [totalCustos, setTotalCustos] = useState(Array(12).fill(0));

  useEffect(() => {
    // Calcula receitas totais somando todas as fontes
    const newTotalReceitas = Array(12).fill(0);
    for (let i = 0; i < 10; i++) {
      const totalMatrizes =
        receitasData?.dadosReceita?.valorMatrizesDescartadas?.[i] || 0;
      const totalNovilhos =
        receitasData?.dadosReceita?.valorNovilhosVendidos?.[i] || 0;
      const totalNovilhas =
        receitasData?.dadosReceita?.valorNovilhasVendidas?.[i] || 0;
      const totalQueijo = receitasData?.dadosReceita?.valorQueijo?.[i] || 0;
      const totalLeite =
        receitasData?.dadosReceita?.valorLeiteParaVenda?.[i] || 0;

      newTotalReceitas[i] =
        totalMatrizes +
        totalNovilhos +
        totalNovilhas +
        totalQueijo +
        totalLeite; // é somente a parte de bovinocultura
      /**
       * @TODO adicionar outras receitas (sequeiro, irrigado e outras atividades)
       */

      // Anos 10 e 11 repetem ano 9
      if (i === 9) {
        newTotalReceitas[10] = newTotalReceitas[9];
        newTotalReceitas[11] = newTotalReceitas[9];
      }
    }
    setTotalReceitas(newTotalReceitas);

    // Usa custos JÁ CALCULADOS de Despesas (não recalcula)
    const newCustos = despesasData?.totalCustos || Array(12).fill(0);
    setTotalCustos(newCustos);
    // Gera tabela de fluxo de caixa para 26 anos
    let newTabelaData = [];
    const lucroOperacionalDespesas = despesasData?.lucroOperacional || Array(12).fill(0);

    for (let i = 0; i < 26; i++) {
      const ano = ANO_INICIAL + i;
      let receitas, despesas, lucroOperacional;
      
      // Anos 0-11: usa dados calculados
      if (i < 12) {
        receitas = newTotalReceitas[i];
        despesas = newCustos[i];
        lucroOperacional = lucroOperacionalDespesas[i];
      } 
      // Ano 12: repete ano 11
      else if (i === 12) {
        receitas = newTotalReceitas[11];
        despesas = newCustos[11];
        lucroOperacional = lucroOperacionalDespesas[11];
      } 
      // Anos 13-25: repete ano 10 (período de financiamento)
      else {
        receitas = newTotalReceitas[10];
        despesas = newCustos[10];
        lucroOperacional = lucroOperacionalDespesas[10];
      }

      const totalEncargos = 0; // @TODO: Calcular com base no simulador PNCF/PRONAF
      const capacidadePagamento = lucroOperacional - totalEncargos;
      const totalAmortizacoes = 0; // @TODO: Buscar do simulador PNCF/PRONAF
      const lucroLiquido = capacidadePagamento - totalAmortizacoes;
      const percentualUtilizacao = 0; // @TODO: Calcular percentual usado da capacidade
      const valorLiquidoMensal = lucroLiquido / 12;

      newTabelaData.push({
        ano,
        receitas,
        despesas,
        lucro_operacional: lucroOperacional,
        total_encargos: totalEncargos,
        capacidade_pagamento: capacidadePagamento,
        total_amortizacoes: totalAmortizacoes,
        lucro_liquido: lucroLiquido,
        percentual_utilizacao: percentualUtilizacao,
        valor_liquido_mensal: valorLiquidoMensal,
      });
    }
    setTabelaData(newTabelaData);
  }, [receitasData, despesasData]); // ✅ Re-executa quando Receitas ou Despesas mudam

  const [tabelaData, setTabelaData] = useState(
    fluxoCaixaData?.[0]?.aba_fluxo_de_caixa_tabela || []
  );

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);
      await submitFluxoCaixa({
        salario_minimo: valorSalarioMinimoMensal,
        tableData: tabelaData,
      });
      setFormsDisabled(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        isAdmin={isAdmin}
        isEditing={!formsDisabled}
        isLoading={loading}
        onSave={onSave}
        onCancel={handleCancel}
        onEdit={onEdit}
        tabName={"Fluxos de Caixa"}
      />
      <div className="grid mt-4 grid-cols-2 items-center justify-center gap-8">
        <DadosIniciaisTable
          municipioReferencia={municipioReferencia}
          nomeCandidato={nomeCandidato}
          nomeImovel={nomeImovel}
        />
        <div className="overflow-hidden mt-4 border-gray-800 border shadow sm:rounded-lg text-sm">
          <div className="bg-gray-800 p-4 flex flex-row justify-start gap-12">
            <h3 className="text-md font-bold leading-6 text-gray-200">
              SALÁRIO MÍNIMO MENSAL (R$)
            </h3>
            <Input
              type="number"
              value={valorSalarioMinimoMensal}
              onChange={(e) => setValorSalarioMinimoMensal(e.target.value)}
              disabled={formsDisabled}
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="bg-gray-800 p-4 flex flex-row justify-start gap-12">
          <h3 className="text-md font-bold leading-6 text-gray-200 text-center w-full">
            FLUXO DE CAIXA
          </h3>
        </div>
        <FluxoCaixaTable parcelasData={tabelaData} />
      </div>
    </div>
  );
}

function DadosIniciaisTable({
  municipioReferencia,
  nomeImovel,
  nomeCandidato,
}) {
  return (
    <div className="overflow-hidden mt-4 border-gray-800 border shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-gray-200">
          DADOS INICIAIS
        </h3>
      </div>
      <div className="bg-gray-950 p-4 text-gray-200">
        <Table className="w-full">
          <TableHeader></TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-bold">Município</TableCell>
              <TableCell>{municipioReferencia}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Nome do Imóvel</TableCell>
              <TableCell>{nomeImovel}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold">Nome do Candidato</TableCell>
              <TableCell>{nomeCandidato}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function FluxoCaixaTable({ parcelasData }) {
  const firstHalf = parcelasData.slice(0, 13);
  const secondHalf = parcelasData.slice(13);

  return (
    <div className="flex flex-col gap-12 bg-gray-950">
      {[firstHalf, secondHalf].map((half, index) => (
        <Table key={index} className="w-full border shadow sm:rounded-lg">
          <TableHeader>
            <TableRow>
              <TableCell className="font-bold">DESCRIÇÃO</TableCell>
              {half.map((item) => (
                <TableCell key={item.ano} className="text-center">
                  {item.ano}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              "receitas",
              "despesas",
              "lucro_operacional",
              "total_encargos",
              "capacidade_pagamento",
              "total_amortizacoes",
              "lucro_liquido",
              "percentual_utilizacao",
              "valor_liquido_mensal",
            ].map((field, fieldIndex) => (
              <TableRow key={fieldIndex}>
                <TableCell className="text-gray-200">
                  {field.replace(/_/g, " ").toUpperCase()}
                </TableCell>
                {half.map((item, yearIndex) => (
                  <TableCell key={yearIndex} className="text-center">
                    <Input
                      type="number"
                      value={item[field]}
                      disabled={true}
                      className="text-center"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
