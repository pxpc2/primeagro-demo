import { useState } from "react";
import Heading from "./Header";

export default function FluxoCaixaTab({
  fluxoCaixaData,
  isAdmin,
  preAnaliseData,
  dadosImovelData,
  identificacaoBeneficiarioData,
}) {
  console.log("Pre analise data: ");
  console.log(preAnaliseData);

  console.log("Dados imovel data: ");
  console.log(dadosImovelData);

  console.log("Identificacao beneficiario data: ");
  console.log(identificacaoBeneficiarioData);

  const [isLoading, setIsLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  // @TODO
  const [valorSalarioMinimoMensal, setValorSalarioMinimoMensal] = useState(
    fluxoCaixaData?.salario_minimo_mensal || 0.0
  );
  const [municipioReferencia, setMunicipioReferencia] = useState(
    preAnaliseData?.[0]?.campo_3 || ""
  );
  const [nomeImovel, setNomeImovel] = useState(
    dadosImovelData?.[0]?.campo1 || ""
  );
  const [nomeCandidato, setNomeCandidato] = useState(
    identificacaoBeneficiarioData?.[0]?.campo1 || ""
  );
  const [linhaFinanciamento, setLinhaFinanciamento] = useState(
    preAnaliseData?.[0]?.campo_8 || ""
  );

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {};

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        isAdmin={isAdmin}
        isEditing={!formsDisabled}
        isLoading={isLoading}
        onSave={onSave}
        onCancel={handleCancel}
        onEdit={onEdit}
        tabName={"Fluxos de Caixa"}
      />
      <div className="p-4 mt-8 flex flex-row gap-8 items-center justify-center">
        <h1>Ola mundo</h1>
        <h2>Ola 2</h2>
      </div>
    </div>
  );
}
