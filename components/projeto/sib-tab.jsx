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
    data?.dadosProjeto[0]?.numero_beneficiarios || 1
  );
  const [tetoNacional, setTetoNacional] = useState(
    data?.dadosProjeto[0]?.teto_nacional || ""
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
    data?.valorAvaliado[0]?.valorTerraNua || ""
  );
  const [valorBenfeitorias, setValorBenfeitorias] = useState(
    data?.valorTotalBenfeitorias || ""
  );
  const [valorTotalImovel, setValorTotalImovel] = useState(
    data?.valorAvaliado[0]?.valorTotalImovel || ""
  );
  const [vtiHa, setVtiHa] = useState(data?.valorAvaliado[0]?.vtiHa || "");
  /* Fim Valor Avaliado */

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
            <div className="flex flex-col gap-8">
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
              <div></div>
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
      setFormattedValorBenfeitorias("indisp");
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
