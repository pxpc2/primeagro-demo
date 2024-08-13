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
  submitSIBDadosProjeto,
  submitSIBValorAvaliado,
} from "@/app/projeto/actions";

export default function SIBTab({ data, isAdmin }) {
  console.log(data);
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  /* Dados do Projeto */
  const [numBeneficiarios, setNumBeneficiarios] = useState(
    data?.dadosProjeto?.numero_beneficiarios || 1
  );
  const [tetoNacional, setTetoNacional] = useState(
    data?.dadosProjeto?.teto_nacional || ""
  );
  const [valorMinimoNegociacao, setValorMinimoNegociacao] = useState(
    data?.dadosImovel?.campo16
      ? (parseFloat(data?.dadosImovel?.campo16) * 0.9).toFixed(2)
      : "Valor avaliado indisp"
  );
  const [valorMaximoNegociacao, setValorMaximoNegociacao] = useState(
    data?.dadosImovel?.campo16
      ? (parseFloat(data?.dadosImovel?.campo16) * 1.1).toFixed(2)
      : "Valor avaliado indisp"
  );
  /* Fim Dados do Projeto */

  /* Valor Avaliado */
  const [valorTerraNua, setValorTerraNua] = useState(
    data?.valorAvaliado?.valor_terra_nua || ""
  );
  const [valorBenfeitorias, setValorBenfeitorias] = useState(
    data?.valorTotalBenfeitorias || ""
  );
  const [valorTotalImovel, setValorTotalImovel] = useState(
    data?.valorAvaliado?.valor_total_imovel || ""
  );
  const [vtiHa, setVtiHa] = useState(data?.valorAvaliado?.vti_ha || "");
  /* Fim Valor Avaliado */

  /* VALOR IMÓVEL + CUSTOS */
  const [valorImovelNegociado, setValorImovelNegociado] = useState(0);

  useEffect(() => {
    const campo17 = data?.dadosImovel?.campo17 || ""; // I15 no excel

    const computedValorImovelNegociado =
      campo17 === "" ? 0 : parseFloat(campo17);

    const formattedValorImovelNegociado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(computedValorImovelNegociado);

    setValorImovelNegociado(formattedValorImovelNegociado);
  }, [data]);

  const [custoMedicaoInterna, setCustoMedicaoInterna] = useState(
    data?.valorImovelCustos?.custoMedicaoInterna || ""
  );
  const [valorITBI, setValorITBI] = useState(
    data?.valorImovelCustos?.valorITBI || ""
  );
  const [despesasCartorarias, setDespesasCartorarias] = useState(
    data?.valorImovelCustos?.despesasCartorarias || ""
  );
  const [elaboracaoProjeto, setElaboracaoProjeto] = useState(
    data?.valorImovelCustos?.elaboracaoProjeto || ""
  );
  const [valorATER, setValorATER] = useState(
    data?.valorImovelCustos?.valorATER || ""
  );
  const [valorTotalDespesas, setValorTotalDespesas] = useState(
    data?.valorImovelCustos?.valorTotalDespesas || ""
  );
  const [valorTotalInvestimentos, setValorTotalInvestimentos] = useState(
    data?.valorImovelCustos?.valorTotalInvestimentos || ""
  );
  const [valorTotalFinanciamento, setValorTotalFinanciamento] = useState(
    data?.valorImovelCustos?.valorTotalFinanciamento || ""
  );
  /* Fim VALOR IMÓVEL + CUSTOS */

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    setLoading(true);
    const response1 = await submitSIBDadosProjeto({
      formData: {
        numBeneficiarios,
        tetoNacional,
        valorMinimoNegociacao,
        valorMaximoNegociacao,
      },
    });
    const response2 = await submitSIBValorAvaliado({
      formData: {
        valorTerraNua,
        valorBenfeitorias,
        valorTotalImovel,
        vtiHa,
      },
    });
    setLoading(false);
    setFormsDisabled(true);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };
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
        <div className="h-screen text-sm py-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-0 justify-between">
              <div>
                <DadosDoProjetoTable
                  formsDisabled={formsDisabled}
                  numBeneficiarios={numBeneficiarios}
                  setNumBeneficiarios={setNumBeneficiarios}
                  tetoNacional={tetoNacional}
                  setTetoNacional={setTetoNacional}
                  valorMinimoNegociacao={valorMinimoNegociacao}
                  setValorMinimoNegociacao={setValorMinimoNegociacao}
                  valorMaximoNegociacao={valorMaximoNegociacao}
                  setValorMaximoNegociacao={setValorMaximoNegociacao}
                />
              </div>
              <div>
                {" "}
                <ValorImovelAvaliadoTable
                  formsDisabled={formsDisabled}
                  valorTerraNua={valorTerraNua}
                  setValorTerraNua={setValorTerraNua}
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
                  setValorImovelNegociado={setValorImovelNegociado}
                  setCustoMedicaoInterna={setCustoMedicaoInterna}
                  valorITBI={data?.valorImovelCustos?.valorITBI || ""}
                  setValorITBI={setValorITBI}
                  despesasCartorarias={
                    data?.valorImovelCustos?.despesasCartorarias || ""
                  }
                  setDespesasCartorarias={setDespesasCartorarias}
                  elaboracaoProjeto={
                    data?.valorImovelCustos?.elaboracaoProjeto || ""
                  }
                  setElaboracaoProjeto={setElaboracaoProjeto}
                  valorATER={data?.valorImovelCustos?.valorATER || ""}
                  setValorATER={setValorATER}
                  valorTotalDespesas={
                    data?.valorImovelCustos?.valorTotalDespesas || ""
                  }
                  setValorTotalDespesas={setValorTotalDespesas}
                  valorTotalInvestimentos={
                    data?.valorImovelCustos?.valorTotalInvestimentos || ""
                  }
                  setValorTotalInvestimentos={setValorTotalInvestimentos}
                  valorTotalFinanciamento={
                    data?.valorImovelCustos?.valorTotalFinanciamento || ""
                  }
                  setValorTotalFinanciamento={setValorTotalFinanciamento}
                />
              </div>
            </div>
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
  setTetoNacional,
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
              onChange={(e) => setTetoNacional(e.target.value)}
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
  setValorTerraNua,
  valorBenfeitorias,
  setValorBenfeitorias,
  valorTotalImovel,
  setValorTotalImovel,
  vtiHa,
  setVtiHa,
}) {
  const [formattedValorBenfeitorias, setFormattedValorBenfeitorias] =
    useState("");
  useEffect(() => {
    if (valorBenfeitorias) {
      setFormattedValorBenfeitorias(formatCurrency(valorBenfeitorias));
    } else {
      setFormattedValorBenfeitorias(formatCurrency("0.0"));
    }
  }, [valorBenfeitorias]);

  const handleValorBenfeitoriasChange = (e) => {
    const value = e.target.value.replace(/[^\d,]/g, "").replace(",", ".");
    setValorBenfeitorias(value);
    setFormattedValorBenfeitorias(formatCurrency(value));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
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
              onChange={(e) => setValorTerraNua(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">2 - VALOR DAS BENFEITORIAS</p>
            <Input
              type="text"
              value={formattedValorBenfeitorias}
              onChange={handleValorBenfeitoriasChange}
              disabled
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
  valorImovelNegociado,
  setValorImovelNegociado,
  custoMedicaoInterna,
  setCustoMedicaoInterna,
  valorITBI,
  setValorITBI,
  despesasCartorarias,
  setDespesasCartorarias,
  elaboracaoProjeto,
  setElaboracaoProjeto,
  valorATER,
  setValorATER,
  valorTotalDespesas,
  setValorTotalDespesas,
  valorTotalInvestimentos,
  setValorTotalInvestimentos,
  valorTotalFinanciamento,
  setValorTotalFinanciamento,
}) {
  const [statusMessage, setStatusMessage] = useState("VALORES VÁLIDOS");
  const [statusColor, setStatusColor] = useState("green-600");

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
              onChange={(e) => setValorImovelNegociado(e.target.value)}
              disabled={true}
              className="bg-blue-800 text-white"
            />
          </div>
          <div>
            <p className="font-semibold">CUSTO DE MEDIÇÃO INTERNA</p>
            <Input
              type="text"
              value={custoMedicaoInterna}
              onChange={(e) => setCustoMedicaoInterna(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DO ITBI</p>
            <Input
              type="text"
              value={valorITBI}
              onChange={(e) => setValorITBI(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">DESPESAS CARTORÁRIAS</p>
            <Input
              type="text"
              value={despesasCartorarias}
              onChange={(e) => setDespesasCartorarias(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">ELABORAÇÃO DO PROJETO</p>
            <Input
              type="text"
              value={elaboracaoProjeto}
              onChange={(e) => setElaboracaoProjeto(e.target.value)}
              disabled={formsDisabled}
            />
          </div>
          <div>
            <p className="font-semibold">VALOR DA ATER</p>
            <Input
              type="text"
              value={valorATER}
              onChange={(e) => setValorATER(e.target.value)}
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
              onChange={(e) => setValorTotalDespesas(e.target.value)}
              disabled={true}
              className="bg-blue-800"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DOS INVESTIMENTOS</p>
            <Input
              type="text"
              value={valorTotalInvestimentos}
              onChange={(e) => setValorTotalInvestimentos(e.target.value)}
              disabled={true}
              className="bg-blue-800"
            />
          </div>
          <div>
            <p className="font-semibold">VALOR TOTAL DO FINANCIAMENTO</p>
            <Input
              type="text"
              value={valorTotalFinanciamento}
              onChange={(e) => setValorTotalFinanciamento(e.target.value)}
              disabled={true}
              className="bg-blue-800"
            />
          </div>
        </div>
      </div>
      <div className={`bg-${statusColor} p-4 text-center font-bold text-white`}>
        {statusMessage}
      </div>
    </div>
  );
}
