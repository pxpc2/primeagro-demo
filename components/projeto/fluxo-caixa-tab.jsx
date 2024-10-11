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

  console.log(fluxoCaixaData);

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

  useEffect(() => {
    const initialParcelas = [];
    for (let i = 0; i < 26; i++) {
      const ano = ANO_INICIAL + i;
      initialParcelas.push({
        ano,
        receitas: 0.0,
        despesas: 0.0,
        lucro_operacional: 0.0,
        total_encargos: 0.0,
        capacidade_pagamento: 0.0,
        total_amortizacoes: 0.0,
        lucro_liquido: 0.0,
        percentual_utilizacao: 0.0,
        valor_liquido_mensal: 0.0,
      });
    }
    setTabelaData(initialParcelas);
  }, []);

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
