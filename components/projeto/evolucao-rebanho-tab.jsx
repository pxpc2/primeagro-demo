import { useState } from "react";
import IndicadoresTecnicos from "./evolucao-rebanho-indicadores-tecnicos";
import Heading from "./Header";
import EvolucaoRebanhoBovinocultura from "./evolucao-rebanho-bovinocultura";
import { submitEvolucaoRebanho } from "@/app/projeto/actions";

export default function EvolucaoRebanhoTab({
  data,
  isAdmin,
  onVendasAnimaisChange,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [indicadoresTecnicosData, setIndicadoresTecnicosData] = useState(
    data?.dadosEvolucaoRebanho[0]?.aba_evolucao_rebanho_indicadores_tecnicos ||
      []
  );
  const [bovinoculturaData, setBovinoculturaData] = useState(data || [{}]);
  const anoInicial = 2024; // vai vir como dado do SimuladorPNCF

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);

      console.log(bovinoculturaData);

      const updatedBovinoculturaData = {
        ...bovinoculturaData[0],
        animaisAdquirir_reprodutores:
          bovinoculturaData?.reprodutoresAdquirir || 0,
        animaisAdquirir_matrizes: bovinoculturaData?.matrizesAdquirir || 0,
        estabilizacao_plantel: bovinoculturaData?.estabilizacao_plantel || 0,
        relacao_matrizes: bovinoculturaData?.relacao_matrizes || 0,
        equivalenciaUA_bezerros:
          bovinoculturaData?.equivalenciaUA_bezerros || 0,
        equivalenciaUA_novilhos:
          bovinoculturaData?.equivalenciaUA_novilhos || 0,
        equivalenciaUA_matrizes:
          bovinoculturaData?.equivalenciaUA_matrizes || 0,
        equivalenciaUA_touro: bovinoculturaData?.equivalenciaUA_touro || 0,
        equivalenciaUA_garrotes:
          bovinoculturaData?.equivalenciaUA_garrotes || 0,
        matrizesDescartadas_ano0:
          bovinoculturaData?.matrizesDescartadas_ano0 || 0,
        novilhaVendida_ano0: bovinoculturaData?.novilhaVendida_ano0 || 0,
        novilhoVendido_ano0: bovinoculturaData?.novilhoVendido_ano0 || 0,
        queijo_ano0: bovinoculturaData?.queijoValues?.[0] || 0,
        queijo_ano1: bovinoculturaData?.queijoValues?.[1] || 0,
        queijo_ano2: bovinoculturaData?.queijoValues?.[2] || 0,
        queijo_ano3: bovinoculturaData?.queijoValues?.[3] || 0,
        queijo_ano4: bovinoculturaData?.queijoValues?.[4] || 0,
        queijo_ano5: bovinoculturaData?.queijoValues?.[5] || 0,
        queijo_ano6: bovinoculturaData?.queijoValues?.[6] || 0,
        queijo_ano7: bovinoculturaData?.queijoValues?.[7] || 0,
        queijo_ano8: bovinoculturaData?.queijoValues?.[8] || 0,
        queijo_ano9: bovinoculturaData?.queijoValues?.[9] || 0,
        queijo_ano10: bovinoculturaData?.queijoValues?.[10] || 0,
      };

      const finalBovinoculturaData = [updatedBovinoculturaData];

      const updatedIndicadoresTecnicosData = indicadoresTecnicosData?.map(
        (item) => {
          const updatedItem = { ...item };
          Object.keys(updatedItem).forEach((key) => {
            if (key.startsWith("ano")) {
              updatedItem[key] = parseInt(updatedItem[key] || 0, 10);
            }
          });

          return updatedItem;
        }
      );

      await submitEvolucaoRebanho({
        indicadoresData: updatedIndicadoresTecnicosData,
        bovinoculturaData: finalBovinoculturaData,
      });

      setFormsDisabled(true);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Evolução do rebanho"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="flex flex-col gap-8">
        <div className="mt-4 flex flex-col gap-8">
          <IndicadoresTecnicos
            data={indicadoresTecnicosData || []}
            anoInicial={anoInicial}
            formsDisabled={formsDisabled}
            onChange={setIndicadoresTecnicosData}
          />
        </div>
        <div>
          <EvolucaoRebanhoBovinocultura
            data={bovinoculturaData || []}
            formsDisabled={formsDisabled}
            anoInicial={anoInicial}
            onChange={setBovinoculturaData}
            onVendasAnimaisChange={onVendasAnimaisChange}
          />
        </div>
      </div>
    </div>
  );
}
