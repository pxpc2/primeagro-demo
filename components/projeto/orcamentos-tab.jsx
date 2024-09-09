import { useState } from "react";
import Heading from "./Header";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function OrcamentosTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const initialOrcamentosState = data?.dadosInvestimentos?.map((item) => ({
    ...item,
    orcamentos: [], // passarei aqui os itens de orcamento
  }));

  const [orcamentos, setOrcamentos] = useState(initialOrcamentosState);

  const onEdit = () => {
    setFormsDisabled(false);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
    setOrcamentos(initialOrcamentosState);
  };
  const onSave = async () => {
    console.log("salvando orçamentos data");
  };

  const addNewOrcamento = (investimentoId) => {
    setOrcamentos((prevOrcamentos) =>
      prevOrcamentos?.map((item) =>
        item.id === investimentoId
          ? {
              ...item,
              orcamentos: [
                ...item.orcamentos,
                {
                  descricao: "",
                  unidade: "",
                  quantidade: "",
                  valorUnitario: "",
                  valorTotal: "",
                },
              ],
            }
          : item
      )
    );
  };

  const handleInputChange = (investimentoId, index, field, value) => {
    setOrcamentos((prevOrcamentos) =>
      prevOrcamentos.map((item) =>
        item.id === investimentoId
          ? {
              ...item,
              orcamentos: item?.orcamentos?.map((orcamento, i) =>
                i === index ? { ...orcamento, [field]: value } : orcamento
              ),
            }
          : item
      )
    );
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Orçamentos"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="grid grid-cols-1 gap-6 mt-8">
        {orcamentos?.map((investimento) => (
          <div
            key={investimento.id}
            className="border border-gray-700 p-4 rounded-lg bg-gray-800 shadow-md"
          >
            <h3 className="font-bold text-lg mb-4">
              {investimento?.item} - {investimento?.descricao}
            </h3>
            {investimento?.orcamentos?.map((orcamento, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <div className="w-1/5">
                  <label className="block text-sm">Descrição</label>
                  <Input
                    type="text"
                    value={orcamento.descricao}
                    disabled={formsDisabled}
                    onChange={(e) =>
                      handleInputChange(
                        investimento.id,
                        index,
                        "descricao",
                        e.target.value
                      )
                    }
                    placeholder="Descrição"
                    className="w-full"
                  />
                </div>
                <div className="w-1/5">
                  <label className="block text-sm">Unidade</label>
                  <Input
                    type="text"
                    value={orcamento.unidade}
                    disabled={formsDisabled}
                    onChange={(e) =>
                      handleInputChange(
                        investimento.id,
                        index,
                        "unidade",
                        e.target.value
                      )
                    }
                    placeholder="Unidade"
                    className="w-full"
                  />
                </div>
                <div className="w-1/5">
                  <label className="block text-sm">Quantidade</label>
                  <Input
                    type="text"
                    value={orcamento.quantidade}
                    disabled={formsDisabled}
                    onChange={(e) =>
                      handleInputChange(
                        investimento.id,
                        index,
                        "quantidade",
                        e.target.value
                      )
                    }
                    placeholder="Quantidade"
                    className="w-full"
                  />
                </div>
                <div className="w-1/5">
                  <label className="block text-sm">Valor Unitário</label>
                  <Input
                    type="text"
                    value={orcamento.valorUnitario}
                    disabled={formsDisabled}
                    onChange={(e) =>
                      handleInputChange(
                        investimento.id,
                        index,
                        "valorUnitario",
                        e.target.value
                      )
                    }
                    placeholder="Valor Unitário"
                    className="w-full"
                  />
                </div>
                <div className="w-1/5">
                  <label className="block text-sm">Valor Total</label>
                  <Input
                    type="text"
                    value={orcamento.valorTotal}
                    disabled={formsDisabled}
                    onChange={(e) =>
                      handleInputChange(
                        investimento.id,
                        index,
                        "valorTotal",
                        e.target.value
                      )
                    }
                    placeholder="Valor Total"
                    className="w-full"
                  />
                </div>
              </div>
            ))}
            <Button
              className="mt-2"
              onClick={() => addNewOrcamento(investimento.id)}
              disabled={formsDisabled}
            >
              Adicionar Item
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
