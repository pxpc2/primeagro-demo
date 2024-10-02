import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Input } from "../ui/input";
import {
  ANO_INICIAL,
  VENDA_ANIMAIS_PRODUTOS_DESCRICOES,
} from "@/utils/constants";

export default function ReceitasTab({ data, isAdmin, vendaAnimaisData }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const anos = Array.from({ length: 10 }, (_, index) => ANO_INICIAL + index);
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;

  console.log(vendaAnimaisData);

  const onEdit = () => {
    setFormsDisabled(false);
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  /**
   * @TODO
   */
  const onSave = async () => {
    console.log("enviando receitas");
  };

  /**
   * @TODO
   */
  const handleInputChange = (descricao, ano, field, value) => {
    console.log(`Trocando ${field} por ${descricao} do ano ${ano}:`, value);
  };

  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Receitas"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="mt-4 grid grid-cols-1 gap-6">
        {DESCRICOES.map((descricao, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md mb-6">
            <h3 className="font-bold text-lg mb-4">{descricao}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {anos.map((ano, i) => (
                <div
                  key={ano}
                  className="flex flex-col gap-2 bg-gray-700 p-5 rounded-lg"
                >
                  <div className="font-semibold text-center mb-4">
                    Ano {ano}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm mb-2"></label>
                        <Input
                          type="text"
                          className="border-gray-500"
                          disabled={formsDisabled}
                          placeholder="UNIDADE"
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "qtd",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm mb-2"></label>
                        <Input
                          type="text"
                          disabled={formsDisabled}
                          placeholder="Valor unitário"
                          className="border-gray-500"
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "valor",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm mb-2"></label>
                        <Input
                          type="text"
                          className="border-black"
                          disabled={true}
                          placeholder="Qtd"
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "qtd",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                      <div className="w-1/2">
                        <label className="block text-sm mb-2"></label>
                        <Input
                          type="text"
                          disabled={true}
                          placeholder="Valor"
                          className="border-black"
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "valor",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
