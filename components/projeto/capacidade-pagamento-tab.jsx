import { useState } from "react";
import Heading from "./Header";

export default function CapacidadePagamentoTab({ data, isAdmin }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    try {
      setLoading(true);
      setFormsDisabled(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  return (
    <div>
      <Heading
        isAdmin={isAdmin}
        isEditing={!formsDisabled}
        isLoading={loading}
        onSave={onSave}
        onCancel={handleCancel}
        onEdit={onEdit}
        tabName={"Capacidade de Pagamento"}
      />
      <h1 className="text-center font-bold mt-12">Capacidade pagamento</h1>
    </div>
  );
}
