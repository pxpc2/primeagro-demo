"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";
import { deleteInvestimento, submitInvestimentos } from "@/app/projeto/actions";

export default function InvestimentosTab({ data }) {
  const colunas = [
    { key: "seq", label: "SEQ" },
    { key: "categoria", label: "Categoria" },
    { key: "item", label: "Item" },
    { key: "descricao", label: "Descrição básica do projeto" },
    { key: "unidade_medida", label: "Unidade de medida" },
    { key: "quantidade", label: "Quantidade" },
    { key: "valor_unitario", label: "Valor unitário" },
    { key: "valor_total", label: "Valor total" },
    { key: "fonte_financiamento", label: "Fonte de financiamento" },
  ];

  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [investimentosData, setInvestimentosData] = useState(data || []);

  const onSave = async () => {
    setLoading(true);
    await submitInvestimentos({ data: investimentosData }).then(() => {
      setFormsDisabled(true);
      setLoading(false);
    });
  };
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };

  const handleAddInvestimentoItem = async (item) => {
    if (!item.id) item.seq = investimentosData.length + 1;
    setInvestimentosData((prev) => [...prev, item]);
    // é enviado ao servidor depois, no onSave()
  };

  const handleEditInvestimentoItem = async (updatedItem) => {
    setInvestimentosData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteInvestimentoItem = async (item) => {
    const updatedData = await deleteInvestimento({
      data: investimentosData,
      itemToDelete: item,
    });
    if (updatedData) {
      updatedData.forEach((item, index) => {
        item.seq = index + 1;
      });
      setInvestimentosData(updatedData);
    }
  };

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Investimentos"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
      />

      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
        {/* CONTEÚDO ABAIXO */}
        <div className=" bg-blue-600 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">
            RELAÇÃO DOS INVESTIMENTOS A SEREM IMPLANTADOS NO (nome do imovel) -
            (local)
          </h1>
        </div>
        <ReusableTable
          // passar um custom dialog para essa tabela
          data={investimentosData}
          columns={colunas}
          formsDisabled={formsDisabled}
          caption={"Lista de investimentos"}
          hasSEQ={true}
          onAddNewItem={handleAddInvestimentoItem}
          onEditItem={handleEditInvestimentoItem}
          onDeleteItem={handleDeleteInvestimentoItem}
        />
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}
