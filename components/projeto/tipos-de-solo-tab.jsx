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

  const fakeData = [
    {
      area: 1.0,
      porcentagem: 1.0,
      classe: "classe",
      descricaoClasse: "descricaoClasse",
      usoAtual: "usoAtual",
      usoIndicado: "usoIndicado",
    },
    {
      area: 2.0,
      porcentagem: 2.0,
      classe: "classe2",
      descricaoClasse: "descricaoClasse2",
      usoAtual: "usoAtual2",
      usoIndicado: "usoIndicado2",
    },
  ];

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
          <QualidadesDeSolo formsDisabled={formsDisabled} data={fakeData} />
        </div>
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}

function QualidadesDeSolo({ formsDisabled, data }) {
  const colunas = [
    { key: "area", label: "Área" },
    { key: "porcentagem", label: "Porcentagem" },
    { key: "classe", label: "Classe" },
    { key: "descricaoClasse", label: "Descrição da classe" },
    { key: "usoAtual", label: "Uso atual" },
    { key: "usoIndicado", label: "Uso indicado" },
  ];

  const [qualidadesDeSoloData, setQualidadesDeSoloData] = useState(data || []);

  const handleAddQualidadesDeSoloItem = async (item) => {
    if (!item.id) item.seq = qualidadesDeSoloData.length + 1;
    setQualidadesDeSoloData((prev) => [...prev, item]);
    // é enviado ao servidor depois, no onSave()
  };

  const handleEditQualidadesDeSoloItem = async (updatedItem) => {
    setQualidadesDeSoloData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteQualidadesDeSoloItem = async (item) => {
    /*const updatedData = await deleteInvestimento({
      data: investimentosData,
      itemToDelete: item,
    });
    if (updatedData) {
      updatedData.forEach((item, index) => {
        item.seq = index + 1;
      });
      setInvestimentosData(updatedData);
    }*/
    console.log("deletando qualidade_de_solo_item: ");
    console.log(item);
  };

  return (
    <div>
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
