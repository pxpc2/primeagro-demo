"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "./Header";

export default function IdentificacaoBeneficiarioTab() {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      //await submitPreAnaliseForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  return (
    <div>
      <Heading
        tabName={"Identificação do Beneficiário"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <h1 className="h-screen text-3xl">ID BENE</h1>;
    </div>
  );
}
