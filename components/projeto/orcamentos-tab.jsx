import { useState } from "react";
import Heading from "./Header";

export default function OrcamentosTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

  /**
   * @TODO
   */
  const onSave = async () => {
    console.log("enviando receitas");
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Orçamentos"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="h-screen"></div>
    </div>
  );
}
