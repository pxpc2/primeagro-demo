"use client";

import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useState } from "react";

export default function DadosImovelTab({ defaultValues }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: defaultValues,
  });
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      console.log(data);
      //await submitIdentificacaoBeneficiarioForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  return (
    <div className="p-4">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <div className="w-full py-4 flex flex-col gap-8">
        <div className="p-4 bg-gray-50 flex flex-col gap-8">
          <p className="text-indigo-800 font-semibold">Dados do imóvel:</p>
          {/*<DadosCandidatoForm form={form} formsDisabled={formsDisabled} />*/}
        </div>
      </div>
    </div>
  );
}
