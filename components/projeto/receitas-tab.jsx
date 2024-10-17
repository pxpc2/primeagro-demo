import { set, useForm } from "react-hook-form";
import Heading from "./Header";
import { useEffect, useState } from "react";
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
import { submitReceitas } from "@/app/projeto/actions";

export default function ReceitasTab({ data, isAdmin, vendaAnimaisData }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const anos = Array.from({ length: 10 }, (_, index) => ANO_INICIAL + index);
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;

  console.log(data);

  // vai ser o mesmo para todos os anos de cada descrição
  const [unidadeMatrizesDescartadas, setUnidadeMatrizesDescartadas] = useState(
    data?.dadosReceita?.unidadeMatrizesDescartadas || ""
  );
  const [
    valorUnitarioMatrizesDescartadas,
    setValorUnitarioMatrizesDescartadas,
  ] = useState(data?.dadosReceita?.valorUnitarioMatrizesDescartadas || 0.0);

  const [unidadeNovilhosVendidos, setUnidadeNovilhosVendidos] = useState(
    data?.dadosReceita?.unidadeNovilhosVendidos || ""
  );
  const [valorUnitarioNovilhosVendidos, setValorUnitarioNovilhosVendidos] =
    useState(data?.dadosReceita?.valorUnitarioNovilhosVendidos || 0.0);
  const [unidadeNovilhasVendidas, setUnidadeNovilhasVendidas] = useState(
    data?.dadosReceita?.unidadeNovilhasVendidas || ""
  );
  const [valorUnitarioNovilhasVendidas, setValorUnitarioNovilhasVendidas] =
    useState(data?.dadosReceita?.valorUnitarioNovilhasVendidas || 0.0);
  const [unidadeQueijo, setUnidadeQueijo] = useState(
    data?.dadosReceita?.unidadeQueijo || ""
  );
  const [valorUnitarioQueijo, setValorUnitarioQueijo] = useState(
    data?.dadosReceita?.valorUnitarioQueijo || 0.0
  );
  const [unidadeLeiteParaVenda, setUnidadeLeiteParaVenda] = useState(
    data?.dadosReceita?.unidadeLeiteParaVenda || ""
  );
  const [valorUnitarioLeiteParaVenda, setValorUnitarioLeiteParaVenda] =
    useState(data?.dadosReceita?.valorUnitarioLeiteParaVenda || 0.0);

  const [qtdMatrizesDescartadas, setQtdMatrizesDescartadas] = useState(
    vendaAnimaisData?.matrizesDescartadasValues || []
  );
  const [valorMatrizesDescartadas, setValorMatrizesDescartadas] = useState(
    data?.dadosReceita?.valorMatrizesDescartadas || []
  );
  const [qtdNovilhosVendidos, setQtdNovilhosVendidos] = useState(
    vendaAnimaisData?.novilhosVendidosValues || []
  );
  const [valorNovilhosVendidos, setValorNovilhosVendidos] = useState(
    data?.dadosReceita?.valorNovilhosVendidos || []
  );
  const [qtdNovilhasVendidas, setQtdNovilhasVendidas] = useState(
    vendaAnimaisData?.novilhasVendidasValues || []
  );
  const [valorNovilhasVendidas, setValorNovilhasVendidas] = useState(
    data?.dadosReceita?.valorNovilhasVendidas || []
  );
  const [qtdQueijo, setQtdQueijo] = useState(
    vendaAnimaisData?.queijoValues || []
  );
  const [valorQueijo, setValorQueijo] = useState(
    data?.dadosReceita?.valorQueijo || []
  );
  const [qtdLeiteParaVenda, setQtdLeiteParaVenda] = useState(
    vendaAnimaisData?.leiteParaVendaValues || []
  );
  const [valorLeiteParaVenda, setValorLeiteParaVenda] = useState(
    data?.dadosReceita?.valorLeiteParaVenda || []
  );

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
    try {
      setLoading(true);
      const receitasData = {
        matrizesdescartadas_unidade: unidadeMatrizesDescartadas,
        matrizesdescartadas_valorunitario: valorUnitarioMatrizesDescartadas,
        matrizesdescartadas_ano0_valortotal: valorMatrizesDescartadas[0],
        matrizesdescartadas_ano1_valortotal: valorMatrizesDescartadas[1],
        matrizesdescartadas_ano2_valortotal: valorMatrizesDescartadas[2],
        matrizesdescartadas_ano3_valortotal: valorMatrizesDescartadas[3],
        matrizesdescartadas_ano4_valortotal: valorMatrizesDescartadas[4],
        matrizesdescartadas_ano5_valortotal: valorMatrizesDescartadas[5],
        matrizesdescartadas_ano6_valortotal: valorMatrizesDescartadas[6],
        matrizesdescartadas_ano7_valortotal: valorMatrizesDescartadas[7],
        matrizesdescartadas_ano8_valortotal: valorMatrizesDescartadas[8],
        matrizesdescartadas_ano9_valortotal: valorMatrizesDescartadas[9],

        novilhosvendidos_unidade: unidadeNovilhosVendidos,
        novilhosvendidos_valorunitario: valorUnitarioNovilhosVendidos,
        novilhosvendidos_ano0_valortotal: valorNovilhosVendidos[0],
        novilhosvendidos_ano1_valortotal: valorNovilhosVendidos[1],
        novilhosvendidos_ano2_valortotal: valorNovilhosVendidos[2],
        novilhosvendidos_ano3_valortotal: valorNovilhosVendidos[3],
        novilhosvendidos_ano4_valortotal: valorNovilhosVendidos[4],
        novilhosvendidos_ano5_valortotal: valorNovilhosVendidos[5],
        novilhosvendidos_ano6_valortotal: valorNovilhosVendidos[6],
        novilhosvendidos_ano7_valortotal: valorNovilhosVendidos[7],
        novilhosvendidos_ano8_valortotal: valorNovilhosVendidos[8],
        novilhosvendidos_ano9_valortotal: valorNovilhosVendidos[9],

        novilhasvendidas_unidade: unidadeNovilhasVendidas,
        novilhasvendidas_valorunitario: valorUnitarioNovilhasVendidas,
        novilhasvendidas_ano0_valortotal: valorNovilhasVendidas[0],
        novilhasvendidas_ano1_valortotal: valorNovilhasVendidas[1],
        novilhasvendidas_ano2_valortotal: valorNovilhasVendidas[2],
        novilhasvendidas_ano3_valortotal: valorNovilhasVendidas[3],
        novilhasvendidas_ano4_valortotal: valorNovilhasVendidas[4],
        novilhasvendidas_ano5_valortotal: valorNovilhasVendidas[5],
        novilhasvendidas_ano6_valortotal: valorNovilhasVendidas[6],
        novilhasvendidas_ano7_valortotal: valorNovilhasVendidas[7],
        novilhasvendidas_ano8_valortotal: valorNovilhasVendidas[8],
        novilhasvendidas_ano9_valortotal: valorNovilhasVendidas[9],

        queijo_unidade: unidadeQueijo,
        queijo_valorunitario: valorUnitarioQueijo,
        queijo_ano0_valortotal: valorQueijo[0],
        queijo_ano1_valortotal: valorQueijo[1],
        queijo_ano2_valortotal: valorQueijo[2],
        queijo_ano3_valortotal: valorQueijo[3],
        queijo_ano4_valortotal: valorQueijo[4],
        queijo_ano5_valortotal: valorQueijo[5],
        queijo_ano6_valortotal: valorQueijo[6],
        queijo_ano7_valortotal: valorQueijo[7],
        queijo_ano8_valortotal: valorQueijo[8],
        queijo_ano9_valortotal: valorQueijo[9],

        leiteparavenda_unidade: unidadeLeiteParaVenda,
        leiteparavenda_valorunitario: valorUnitarioLeiteParaVenda,
        leiteparavenda_ano0_valortotal: valorLeiteParaVenda[0],
        leiteparavenda_ano1_valortotal: valorLeiteParaVenda[1],
        leiteparavenda_ano2_valortotal: valorLeiteParaVenda[2],
        leiteparavenda_ano3_valortotal: valorLeiteParaVenda[3],
        leiteparavenda_ano4_valortotal: valorLeiteParaVenda[4],
        leiteparavenda_ano5_valortotal: valorLeiteParaVenda[5],
        leiteparavenda_ano6_valortotal: valorLeiteParaVenda[6],
        leiteparavenda_ano7_valortotal: valorLeiteParaVenda[7],
        leiteparavenda_ano8_valortotal: valorLeiteParaVenda[8],
        leiteparavenda_ano9_valortotal: valorLeiteParaVenda[9],
      };

      await submitReceitas({ receitasData: receitasData });
      setFormsDisabled(true);
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @TODO VALOR UNITARIO
   */
  const handleInputChange = (descricao, ano, field, value, anoIndex) => {
    if (descricao === "Matrizes Descartadas") {
      if (field === "unidade") {
        setUnidadeMatrizesDescartadas(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioMatrizesDescartadas(value);
        const newValorMatrizesDescartadas = qtdMatrizesDescartadas.map(
          (qtd, i) => {
            return value * qtd;
          }
        );
        setValorMatrizesDescartadas(newValorMatrizesDescartadas);
      }
    } else if (descricao === "Novilhos Vendidos") {
      if (field === "unidade") {
        setUnidadeNovilhosVendidos(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioNovilhosVendidos(value);
        const newValorNovilhosVendidos = qtdNovilhosVendidos.map((qtd, i) => {
          return value * qtd;
        });
        setValorNovilhosVendidos(newValorNovilhosVendidos);
      }
    } else if (descricao === "Novilhas Vendidas") {
      if (field === "unidade") {
        setUnidadeNovilhasVendidas(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioNovilhasVendidas(value);
        const newValorNovilhasVendidas = qtdNovilhasVendidas.map((qtd, i) => {
          return value * qtd;
        });
        setValorNovilhasVendidas(newValorNovilhasVendidas);
      }
    } else if (descricao === "Queijo (kg)") {
      if (field === "unidade") {
        setUnidadeQueijo(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioQueijo(value);
        const newValorQueijo = qtdQueijo.map((qtd, i) => {
          return value * qtd;
        });
        setValorQueijo(newValorQueijo);
      }
    } else if (descricao === "Leite para venda (litros)") {
      if (field === "unidade") {
        setUnidadeLeiteParaVenda(value);
      } else if (field === "valorUnitario") {
        setValorUnitarioLeiteParaVenda(value);
        const newValorLeiteParaVenda = qtdLeiteParaVenda.map((qtd, i) => {
          return value * qtd;
        });
        setValorLeiteParaVenda(newValorLeiteParaVenda);
      }
    }
  };

  useEffect(() => {
    const checkAndUpdateValor = () => {
      // MATRIZES DESCARTADAS
      const newValorMatrizesDescartadas = qtdMatrizesDescartadas.map(
        (qtd, i) => {
          const expectedValor = qtd * valorUnitarioMatrizesDescartadas;
          if (valorMatrizesDescartadas[i] !== expectedValor) {
            return expectedValor;
          }
          return valorMatrizesDescartadas[i];
        }
      );
      setValorMatrizesDescartadas(newValorMatrizesDescartadas);

      // NOVILHOS VENDIDOS
      const newValorNovilhosVendidos = qtdNovilhosVendidos.map((qtd, i) => {
        const expectedValor = qtd * valorUnitarioNovilhosVendidos;
        if (valorNovilhosVendidos[i] !== expectedValor) {
          return expectedValor;
        }
        return valorNovilhosVendidos[i];
      });
      setValorNovilhosVendidos(newValorNovilhosVendidos);

      // NOVILHAS VENDIDAS
      const newValorNovilhasVendidas = qtdNovilhasVendidas.map((qtd, i) => {
        const expectedValor = qtd * valorUnitarioNovilhasVendidas;
        if (valorNovilhasVendidas[i] !== expectedValor) {
          return expectedValor;
        }
        return valorNovilhasVendidas[i];
      });
      setValorNovilhasVendidas(newValorNovilhasVendidas);

      // QUEIJO (kg)
      const newValorQueijo = qtdQueijo.map((qtd, i) => {
        const expectedValor = qtd * valorUnitarioQueijo;
        if (valorQueijo[i] !== expectedValor) {
          return expectedValor;
        }
        return valorQueijo[i];
      });
      setValorQueijo(newValorQueijo);

      // LEITE PARA VENDA (litros)
      const newValorLeiteParaVenda = qtdLeiteParaVenda.map((qtd, i) => {
        const expectedValor = qtd * valorUnitarioLeiteParaVenda;
        if (valorLeiteParaVenda[i] !== expectedValor) {
          return expectedValor;
        }
        return valorLeiteParaVenda[i];
      });
      setValorLeiteParaVenda(newValorLeiteParaVenda);
    };

    checkAndUpdateValor();
  }, []); // só quando carrega a aba primeira vez

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
        <h2 className="text-center font-bold py-4 text-xl rounded-lg mt-4 bg-gray-950">
          BOVINOCULTURA
        </h2>
        {DESCRICOES.map((descricao, index) => (
          <div key={index} className="p-4 rounded-lg shadow-md mb-6">
            <h3 className="font-bold text-md  p-2 rounded-lg bg-gray-950">
              {descricao}
            </h3>
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
                              : descricao === "Queijo (kg)"
                              ? unidadeQueijo
                              : descricao === "Leite para venda (litros)"
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
                          type="number"
                          step="0.01"
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
                              : descricao === "Queijo (kg)"
                              ? valorUnitarioQueijo
                              : descricao === "Leite para venda (litros)"
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
                          disabled={true}
                          placeholder="Qtd"
                          value={
                            descricao === "Matrizes Descartadas"
                              ? qtdMatrizesDescartadas[i]
                              : descricao === "Novilhos Vendidos"
                              ? qtdNovilhosVendidos[i]
                              : descricao === "Novilhas Vendidas"
                              ? qtdNovilhasVendidas[i]
                              : descricao === "Queijo (kg)"
                              ? qtdQueijo[i]
                              : descricao === "Leite para venda (litros)"
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
                              : descricao === "Queijo (kg)"
                              ? valorQueijo[i]
                              : descricao === "Leite para venda (litros)"
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
