import { useState } from "react";
import IndicadoresTecnicos from "./evolucao-rebanho-indicadores-tecnicos";
import Heading from "./Header";
import EvolucaoRebanhoBovinocultura from "./evolucao-rebanho-bovinocultura";

export default function EvolucaoRebanhoTab({ data, isAdmin }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  console.log(data);
  const anoInicial = 2024; // vai vir como dado do SimuladorPNCF

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {};

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-white">
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
          <div className="bg-blue-700 p-4">
            <h3 className="text-md font-bold leading-6 text-white">
              EVOLUÇÃO DO REBANHO - INDIVIDUAL
            </h3>
          </div>
          <IndicadoresTecnicos
            data={data || []}
            anoInicial={anoInicial}
            formsDisabled={formsDisabled}
          />
        </div>
        <div>
          <div className="bg-blue-700 p-4 mb-8">
            <h3 className="text-md font-bold leading-6 text-white">
              REBANHO: BOVINOCULTURA DE LEITE
            </h3>
          </div>
          <EvolucaoRebanhoBovinocultura
            data={data || []}
            formsDisabled={formsDisabled}
            anoInicial={anoInicial}
          />
        </div>
      </div>
    </div>
  );
}
