"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";

export default function TiposDeSoloTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormsDisabled(true);
    }, 2000);
    // submit tipos_de_solo pro banco
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

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
          <QualidadesDeSolo formsDisabled={formsDisabled} />
        </div>
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}

function QualidadesDeSolo({ formsDisabled }) {
  const colunas = [
    "Área",
    "Porcentagem",
    "Classe",
    "Descrição da classe",
    "Uso atual",
    "Uso indicado",
  ];
  return (
    <div>
      {/*<ReusableTable 
      hasSEQ={false} data={} columns={colunas} onAddNewItem={} onDeleteItem={} onEditItem={} />*/}
      <h1>qualidades table</h1>
    </div>
  );
}
