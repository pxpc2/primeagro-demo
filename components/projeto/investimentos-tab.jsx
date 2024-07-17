"use client";

import { useState } from "react";
import Heading from "./Header";
import ReusableTable from "../reusable-table";

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
  const [investimentosData, setInvestimentosData] = useState(
    data.aba_investimentos || []
  );

  const onSave = () => {};
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
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
        />
        {/* CONTEÚDO ACIMA */}
      </div>
    </div>
  );
}
