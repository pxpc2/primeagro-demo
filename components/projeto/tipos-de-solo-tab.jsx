"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";
import { deleteQualidadeSolo, submitTiposDeSolo } from "@/app/projeto/actions";

export default function TiposDeSoloTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [qualidadesDeSoloData, setQualidadesDeSoloData] = useState(
    data?.tabelaQualidades.map((item) => ({
      ...item,
      usoAtual: item.uso_atual,
      usoIndicado: item.uso_indicado,
      descricaoClasse: item.descricao_classe,
    })) || []
  );
  const [relevo, setRelevo] = useState(data?.tiposDeSolo?.relevo || "");
  const [clima, setClima] = useState(data?.tiposDeSolo?.clima || "");
  const [pedregosidade, setPedregosidade] = useState(
    data?.tiposDeSolo?.pedregosidade || ""
  );
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    setLoading(true);
    const dados = {
      relevo,
      clima,
      pedregosidade,
      tabelaQualidades: qualidadesDeSoloData,
    };
    await submitTiposDeSolo({ data: dados }).then((res) => {
      setFormsDisabled(true);
      setLoading(false);
    });
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

  const handleAddQualidadesDeSoloItem = async (item) => {
    setQualidadesDeSoloData((prev) => [...prev, item]);
    // é enviado ao servidor depois, no onSave()
  };

  const handleEditQualidadesDeSoloItem = async (updatedItem) => {
    setQualidadesDeSoloData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteQualidadesDeSoloItem = async (item) => {
    const result = deleteQualidadeSolo({ itemID: item.id });
    if (result) {
      setQualidadesDeSoloData((prev) => prev.filter((i) => i.id !== item.id));
    }
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
          <QualidadesDeSolo
            formsDisabled={formsDisabled}
            data={qualidadesDeSoloData}
            handleAddQualidadesDeSoloItem={handleAddQualidadesDeSoloItem}
            handleDeleteQualidadesDeSoloItem={handleDeleteQualidadesDeSoloItem}
            handleEditQualidadesDeSoloItem={handleEditQualidadesDeSoloItem}
          />
        </div>
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}

function QualidadesDeSolo({
  formsDisabled,
  data,
  handleAddQualidadesDeSoloItem,
  handleDeleteQualidadesDeSoloItem,
  handleEditQualidadesDeSoloItem,
}) {
  const colunas = [
    { key: "area", label: "Área" },
    { key: "porcentagem", label: "Porcentagem" },
    { key: "classe", label: "Classe" },
    { key: "descricaoClasse", label: "Descrição da classe" },
    { key: "usoAtual", label: "Uso atual" },
    { key: "usoIndicado", label: "Uso indicado" },
  ];

  return (
    <div className="mt-3">
      <ReusableTable
        hasSEQ={false}
        data={data}
        columns={colunas}
        onAddNewItem={handleAddQualidadesDeSoloItem}
        onDeleteItem={handleDeleteQualidadesDeSoloItem}
        onEditItem={handleEditQualidadesDeSoloItem}
        formsDisabled={formsDisabled}
      />
    </div>
  );
}
