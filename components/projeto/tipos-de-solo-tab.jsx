"use client";

import { useState } from "react";
import Heading from "./Header";

export default function TiposDeSoloTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onEdit = () => {};
  const onSave = () => {};
  const handleCancel = () => {};

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Tipos de solo"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
        {/* CONTEÚDO ABAIXO */}
        <div className="h-screen">
          <p className="text-indigo-800 font-semibold">Qualidade dos solos:</p>
        </div>
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}
