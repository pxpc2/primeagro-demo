import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function TabelaAtividades({
  data,
  setData,
  nomeAtividade,
  anoInicial,
  formsDisabled,
}) {
  const [itens, setItens] = useState(data || []);

  const addNewItem = () => {
    setItens((prevItens) => [
      ...prevItens,
      {
        descricao: "",
        unidade: "",
        quantidade: 0.0,
        ano1: 0.0,
        ano2: 0.0,
        ano3: 0.0,
        ano4: 0.0,
        ano5: 0.0,
        ano6: 0.0,
        ano7: 0.0,
        ano8: 0.0,
        ano9: 0.0,
      },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setItens((prevItens) =>
      prevItens.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteItem = (indexToDelete) => {
    setItens((prevItens) => prevItens.filter((_, i) => i !== indexToDelete));
  };

  // Sync o a aba com o estado daqui smp que itens mudar
  useEffect(() => {
    setData(itens);
  }, [itens, setData]);

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-800 shadow-md">
      <h3 className="font-bold text-lg mb-4">{nomeAtividade}</h3>
      {itens.map((item, index) => (
        <div key={index} className="flex flex-wrap gap-2 mb-4 items-center">
          <div className="w-2/12">
            <label className="block text-sm">Descrição</label>
            <Input
              type="text"
              value={item.descricao}
              onChange={(e) =>
                handleInputChange(index, "descricao", e.target.value)
              }
              placeholder="Descrição"
              className="w-full"
              disabled={formsDisabled}
            />
          </div>
          <div className="w-1/12">
            <label className="block text-sm">Unidade</label>
            <Input
              type="text"
              value={item.unidade}
              onChange={(e) =>
                handleInputChange(index, "unidade", e.target.value)
              }
              placeholder="Unidade"
              className="w-full text-xs"
              disabled={formsDisabled}
            />
          </div>
          <div className="w-1/12">
            <label className="block text-sm">Qtd</label>
            <Input
              type="text"
              value={item.quantidade}
              onChange={(e) =>
                handleInputChange(index, "quantidade", e.target.value)
              }
              placeholder="Qtd"
              disabled={formsDisabled}
              className="w-full text-xs"
            />
          </div>

          {[...Array(9)].map((_, anoIndex) => {
            const ano = `ano${anoIndex + 1}`;
            return (
              <div key={ano} className="w-1/12">
                <label className="block text-sm">{`${
                  anoInicial + anoIndex
                }`}</label>
                <Input
                  type="text"
                  value={item[ano]}
                  onChange={(e) =>
                    handleInputChange(index, ano, e.target.value)
                  }
                  className="w-full text-xs"
                />
              </div>
            );
          })}
          <div className="w-1/12">
            {!formsDisabled && (
              <>
                <label className="block text-sm text-gray-500">Deletar</label>
                <Button
                  variant="outline"
                  className="text-red-500"
                  onClick={() => deleteItem(index)}
                >
                  <Trash2 />
                </Button>
              </>
            )}
          </div>
        </div>
      ))}

      {!formsDisabled && (
        <Button className="mt-2" onClick={addNewItem}>
          Adicionar Item
        </Button>
      )}
    </div>
  );
}
