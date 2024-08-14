"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";
import { deleteInvestimento, submitInvestimentos } from "@/app/projeto/actions";
import { INVESTIMENTO_CATEGORIAS, INVESTIMENTO_ITENS } from "@/utils/constants";

export default function InvestimentosTab({ data, isAdmin }) {
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
  const categoriaOptions = INVESTIMENTO_CATEGORIAS;
  const itemOptions = INVESTIMENTO_ITENS;
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [investimentosData, setInvestimentosData] = useState(
    data.dadosInvestimentos || []
  );

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

  let [cidade, UF] = data.dadosPreAnalise
    ? data.dadosPreAnalise.campo_3.split("-")
    : ["sem_cidade", "sem_UF"];
  const nomeImovel =
    data.dadosPreAnalise !== undefined
      ? data.dadosPreAnalise.campo_4
      : "IMÓVEL SEM NOME";

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Investimentos"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        isAdmin={isAdmin}
        onCancel={handleCancel}
      />

      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
        {/* CONTEÚDO ABAIXO */}
        <div className=" bg-blue-600 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">
            RELAÇÃO DOS INVESTIMENTOS A SEREM IMPLANTADOS NO{" "}
            {nomeImovel.toUpperCase()} - {cidade.toUpperCase()} /{" "}
            {UF.toUpperCase()}
          </h1>
        </div>
        <p className="text-red-600 font-bold">
          A tabela abaixo está com problemas, favor verificar o valor total (não
          está multiplicando pela quantidade*valor_unidade), e somente editar ou
          deletar 1 (um) item por vez, salvar antes de prosseguir.
        </p>
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
          hasBRLFormatting={true}
          brlFieldIdentifier={"valor"}
          categoriaOptions={categoriaOptions}
          itemOptions={itemOptions}
        />
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}
