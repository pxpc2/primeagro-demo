import { useState } from "react";
import Heading from "./Header";

export default function SimuladorPNCF({
  data,
  isAdmin,
  dadosSIB,
  abaPreAnalise,
}) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {};
  const handleCancel = () => {
    setFormsDisabled(true);
  };
  console.log(dadosSIB);
  console.log(abaPreAnalise);
  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        isAdmin={isAdmin}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        tabName={"Simulador PNCF"}
      />
      <div className="p-4 mt-8 flex flex-col gap-8 items-center justify-center">
        <h1>Ola mundo</h1>
      </div>
    </div>
  );
}
