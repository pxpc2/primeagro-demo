import { useState } from "react";
import Heading from "./Header";

export default function FluxoCaixaTab({ fluxoCaixaData, isAdmin }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  console.log(fluxoCaixaData);
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
