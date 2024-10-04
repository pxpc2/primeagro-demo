"use client";

import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  submitSIBCustos,
  submitSIBDadosProjeto,
  submitSIBValorAvaliado,
} from "@/app/projeto/actions";
import { INVESTIMENTO_CATEGORIAS } from "@/utils/constants";

function parseCurrency(value) {
  if (typeof value === "string") {
    return parseFloat(
      value.replace(/\./g, "").replace(",", ".").replace("R$", "").trim()
    );
  }
  return parseFloat(value) || 0;
}

function calculateValorITBI(value) {
  if (!value || isNaN(value)) {
    return 0;
  }

  const result = Math.ceil(value * 0.02);
  return result;
}

function calculateValorTotalDespesas(valorImovelNegociado, values) {
  if (valorImovelNegociado === 0) {
    return 0;
  }

  const sum = values.reduce((acc, curr) => acc + (parseFloat(curr) || 0), 0);
  return sum;
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export default function SIBTab({ data, isAdmin, dadosImovel }) {
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [totalInvestedSIB, setTotalInvestedSIB] = useState(0.0);

  console.log(data);

  /* Dados do Projeto */
  const [numBeneficiarios, setNumBeneficiarios] = useState(
    data?.dadosProjeto?.numero_beneficiarios || 1
  );

  const [tetoNacional, setTetoNacional] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.dadosProjeto?.teto_nacional || 0.0;
    setTetoNacional(initialValue);
  }, [data]);

  const handleTetoNacionalChange = (e) => {
    setTetoNacional(e.target.value);
  };

  const [valorMinimoNegociacao, setValorMinimoNegociacao] = useState(0.0);

  useEffect(() => {
    const initialValue = dadosImovel?.[0]?.campo16
      ? parseFloat(dadosImovel?.[0]?.campo16) * 0.9
      : 0;
    setValorMinimoNegociacao(initialValue);
  }, []);

  const [valorMaximoNegociacao, setValorMaximoNegociacao] = useState(0.0);

  useEffect(() => {
    const initialValue = dadosImovel?.[0]?.campo16
      ? parseFloat(dadosImovel?.[0]?.campo16) * 1.1
      : 0;
    setValorMaximoNegociacao(initialValue);
  }, []);
  /* Fim Dados do Projeto */

  /* Valor Avaliado */
  const [valorTerraNua, setValorTerraNua] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorAvaliado?.valor_terra_nua || 0.0;
    setValorTerraNua(initialValue);
  }, [data]);

  const handleValorTerraNuaChange = (e) => {
    setValorTerraNua(e.target.value);
  };

  const [valorBenfeitorias, setValorBenfeitorias] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorTotalBenfeitorias || 0.0;
    setValorBenfeitorias(initialValue);
  }, [data]);

  const [valorTotalImovel, setValorTotalImovel] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorAvaliado?.valor_total_imovel || 0.0;
    setValorTotalImovel(initialValue);
  }, [data]);

  const [vtiHa, setVtiHa] = useState(data?.valorAvaliado?.vti_ha || 0.0);
  /* Fim Valor Avaliado */

  /* VALOR IMÓVEL + CUSTOS */
  const [valorImovelNegociado, setValorImovelNegociado] = useState(
    dadosImovel?.[0]?.campo17 || 0.0
  );

  console.log(valorImovelNegociado);

  const [custoMedicaoInterna, setCustoMedicaoInterna] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.custoMedicaoInterna || 0.0;
    setCustoMedicaoInterna(initialValue);
  }, [data]);

  const handleCustoMedicaoInternaChange = (e) => {
    setCustoMedicaoInterna(e.target.value);
  };

  const [valorITBI, setValorITBI] = useState(0.0);

  useEffect(() => {
    setValorITBI(valorImovelNegociado * 0.02);
  }, [valorImovelNegociado]);

  const [despesasCartorarias, setDespesasCartorarias] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.despesasCartorarias || 0.0;
    setDespesasCartorarias(initialValue);
  }, [data]);

  const handleDespesasCartorariasChange = (e) => {
    setDespesasCartorarias(e.target.value);
  };

  const [elaboracaoProjeto, setElaboracaoProjeto] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.elaboracaoProjeto || 0.0;
    setElaboracaoProjeto(initialValue);
  }, [data]);

  const handleElaboracaoProjetoChange = (e) => {
    setElaboracaoProjeto(e.target.value);
  };

  const [valorATER, setValorATER] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorATER || 0.0;
    setValorATER(initialValue);
  }, [data]);

  const handleValorATERChange = (e) => {
    setValorATER(e.target.value);
  };

  const [valorTotalDespesas, setValorTotalDespesas] = useState(0.0);

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorTotalDespesas || 0.0;
    setValorTotalDespesas(initialValue);
  }, [data]);

  const [valorTotalInvestimentos, setValorTotalInvestimentos] = useState(0.0);

  useEffect(() => {
    const initialValue =
      data?.valorImovelCustos?.valorTotalInvestimentos || 0.0;
    setValorTotalInvestimentos(initialValue);
  }, [data]);

  const [valorTotalFinanciamento, setValorTotalFinanciamento] = useState(0.0);

  useEffect(() => {
    const initialValue =
      data?.valorImovelCustos?.valorTotalFinanciamento || 0.0;
    setValorTotalFinanciamento(initialValue);
  }, [data]);
  /* Fim VALOR IMÓVEL + CUSTOS */

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    setLoading(true);
    const response1 = await submitSIBDadosProjeto({
      formData: {
        numBeneficiarios,
        tetoNacional: tetoNacional,
        valorMinimoNegociacao: valorMinimoNegociacao,
        valorMaximoNegociacao: valorMaximoNegociacao,
      },
    });
    const response2 = await submitSIBValorAvaliado({
      formData: {
        valorTerraNua: valorTerraNua,
        valorBenfeitorias: valorBenfeitorias,
        valorTotalImovel: valorTotalImovel,
        vtiHa,
      },
    });
    const response3 = await submitSIBCustos({
      formData: {
        valorImovelNegociado: valorImovelNegociado,
        custoMedicaoInterna: custoMedicaoInterna,
        valorITBI: valorITBI,
        despesasCartorarias: despesasCartorarias,
        elaboracaoProjeto: elaboracaoProjeto,
        valorATER: valorATER,
      },
    });
    setLoading(false);
    setFormsDisabled(true);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

  // USE EFFECT GERAL (CALCULOS INICIAIS NECESSARIOS)
  useEffect(() => {
    const valoresH5aH9 = [
      custoMedicaoInterna,
      valorITBI,
      despesasCartorarias,
      elaboracaoProjeto,
      valorATER,
    ];
    const totalDespesas = calculateValorTotalDespesas(
      valorImovelNegociado,
      valoresH5aH9
    );
    setValorTotalDespesas(totalDespesas);
  }, [
    custoMedicaoInterna,
    despesasCartorarias,
    elaboracaoProjeto,
    valorATER,
    valorITBI,
    valorImovelNegociado,
  ]);
  // FIM USE EFFECT GERAL

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"SIB"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2  flex flex-col gap-8">
        <div className="h-full text-sm py-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-0 justify-between">
              <div>
                <DadosDoProjetoTable
                  formsDisabled={formsDisabled}
                  numBeneficiarios={numBeneficiarios}
                  setNumBeneficiarios={setNumBeneficiarios}
                  tetoNacional={tetoNacional}
                  handleTetoNacionalChange={handleTetoNacionalChange}
                  valorMinimoNegociacao={valorMinimoNegociacao}
                  valorMaximoNegociacao={valorMaximoNegociacao}
                />
              </div>
              <div>
                <ValorImovelAvaliadoTable
                  formsDisabled={formsDisabled}
                  valorTerraNua={valorTerraNua}
                  handleValorTerraNuaChange={handleValorTerraNuaChange}
                  valorBenfeitorias={valorBenfeitorias}
                  setValorBenfeitorias={setValorBenfeitorias}
                  valorTotalImovel={valorTotalImovel}
                  setValorTotalImovel={setValorTotalImovel}
                  vtiHa={vtiHa}
                  setVtiHa={setVtiHa}
                />
              </div>
            </div>
            <div>
              <div>
                <ValorImovelCustosTable
                  formsDisabled={formsDisabled}
                  valorImovelNegociado={valorImovelNegociado}
                  custoMedicaoInterna={custoMedicaoInterna}
                  handleCustoMedicaoInternaChange={
                    handleCustoMedicaoInternaChange
                  }
                  valorITBI={valorITBI}
                  setValorITBI={setValorITBI}
                  despesasCartorarias={despesasCartorarias}
                  handleDespesasCartorariasChange={
                    handleDespesasCartorariasChange
                  }
                  elaboracaoProjeto={elaboracaoProjeto}
                  handleElaboracaoProjetoChange={handleElaboracaoProjetoChange}
                  valorATER={valorATER}
                  handleValorATERChange={handleValorATERChange}
                  valorTotalDespesas={valorTotalDespesas}
                  valorTotalInvestimentos={totalInvestedSIB}
                  tetoNacional={tetoNacional}
                />
              </div>
            </div>
          </div>
          <div className="pt-8">
            <QuadroResumoInvestimentos
              formsDisabled={formsDisabled}
              data={data}
              setTotalInvestedSIB={setTotalInvestedSIB}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DadosDoProjetoTable({
  formsDisabled,
  numBeneficiarios,
  setNumBeneficiarios,
  tetoNacional,
  handleTetoNacionalChange,
  valorMinimoNegociacao,
  valorMaximoNegociacao,
}) {
  return (
    <div className="overflow-hidden border shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          DADOS DO PROJETO
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Nº DE BENEFICIÁRIOS</p>
            <Input
              type="number"
              value={numBeneficiarios}
              onChange={(e) => setNumBeneficiarios(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">TETO NACIONAL</p>
            <Input
              type="number"
              step="0.01"
              value={tetoNacional}
              onChange={handleTetoNacionalChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">
              VALOR MÍNIMO PARA NEGOCIAÇÃO / FAMÍLIA
            </p>
            <Input
              type="number"
              step="0.01"
              value={valorMinimoNegociacao}
              disabled
            />
          </div>
          <div>
            <p className="font-semibold">
              VALOR MÁXIMO PARA NEGOCIAÇÃO / FAMÍLIA
            </p>
            <Input
              type="number"
              step="0.01"
              value={valorMaximoNegociacao}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValorImovelAvaliadoTable({
  formsDisabled,
  valorTerraNua,
  handleValorTerraNuaChange,
  valorBenfeitorias,
  valorTotalImovel,
  setValorTotalImovel,
  vtiHa,
  setVtiHa,
}) {
  return (
    <div className="overflow-hidden border shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          VALOR DO IMÓVEL AVALIADO
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">1 - VALOR DE TERRA NUA</p>
            <Input
              type="number"
              step="0.01"
              value={valorTerraNua}
              onChange={handleValorTerraNuaChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">2 - VALOR DAS BENFEITORIAS</p>
            <Input
              type="number"
              step="0.01"
              value={valorBenfeitorias}
              disabled
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">3 - VALOR TOTAL DO IMÓVEL</p>
            <Input
              type="number"
              step="0.01"
              value={valorTotalImovel}
              onChange={(e) => setValorTotalImovel(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">4 - VTI/HA</p>
            <Input
              type="number"
              step="0.01"
              value={vtiHa}
              onChange={(e) => setVtiHa(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ValorImovelCustosTable({
  formsDisabled,
  valorImovelNegociado, // H4
  custoMedicaoInterna,
  handleCustoMedicaoInternaChange,
  valorITBI,
  setValorITBI,
  despesasCartorarias,
  handleDespesasCartorariasChange,
  elaboracaoProjeto,
  handleElaboracaoProjetoChange,
  valorATER,
  handleValorATERChange,
  valorTotalDespesas,
  valorTotalInvestimentos, // B20
  tetoNacional, // B5
}) {
  const [statusMessage, setStatusMessage] = useState("VALORES VÁLIDOS");
  const [statusColor, setStatusColor] = useState("bg-green-600");

  // H12
  const valorTotalFinanciamento =
    parseFloat(valorImovelNegociado) +
    parseFloat(valorTotalDespesas) +
    parseFloat(valorTotalInvestimentos);

  console.log(
    `Valor total financiamento (${valorTotalFinanciamento}) = valorImovelNegociado (${valorImovelNegociado}) + valorTotalDespesas (${valorTotalDespesas}) + valorTotalInvestimentos (${valorTotalInvestimentos})`
  );

  // K11 (tava escondido)
  const valorTotalInvestimentosAlternativo =
    parseFloat(valorImovelNegociado) - parseFloat(valorTotalDespesas);

  // K12
  const valorTotalFinanciamentoAlternativo =
    parseFloat(valorImovelNegociado) +
    parseFloat(valorTotalDespesas) +
    parseFloat(valorTotalInvestimentosAlternativo);

  useEffect(() => {
    if (valorTotalInvestimentos < 0) {
      setStatusMessage("VERIFIQUE SEU PROJETO");
      setStatusColor("bg-red-600");
    } else if (valorImovelNegociado === 0) {
      setStatusMessage("");
    } else if (valorTotalFinanciamento > valorImovelNegociado * 2) {
      setStatusMessage("VERIFIQUE SEU PROJETO");
      setStatusColor("bg-red-600");
    } else if (valorTotalFinanciamento > tetoNacional) {
      setStatusMessage("VERIFIQUE SEU PROJETO");
      setStatusColor("bg-red-600");
    } else {
      setStatusMessage("VALORES VÁLIDOS");
      setStatusColor("bg-green-600");
    }
  }, [
    valorImovelNegociado,
    valorTotalDespesas,
    valorTotalInvestimentos,
    tetoNacional,
    valorTotalFinanciamento,
  ]);

  return (
    <div className="overflow-hidden border  shadow sm:rounded-lg text-sm mt-0">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          VALOR DO IMÓVEL + CUSTOS
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">VALOR DO IMÓVEL NEGOCIADO</p>
            <Input
              type="number"
              step="0.01"
              value={valorImovelNegociado}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">CUSTO DE MEDIÇÃO INTERNA</p>
            <Input
              type="number"
              step="0.01"
              value={custoMedicaoInterna}
              onChange={handleCustoMedicaoInternaChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DO ITBI</p>
            <Input
              type="number"
              step="0.01"
              value={valorITBI}
              disabled={true}
            />
          </div>
          <div>
            <p className="font-semibold">DESPESAS CARTORÁRIAS</p>
            <Input
              type="number"
              step="0.01"
              value={despesasCartorarias}
              onChange={handleDespesasCartorariasChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">ELABORAÇÃO DO PROJETO</p>
            <Input
              type="number"
              step="0.01"
              value={elaboracaoProjeto}
              onChange={handleElaboracaoProjetoChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DA ATER</p>
            <Input
              type="number"
              step="0.01"
              value={valorATER}
              onChange={handleValorATERChange}
              disabled={formsDisabled}
            />
          </div>
        </div>

        {/* Single column for the last three fields */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <p className="font-semibold">VALOR TOTAL DAS DESPESAS</p>
            <Input
              type="number"
              step="0.01"
              value={valorTotalDespesas}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DOS INVESTIMENTOS</p>
            <Input
              type="number"
              step="0.01"
              value={valorTotalInvestimentos}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DO FINANCIAMENTO</p>
            <Input
              type="number"
              step="0.01"
              value={valorTotalFinanciamento}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
        </div>
      </div>
      <div className={`${statusColor} p-4 text-center font-bold text-white`}>
        {statusMessage}
      </div>
    </div>
  );
}

function QuadroResumoInvestimentos({
  data,
  formsDisableds,
  setTotalInvestedSIB,
}) {
  const categorias = INVESTIMENTO_CATEGORIAS;
  const somasCategorias = categorias.reduce((acc, categoria) => {
    acc[categoria] = { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 };
    return acc;
  }, {});
  data?.dadosInvestimentos?.dadosInvestimentos?.forEach((investimento) => {
    console.log(investimento);
    const { categoria, fonte_financiamento, valor_total } = investimento;

    const valor = parseCurrency(valor_total);

    if (fonte_financiamento === "SIB") {
      console.log(categoria);
      somasCategorias[categoria].SIB += valor;
    } else if (fonte_financiamento === "PRONAF-A") {
      somasCategorias[categoria].PRONAF_A += valor;
    } else if (fonte_financiamento === "Recursos Próprios") {
      somasCategorias[categoria].Recursos_Proprios += valor;
    }

    somasCategorias[categoria].Total += valor;
  });
  const totalInvested = categorias.reduce(
    (acc, categoria) => {
      acc.SIB += somasCategorias[categoria].SIB;
      acc.PRONAF_A += somasCategorias[categoria].PRONAF_A;
      acc.Recursos_Proprios += somasCategorias[categoria].Recursos_Proprios;
      acc.Total += somasCategorias[categoria].Total;
      return acc;
    },
    { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 }
  );

  useEffect(() => {
    setTotalInvestedSIB(totalInvested.SIB);
  }, [totalInvested.SIB, setTotalInvestedSIB]);

  return (
    <div className="overflow-hidden border shadow sm:rounded-lg text-sm mt-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-center text-white">
          QUADRO RESUMO DOS INVESTIMENTOS
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2">ITEM</th>
              <th className="text-right p-2">SIB</th>
              <th className="text-right p-2">PRONAF-A</th>
              <th className="text-right p-2">RECURSOS PRÓPRIOS</th>
              <th className="text-right p-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((category, index) => (
              <tr key={index}>
                <td className="text-left p-2">{category}</td>
                <td className="text-right p-2">
                  {somasCategorias[category].SIB}
                </td>
                <td className="text-right p-2">
                  {somasCategorias[category].PRONAF_A}
                </td>
                <td className="text-right p-2">
                  {somasCategorias[category].Recursos_Proprios}
                </td>
                <td className="text-right p-2">
                  {somasCategorias[category].Total}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left p-2 font-bold bg-gray-800 text-white">
                TOTAL INVESTIDO
              </td>
              <td className="text-right p-2 font-bold bg-gray-800 text-white">
                {totalInvested.SIB}
              </td>
              <td className="text-right p-2 font-bold bg-gray-800 text-white">
                {totalInvested.PRONAF_A}
              </td>
              <td className="text-right p-2 font-bold bg-gray-800 text-white">
                {totalInvested.Recursos_Proprios}
              </td>
              <td className="text-right p-2 font-bold bg-gray-800 text-white">
                {totalInvested.Total}
              </td>
            </tr>
            <tr>
              <td className="text-left p-2 font-bold bg-gray-300">
                VALORES DISPONÍVEIS E NÃO INVESTIDOS
              </td>
              <td className="text-right p-2 font-bold bg-gray-300">0,00</td>
              <td className="text-right p-2 font-bold bg-gray-300">0,00</td>
              <td className="text-right p-2 font-bold bg-gray-300">0,00</td>
              <td className="text-right p-2 font-bold bg-gray-300">0,00</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
