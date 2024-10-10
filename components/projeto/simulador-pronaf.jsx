import { useState } from "react";
import Heading from "./Header";

export default function SimuladorPRONAF({
  data,
  isAdmin,
  preAnaliseData,
  sibData,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  console.log(sibData);

  const [municipio, setMunicipio] = useState(
    preAnaliseData?.[0]?.campo_3 || ""
  );
  const [nomeImovel, setNomeImovel] = useState(
    preAnaliseData?.[0]?.campo_4 || ""
  );
  const [areaAdquirida, setAreaAdquirida] = useState(
    preAnaliseData?.[0]?.campo_7 || ""
  );
  const [prazoCarencia, setPrazoCarencia] = useState(0);
  const [prazoJuros, setPrazoJuros] = useState(0.0);
  const [prazoRebate, setPrazoRebate] = useState(0.0);

  //@TODO
  const [valorPRONAF, setValorPRONAF] = useState(0.0); // vem de SIB (@TODO)
  const [haveraPronaf, setHaveraPronaf] = useState(false);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    console.log(parcelas);
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        isAdmin={isAdmin}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        tabName={"Simulador PRONAF"}
      />
    </div>
  );
}
