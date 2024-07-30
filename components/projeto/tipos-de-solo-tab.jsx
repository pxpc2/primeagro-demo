"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";
import { deleteQualidadeSolo, submitTiposDeSolo } from "@/app/projeto/actions";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

export default function TiposDeSoloTab({ data, isAdmin }) {
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const calculateArea = (totalArea, porcentagem) => {
    porcentagem = String(porcentagem);
    return (
      (totalArea * parseFloat(porcentagem.replace(",", "."))) /
      100
    ).toFixed(4);
  };
  const [qualidadesDeSoloData, setQualidadesDeSoloData] = useState(
    data[0]?.tabelaQualidades.map((item) => ({
      ...item,
      usoAtual: item.uso_atual,
      usoIndicado: item.uso_indicado,
      descricaoClasse: item.descricao_classe,
      area: calculateArea(
        parseFloat(data[0]?.areaTotal.replace(",", ".")),
        item.porcentagem
      ),
    })) || []
  );
  console.log(data);
  const [relevo, setRelevo] = useState(data[0]?.tiposDeSolo[0].relevo || "");
  const [clima, setClima] = useState(data[0]?.tiposDeSolo[0].clima || "");
  const [pedregosidade, setPedregosidade] = useState(
    data[0]?.tiposDeSolo[0]?.pedregosidade || ""
  );
  const [totalArea, setTotalArea] = useState(
    parseFloat(data[0]?.areaTotal.replace(",", ".")) || 0.0
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
    const newItem = {
      ...item,
      area: calculateArea(totalArea, item.porcentagem),
    };
    setQualidadesDeSoloData((prev) => [...prev, newItem]);
  };
  const handleEditQualidadesDeSoloItem = async (updatedItem) => {
    const updatedItemWithArea = {
      ...updatedItem,
      area: calculateArea(totalArea, updatedItem.porcentagem),
    };
    setQualidadesDeSoloData((prev) =>
      prev.map((item) =>
        item.id === updatedItem.id ? updatedItemWithArea : item
      )
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
            calculateArea={calculateArea}
          />
          <div className="w-full bg-blue-700 py-2 font-semibold text-center text-gray-100">
            RELEVO
          </div>
          <Textarea
            className="mt-1 mb-4 sm:mb-8"
            value={relevo}
            disabled={formsDisabled}
            onChange={(e) => setRelevo(e.target.value)}
          />
          <div className="w-full bg-blue-700 py-2 font-semibold text-center text-gray-100">
            CLIMA
          </div>
          <Textarea
            className="mt-1 mb-4 sm:mb-8"
            value={clima}
            disabled={formsDisabled}
            onChange={(e) => setClima(e.target.value)}
          />
          <div className="w-full bg-blue-700 py-2 font-semibold text-center text-gray-100">
            PEDREGOSIDADE
          </div>
          <Textarea
            className="mt-1 mb-4 sm:mb-8"
            value={pedregosidade}
            disabled={formsDisabled}
            onChange={(e) => setPedregosidade(e.target.value)}
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
  calculateArea,
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
        obs={"tiposdesolo"}
        calculateArea={calculateArea}
      />
    </div>
  );
}
