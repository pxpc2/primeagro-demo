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

export default function SIBTab({ data, isAdmin }) {
  console.log(data);
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const [totalInvestedSIB, setTotalInvestedSIB] = useState(0.0);

  /* Dados do Projeto */
  const [numBeneficiarios, setNumBeneficiarios] = useState(
    data?.dadosProjeto?.numero_beneficiarios || 1
  );

  const [tetoNacional, setTetoNacional] = useState("");

  useEffect(() => {
    const initialValue = data?.dadosProjeto?.teto_nacional || 0;
    setTetoNacional(formatCurrency(initialValue));
  }, [data]);

  const handleTetoNacionalChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setTetoNacional(formatCurrency(value));
  };

  const [valorMinimoNegociacao, setValorMinimoNegociacao] = useState("");

  useEffect(() => {
    const initialValue = data?.dadosImovel?.campo16
      ? parseFloat(data?.dadosImovel?.campo16) * 0.9
      : 0;
    setValorMinimoNegociacao(formatCurrency(initialValue));
  }, [data]);

  const [valorMaximoNegociacao, setValorMaximoNegociacao] = useState("");

  useEffect(() => {
    const initialValue = data?.dadosImovel?.campo16
      ? parseFloat(data?.dadosImovel?.campo16) * 1.1
      : 0;
    setValorMaximoNegociacao(formatCurrency(initialValue));
  }, [data]);
  /* Fim Dados do Projeto */

  /* Valor Avaliado */
  const [valorTerraNua, setValorTerraNua] = useState("");

  useEffect(() => {
    const initialValue = data?.valorAvaliado?.valor_terra_nua || 0;
    setValorTerraNua(formatCurrency(initialValue));
  }, [data]);

  const handleValorTerraNuaChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setValorTerraNua(formatCurrency(value));
  };

  const [valorBenfeitorias, setValorBenfeitorias] = useState("");

  useEffect(() => {
    const initialValue = data?.valorTotalBenfeitorias || 0;
    setValorBenfeitorias(formatCurrency(initialValue));
  }, [data]);

  const [valorTotalImovel, setValorTotalImovel] = useState("");

  useEffect(() => {
    const initialValue = data?.valorAvaliado?.valor_total_imovel || 0;
    setValorTotalImovel(formatCurrency(initialValue));
  }, [data]);

  const [vtiHa, setVtiHa] = useState(data?.valorAvaliado?.vti_ha || "");
  /* Fim Valor Avaliado */

  /* VALOR IMÓVEL + CUSTOS */
  const [valorImovelNegociado, setValorImovelNegociado] = useState(0);

  const [custoMedicaoInterna, setCustoMedicaoInterna] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.custoMedicaoInterna || 0;
    setCustoMedicaoInterna(formatCurrency(initialValue));
  }, [data]);

  const handleCustoMedicaoInternaChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setCustoMedicaoInterna(formatCurrency(value));
  };

  const [valorITBI, setValorITBI] = useState("");

  const [despesasCartorarias, setDespesasCartorarias] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.despesasCartorarias || 0;
    setDespesasCartorarias(formatCurrency(initialValue));
  }, [data]);

  const handleDespesasCartorariasChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setDespesasCartorarias(formatCurrency(value));
  };

  const [elaboracaoProjeto, setElaboracaoProjeto] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.elaboracaoProjeto || 0;
    setElaboracaoProjeto(formatCurrency(initialValue));
  }, [data]);

  const handleElaboracaoProjetoChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setElaboracaoProjeto(formatCurrency(value));
  };

  const [valorATER, setValorATER] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorATER || 0;
    setValorATER(formatCurrency(initialValue));
  }, [data]);

  const handleValorATERChange = (e) => {
    let value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    value = parseFloat(value || 0);
    setValorATER(formatCurrency(value));
  };

  const [valorTotalDespesas, setValorTotalDespesas] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorTotalDespesas || 0;
    setValorTotalDespesas(formatCurrency(initialValue));
  }, [data]);

  const [valorTotalInvestimentos, setValorTotalInvestimentos] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorTotalInvestimentos || 0;
    setValorTotalInvestimentos(formatCurrency(initialValue));
  }, [data]);

  const [valorTotalFinanciamento, setValorTotalFinanciamento] = useState("");

  useEffect(() => {
    const initialValue = data?.valorImovelCustos?.valorTotalFinanciamento || 0;
    setValorTotalFinanciamento(formatCurrency(initialValue));
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
        tetoNacional: parseCurrency(tetoNacional),
        valorMinimoNegociacao: parseCurrency(valorMinimoNegociacao),
        valorMaximoNegociacao: parseCurrency(valorMaximoNegociacao),
      },
    });
    const response2 = await submitSIBValorAvaliado({
      formData: {
        valorTerraNua: parseCurrency(valorTerraNua),
        valorBenfeitorias: parseCurrency(valorBenfeitorias),
        valorTotalImovel: parseCurrency(valorTotalImovel),
        vtiHa,
      },
    });
    const response3 = await submitSIBCustos({
      formData: {
        valorImovelNegociado: parseCurrency(valorImovelNegociado),
        custoMedicaoInterna: parseCurrency(custoMedicaoInterna),
        valorITBI: parseCurrency(valorITBI),
        despesasCartorarias: parseCurrency(despesasCartorarias),
        elaboracaoProjeto: parseCurrency(elaboracaoProjeto),
        valorATER: parseCurrency(valorATER),
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
    const campo17 = data?.dadosImovel?.campo17 || "";
    const computedValorImovelNegociado =
      campo17 === "" ? 0 : parseFloat(campo17);
    const formattedValorImovelNegociado = formatCurrency(
      computedValorImovelNegociado
    );
    setValorImovelNegociado(formattedValorImovelNegociado);

    const valorITBI = calculateValorITBI(computedValorImovelNegociado);
    const formattedValorITBI = formatCurrency(valorITBI);
    setValorITBI(formattedValorITBI);

    const valoresH5aH9 = [
      parseCurrency(custoMedicaoInterna),
      parseCurrency(valorITBI),
      parseCurrency(despesasCartorarias),
      parseCurrency(elaboracaoProjeto),
      parseCurrency(valorATER),
    ];
    const totalDespesas = calculateValorTotalDespesas(
      computedValorImovelNegociado,
      valoresH5aH9
    );
    const formattedTotalDespesas = formatCurrency(totalDespesas);
    setValorTotalDespesas(formattedTotalDespesas);
  }, [
    data,
    custoMedicaoInterna,
    valorITBI,
    despesasCartorarias,
    elaboracaoProjeto,
    valorATER,
  ]);
  // FIM USE EFFECT GERAL

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"SIB"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
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
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-blue-700 p-4">
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
              type="text"
              value={tetoNacional}
              onChange={handleTetoNacionalChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">
              VALOR MÍNIMO PARA NEGOCIAÇÃO / FAMÍLIA
            </p>
            <Input type="text" value={valorMinimoNegociacao} disabled />
          </div>
          <div>
            <p className="font-semibold">
              VALOR MÁXIMO PARA NEGOCIAÇÃO / FAMÍLIA
            </p>
            <Input type="text" value={valorMaximoNegociacao} disabled />
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
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-blue-700 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          VALOR DO IMÓVEL AVALIADO
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">1 - VALOR DE TERRA NUA</p>
            <Input
              type="text"
              value={valorTerraNua}
              onChange={handleValorTerraNuaChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">2 - VALOR DAS BENFEITORIAS</p>
            <Input
              type="text"
              value={valorBenfeitorias}
              disabled
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">3 - VALOR TOTAL DO IMÓVEL</p>
            <Input
              type="text"
              value={valorTotalImovel}
              onChange={(e) => setValorTotalImovel(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">4 - VTI/HA</p>
            <Input
              type="text"
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
    parseCurrency(valorImovelNegociado) +
    parseCurrency(valorTotalDespesas) +
    parseCurrency(valorTotalInvestimentos);

  useEffect(() => {
    if (valorTotalInvestimentos < 0) {
      setStatusMessage("VERIFIQUE SEU PROJETO");
      setStatusColor("bg-red-600");
    } else if (parseCurrency(valorImovelNegociado) === 0) {
      setStatusMessage("");
    } else if (
      valorTotalFinanciamento >
      parseCurrency(valorImovelNegociado) * 2
    ) {
      setStatusMessage("VERIFIQUE SEU PROJETO");
      setStatusColor("bg-red-600");
    } else if (valorTotalFinanciamento > parseCurrency(tetoNacional)) {
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
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm mt-0">
      <div className="bg-blue-700 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          VALOR DO IMÓVEL + CUSTOS
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">VALOR DO IMÓVEL NEGOCIADO</p>
            <Input
              type="text"
              value={valorImovelNegociado}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">CUSTO DE MEDIÇÃO INTERNA</p>
            <Input
              type="text"
              value={custoMedicaoInterna}
              onChange={handleCustoMedicaoInternaChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DO ITBI</p>
            <Input
              type="text"
              value={valorITBI}
              onChange={(e) => setValorITBI(e.target.value)}
              disabled={true}
            />
          </div>
          <div>
            <p className="font-semibold">DESPESAS CARTORÁRIAS</p>
            <Input
              type="text"
              value={despesasCartorarias}
              onChange={handleDespesasCartorariasChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">ELABORAÇÃO DO PROJETO</p>
            <Input
              type="text"
              value={elaboracaoProjeto}
              onChange={handleElaboracaoProjetoChange}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DA ATER</p>
            <Input
              type="text"
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
              type="text"
              value={valorTotalDespesas}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DOS INVESTIMENTOS</p>
            <Input
              type="text"
              value={formatCurrency(valorTotalInvestimentos)}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DO FINANCIAMENTO</p>
            <Input
              type="text"
              value={formatCurrency(valorTotalFinanciamento)}
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
  const somasCategorias = categorias.reduce((acc, category) => {
    acc[category] = { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 };
    return acc;
  }, {});
  data?.dadosInvestimentos?.dadosInvestimentos?.forEach((investimento) => {
    const { categoria, fonte_financiamento, valor_total } = investimento;

    const valor = parseCurrency(valor_total);

    if (fonte_financiamento === "SIB") {
      somasCategorias[categoria].SIB += valor;
    } else if (fonte_financiamento === "PRONAF-A") {
      somasCategorias[categoria].PRONAF_A += valor;
    } else if (fonte_financiamento === "Recursos Próprios") {
      somasCategorias[categoria].Recursos_Proprios += valor;
    }

    somasCategorias[categoria].Total += valor;
  });
  const totalInvested = categorias.reduce(
    (acc, category) => {
      acc.SIB += somasCategorias[category].SIB;
      acc.PRONAF_A += somasCategorias[category].PRONAF_A;
      acc.Recursos_Proprios += somasCategorias[category].Recursos_Proprios;
      acc.Total += somasCategorias[category].Total;
      return acc;
    },
    { SIB: 0, PRONAF_A: 0, Recursos_Proprios: 0, Total: 0 }
  );

  useEffect(() => {
    setTotalInvestedSIB(totalInvested.SIB);
  }, [totalInvested.SIB, setTotalInvestedSIB]);

  return (
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm mt-4">
      <div className="bg-blue-700 p-4">
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
                  {formatCurrency(somasCategorias[category].SIB)}
                </td>
                <td className="text-right p-2">
                  {formatCurrency(somasCategorias[category].PRONAF_A)}
                </td>
                <td className="text-right p-2">
                  {formatCurrency(somasCategorias[category].Recursos_Proprios)}
                </td>
                <td className="text-right p-2">
                  {formatCurrency(somasCategorias[category].Total)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="text-left p-2 font-bold bg-blue-700 text-white">
                TOTAL INVESTIDO
              </td>
              <td className="text-right p-2 font-bold bg-blue-700 text-white">
                {formatCurrency(totalInvested.SIB)}
              </td>
              <td className="text-right p-2 font-bold bg-blue-700 text-white">
                {formatCurrency(totalInvested.PRONAF_A)}
              </td>
              <td className="text-right p-2 font-bold bg-blue-700 text-white">
                {formatCurrency(totalInvested.Recursos_Proprios)}
              </td>
              <td className="text-right p-2 font-bold bg-blue-700 text-white">
                {formatCurrency(totalInvested.Total)}
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
