import { useState } from "react";
import IndicadoresTecnicos from "./evolucao-rebanho-indicadores-tecnicos";
import Heading from "./Header";
import EvolucaoRebanhoBovinocultura from "./evolucao-rebanho-bovinocultura";
import { submitEvolucaoRebanho } from "@/app/projeto/actions";

export default function EvolucaoRebanhoTab({ data, isAdmin }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [indicadoresTecnicosData, setIndicadoresTecnicosData] = useState(
    data?.dadosEvolucaoRebanho[0]?.aba_evolucao_rebanho_indicadores_tecnicos ||
      []
  );
  const [bovinoculturaData, setBovinoculturaData] = useState(data || []);
  const anoInicial = 2024; // vai vir como dado do SimuladorPNCF

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);

      const updatedBovinoculturaData = {
        ...bovinoculturaData[0],
        animaisAdquirir_reprodutores: bovinoculturaData.reprodutoresAdquirir,
        animaisAdquirir_matrizes: bovinoculturaData.matrizesAdquirir,
        estabilizacao_plantel: bovinoculturaData.estabilizacao_plantel,
        relacao_matrizes: bovinoculturaData.relacao_matrizes,
      };

      const finalBovinoculturaData = [updatedBovinoculturaData];

      const updatedIndicadoresTecnicosData = indicadoresTecnicosData.map(
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
          />
        </div>
      </div>
    </div>
  );
}
