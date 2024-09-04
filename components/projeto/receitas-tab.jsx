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

export default function ReceitasTab({ data, isAdmin }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const anos = Array.from({ length: 5 }, (_, index) => ANO_INICIAL + index);
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;

  const onEdit = () => {
    setFormsDisabled(false);
  };

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  const onSave = async () => {
    console.log("enviando receitas");
  };

  const handleInputChange = (descricao, ano, field, value) => {
    console.log(`Changing ${field} for ${descricao} in year ${ano}:`, value);
    // handle changes here
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
          <div
            key={index}
            className="border border-gray-300 p-4 rounded-lg bg-gray-800 shadow-md"
          >
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
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-sm mb-2"></label>
                      <Input
                        type="text"
                        className="border-white"
                        disabled={formsDisabled}
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
                    <div className="w-1/2">
                      <label className="block text-sm mb-2"></label>
                      <Input
                        type="text"
                        disabled={formsDisabled}
                        placeholder="Valor"
                        className="border-white"
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
