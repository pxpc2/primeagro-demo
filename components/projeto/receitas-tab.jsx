import { set, useForm } from "react-hook-form";
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

  // vai ser o mesmo para todos os anos de cada descrição
  const [unidadeMatrizesDescartadas, setUnidadeMatrizesDescartadas] =
    useState("");
  const [
    valorUnitarioMatrizesDescartadas,
    setValorUnitarioMatrizesDescartadas,
  ] = useState(0.0);
  const [unidadeNovilhosVendidos, setUnidadeNovilhosVendidos] = useState("");
  const [valorUnitarioNovilhosVendidos, setValorUnitarioNovilhosVendidos] =
    useState(0.0);
  const [unidadeNovilhasVendidas, setUnidadeNovilhasVendidas] = useState("");
  const [valorUnitarioNovilhasVendidas, setValorUnitarioNovilhasVendidas] =
    useState(0.0);
  const [unidadeQueijo, setUnidadeQueijo] = useState("");
  const [valorUnitarioQueijo, setValorUnitarioQueijo] = useState(0.0);
  const [unidadeLeiteParaVenda, setUnidadeLeiteParaVenda] = useState("");
  const [valorUnitarioLeiteParaVenda, setValorUnitarioLeiteParaVenda] =
    useState(0.0);

  const [qtdMatrizesDescartadas, setQtdMatrizesDescartadas] = useState([]);
  const [valorMatrizesDescartadas, setValorMatrizesDescartadas] = useState([]);
  const [qtdNovilhosVendidos, setQtdNovilhosVendidos] = useState([]);
  const [valorNovilhosVendidos, setValorNovilhosVendidos] = useState([]);
  const [qtdNovilhasVendidas, setQtdNovilhasVendidas] = useState([]);
  const [valorNovilhasVendidas, setValorNovilhasVendidas] = useState([]);
  const [qtdQueijo, setQtdQueijo] = useState([]);
  const [valorQueijo, setValorQueijo] = useState([]);
  const [qtdLeiteParaVenda, setQtdLeiteParaVenda] = useState([]);
  const [valorLeiteParaVenda, setValorLeiteParaVenda] = useState([]);

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
  const handleInputChange = (descricao, ano, field, value, anoIndex) => {
    console.log(
      `Trocando ${field} de ${descricao} do ano ${ano} de index ${anoIndex} pro valor:`,
      value
    );
    if (descricao === "Matrizes Descartadas") {
      if (field === "unidade") {
        setUnidadeMatrizesDescartadas(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioMatrizesDescartadas(value);
      } else if (field === "qtd") {
        const old = [...qtdMatrizesDescartadas];
        old[anoIndex] = value;
        setQtdMatrizesDescartadas(old);
        const old2 = [...valorMatrizesDescartadas];
        old2[anoIndex] = value * valorUnitarioMatrizesDescartadas;
        setValorMatrizesDescartadas(old2);
      }
    } else if (descricao === "Novilhos Vendidos") {
      if (field === "unidade") {
        setUnidadeNovilhosVendidos(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioNovilhosVendidos(value);
      } else if (field === "qtd") {
        const old = [...qtdNovilhosVendidos];
        old[anoIndex] = value;
        setQtdNovilhosVendidos(old);
        const old2 = [...valorNovilhosVendidos];
        old2[anoIndex] = value * valorUnitarioNovilhosVendidos;
        setValorNovilhosVendidos(old2);
      }
    } else if (descricao === "Novilhas Vendidas") {
      if (field === "unidade") {
        setUnidadeNovilhasVendidas(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioNovilhasVendidas(value);
      } else if (field === "qtd") {
        const old = [...qtdNovilhasVendidas];
        old[anoIndex] = value;
        setQtdNovilhasVendidas(old);
        const old2 = [...valorNovilhasVendidas];
        old2[anoIndex] = value * valorUnitarioNovilhasVendidas;
        setValorNovilhasVendidas(old2);
      }
    } else if (descricao === "Queijo") {
      if (field === "unidade") {
        setUnidadeQueijo(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioQueijo(value);
      } else if (field === "qtd") {
        const old = [...qtdQueijo];
        old[anoIndex] = value;
        setQtdQueijo(old);
        const old2 = [...valorQueijo];
        old2[anoIndex] = value * valorUnitarioQueijo;
        setValorQueijo(old2);
      }
    } else if (descricao === "Leite para Venda") {
      if (field === "unidade") {
        setUnidadeLeiteParaVenda(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioLeiteParaVenda(value);
      } else if (field == "qtd") {
        const old = [...qtdLeiteParaVenda];
        old[anoIndex] = value;
        setQtdLeiteParaVenda(old);
        const old2 = [...valorLeiteParaVenda];
        old2[anoIndex] = value * valorUnitarioLeiteParaVenda;
        setValorLeiteParaVenda(old2);
      }
    }
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
                          value={
                            descricao === "Matrizes Descartadas"
                              ? unidadeMatrizesDescartadas
                              : descricao === "Novilhos Vendidos"
                              ? unidadeNovilhosVendidos
                              : descricao === "Novilhas Vendidas"
                              ? unidadeNovilhasVendidas
                              : descricao === "Queijo"
                              ? unidadeQueijo
                              : descricao === "Leite para Venda"
                              ? unidadeLeiteParaVenda
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "unidade",
                              e.target.value,
                              i
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
                          value={
                            descricao === "Matrizes Descartadas"
                              ? valorUnitarioMatrizesDescartadas
                              : descricao === "Novilhos Vendidos"
                              ? valorUnitarioNovilhosVendidos
                              : descricao === "Novilhas Vendidas"
                              ? valorUnitarioNovilhasVendidas
                              : descricao === "Queijo"
                              ? valorUnitarioQueijo
                              : descricao === "Leite para Venda"
                              ? valorUnitarioLeiteParaVenda
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "valorUnitario",
                              e.target.value,
                              i
                            )
                          }
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm mb-2"></label>
                        <Input
                          type="text"
                          className="border-gray-500"
                          disabled={formsDisabled}
                          placeholder="Qtd"
                          value={
                            descricao === "Matrizes Descartadas"
                              ? qtdMatrizesDescartadas[i]
                              : descricao === "Novilhos Vendidos"
                              ? qtdNovilhosVendidos[i]
                              : descricao === "Novilhas Vendidas"
                              ? qtdNovilhasVendidas[i]
                              : descricao === "Queijo"
                              ? qtdQueijo[i]
                              : descricao === "Leite para Venda"
                              ? qtdLeiteParaVenda[i]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "qtd",
                              e.target.value,
                              i
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
                          value={
                            descricao === "Matrizes Descartadas"
                              ? valorMatrizesDescartadas[i]
                              : descricao === "Novilhos Vendidos"
                              ? valorNovilhosVendidos[i]
                              : descricao === "Novilhas Vendidas"
                              ? valorNovilhasVendidas[i]
                              : descricao === "Queijo"
                              ? valorQueijo[i]
                              : descricao === "Leite para Venda"
                              ? valorLeiteParaVenda[i]
                              : ""
                          }
                          onChange={(e) =>
                            handleInputChange(
                              descricao,
                              ano,
                              "valor",
                              e.target.value,
                              i
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
