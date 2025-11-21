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

export default function ReceitasTab({
  data,
  isAdmin,
  vendaAnimaisData,
  evolucaoRebanhoData,
}) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const anos = Array.from({ length: 10 }, (_, index) => ANO_INICIAL + index);
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;

  console.log(evolucaoRebanhoData);

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

  // Prioriza dados salvos no banco, depois usa evolução do rebanho como fallback
  const getInitialQtd = (savedData, evolutionData) => {
    // Se tem dados salvos E pelo menos um valor não é zero, usa os salvos
    if (savedData && savedData.length > 0 && savedData.some(val => val !== 0)) {
      return savedData;
    }
    // Senão, usa dados da evolução do rebanho
    return evolutionData || Array(10).fill(0);
  };

  const [qtdMatrizesDescartadas, setQtdMatrizesDescartadas] = useState(
    getInitialQtd(
      data?.dadosReceita?.qtdMatrizesDescartadas,
      vendaAnimaisData?.matrizesDescartadasValues
    )
  );
  const [valorMatrizesDescartadas, setValorMatrizesDescartadas] = useState(
    data?.dadosReceita?.valorMatrizesDescartadas || []
  );
  const [qtdNovilhosVendidos, setQtdNovilhosVendidos] = useState(
    getInitialQtd(
      data?.dadosReceita?.qtdNovilhosVendidos,
      vendaAnimaisData?.novilhosVendidosValues
    )
  );
  const [valorNovilhosVendidos, setValorNovilhosVendidos] = useState(
    data?.dadosReceita?.valorNovilhosVendidos || []
  );
  const [qtdNovilhasVendidas, setQtdNovilhasVendidas] = useState(
    getInitialQtd(
      data?.dadosReceita?.qtdNovilhasVendidas,
      vendaAnimaisData?.novilhasVendidasValues
    )
  );
  const [valorNovilhasVendidas, setValorNovilhasVendidas] = useState(
    data?.dadosReceita?.valorNovilhasVendidas || []
  );
  const [qtdQueijo, setQtdQueijo] = useState(
    getInitialQtd(
      data?.dadosReceita?.qtdQueijo,
      vendaAnimaisData?.queijoValues
    )
  );
  const [valorQueijo, setValorQueijo] = useState(
    data?.dadosReceita?.valorQueijo || []
  );
  const [qtdLeiteParaVenda, setQtdLeiteParaVenda] = useState(
    getInitialQtd(
      data?.dadosReceita?.qtdLeiteParaVenda,
      vendaAnimaisData?.leiteParaVendaValues
    )
  );
  const [valorLeiteParaVenda, setValorLeiteParaVenda] = useState(
    data?.dadosReceita?.valorLeiteParaVenda || []
  );

  const [dadosAgriculturaSequeiro, setDadosAgriculturaSequeiro] = useState(
    evolucaoRebanhoData?.dadosAgriculturaSequeiro || []
  );
  const [dadosAgriculturaIrrigada, setDadosAgriculturaIrrigada] = useState(
    evolucaoRebanhoData?.dadosAgriculturaIrrigada || []
  );
  const [dadosOutrasAtividades, setDadosOutrasAtividades] = useState(
    evolucaoRebanhoData?.dadosOutrasAtividades || []
  );

  /*
   * states pra mandar depois pro backend, nova versao dos dados das atividades vindo de receitas

  QTD feito
  valorUnitario feito (preciso testar se ta pegando direito)
  falta caluclar valorTotal
   */
  const [qtdAgriculturaSequeiro, setQtdAgriculturaSequeiro] = useState([]);
  const [valorTotalAgriculturaSequeiro, setValorTotalAgriculturaSequeiro] =
    useState([]);
  const [
    valorUnitarioAgriculturaSequeiro,
    setValorUnitarioAgriculturaSequeiro,
  ] = useState([]);
  const [qtdAgriculturaIrrigada, setQtdAgriculturaIrrigada] = useState([]);
  const [valorTotalAgriculturaIrrigada, setValorTotalAgriculturaIrrigada] =
    useState([]);
  const [
    valorUnitarioAgriculturaIrrigada,
    setValorUnitarioAgriculturaIrrigada,
  ] = useState([]);
  const [qtdOutrasAtividades, setQtdOutrasAtividades] = useState([]);
  const [valorTotalOutrasAtividades, setValorTotalOutrasAtividades] = useState(
    []
  );
  const [valorUnitarioOutrasAtividades, setValorUnitarioOutrasAtividades] =
    useState([]);

  /**
   * @TODO ajustar implicancias do valor unitario nos calculos dos fields
   *
   */
  const handleAgriculturaInputChange = (type, index, value) => {
    let updatedData;
    if (type === "sequeiro") {
      updatedData = [...valorUnitarioAgriculturaSequeiro];
      updatedData[index] = value;
      setValorUnitarioAgriculturaSequeiro(updatedData);
    } else if (type === "irrigada") {
      updatedData = [...valorUnitarioAgriculturaIrrigada];
      updatedData[index] = value;
      setValorUnitarioAgriculturaIrrigada(updatedData);
    } else if (type === "outras") {
      updatedData = [...valorUnitarioOutrasAtividades];
      updatedData[index] = value;
      setValorUnitarioOutrasAtividades(updatedData);
    }
  };

  // calcula o valor de quantidade pra cada ano/card das atividades
  useEffect(() => {
    const calculate = () => {
      const newQtdSequeiroArray = [...qtdAgriculturaSequeiro];
      dadosAgriculturaSequeiro.map((item) => {
        for (let i = 1; i <= 9; i++) {
          newQtdSequeiroArray[i] = item.quantidade * item[`ano${i}`];
        }
      });
      setQtdAgriculturaSequeiro(newQtdSequeiroArray);

      const newQtdIrrigadaArray = [...qtdAgriculturaIrrigada];
      dadosAgriculturaIrrigada.map((item) => {
        for (let i = 1; i <= 9; i++) {
          newQtdIrrigadaArray[i] = item.quantidade * item[`ano${i}`];
        }
      });
      setQtdAgriculturaIrrigada(newQtdIrrigadaArray);

      const newQtdOutrasAtividades = [...qtdOutrasAtividades];
      dadosOutrasAtividades.map((item) => {
        for (let i = 1; i <= 9; i++) {
          newQtdOutrasAtividades[i] = item.quantidade * item[`ano${i}`];
        }
      });
      setQtdOutrasAtividades(newQtdOutrasAtividades);
    };

    calculate();
  }, []);

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
        matrizesdescartadas_ano0_qtd: qtdMatrizesDescartadas[0],
        matrizesdescartadas_ano1_qtd: qtdMatrizesDescartadas[1],
        matrizesdescartadas_ano2_qtd: qtdMatrizesDescartadas[2],
        matrizesdescartadas_ano3_qtd: qtdMatrizesDescartadas[3],
        matrizesdescartadas_ano4_qtd: qtdMatrizesDescartadas[4],
        matrizesdescartadas_ano5_qtd: qtdMatrizesDescartadas[5],
        matrizesdescartadas_ano6_qtd: qtdMatrizesDescartadas[6],
        matrizesdescartadas_ano7_qtd: qtdMatrizesDescartadas[7],
        matrizesdescartadas_ano8_qtd: qtdMatrizesDescartadas[8],
        matrizesdescartadas_ano9_qtd: qtdMatrizesDescartadas[9],
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
        novilhosvendidos_ano0_qtd: qtdNovilhosVendidos[0],
        novilhosvendidos_ano1_qtd: qtdNovilhosVendidos[1],
        novilhosvendidos_ano2_qtd: qtdNovilhosVendidos[2],
        novilhosvendidos_ano3_qtd: qtdNovilhosVendidos[3],
        novilhosvendidos_ano4_qtd: qtdNovilhosVendidos[4],
        novilhosvendidos_ano5_qtd: qtdNovilhosVendidos[5],
        novilhosvendidos_ano6_qtd: qtdNovilhosVendidos[6],
        novilhosvendidos_ano7_qtd: qtdNovilhosVendidos[7],
        novilhosvendidos_ano8_qtd: qtdNovilhosVendidos[8],
        novilhosvendidos_ano9_qtd: qtdNovilhosVendidos[9],
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
        novilhasvendidas_ano0_qtd: qtdNovilhasVendidas[0],
        novilhasvendidas_ano1_qtd: qtdNovilhasVendidas[1],
        novilhasvendidas_ano2_qtd: qtdNovilhasVendidas[2],
        novilhasvendidas_ano3_qtd: qtdNovilhasVendidas[3],
        novilhasvendidas_ano4_qtd: qtdNovilhasVendidas[4],
        novilhasvendidas_ano5_qtd: qtdNovilhasVendidas[5],
        novilhasvendidas_ano6_qtd: qtdNovilhasVendidas[6],
        novilhasvendidas_ano7_qtd: qtdNovilhasVendidas[7],
        novilhasvendidas_ano8_qtd: qtdNovilhasVendidas[8],
        novilhasvendidas_ano9_qtd: qtdNovilhasVendidas[9],
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
        queijo_ano0_qtd: qtdQueijo[0],
        queijo_ano1_qtd: qtdQueijo[1],
        queijo_ano2_qtd: qtdQueijo[2],
        queijo_ano3_qtd: qtdQueijo[3],
        queijo_ano4_qtd: qtdQueijo[4],
        queijo_ano5_qtd: qtdQueijo[5],
        queijo_ano6_qtd: qtdQueijo[6],
        queijo_ano7_qtd: qtdQueijo[7],
        queijo_ano8_qtd: qtdQueijo[8],
        queijo_ano9_qtd: qtdQueijo[9],
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
        leiteparavenda_ano0_qtd: qtdLeiteParaVenda[0],
        leiteparavenda_ano1_qtd: qtdLeiteParaVenda[1],
        leiteparavenda_ano2_qtd: qtdLeiteParaVenda[2],
        leiteparavenda_ano3_qtd: qtdLeiteParaVenda[3],
        leiteparavenda_ano4_qtd: qtdLeiteParaVenda[4],
        leiteparavenda_ano5_qtd: qtdLeiteParaVenda[5],
        leiteparavenda_ano6_qtd: qtdLeiteParaVenda[6],
        leiteparavenda_ano7_qtd: qtdLeiteParaVenda[7],
        leiteparavenda_ano8_qtd: qtdLeiteParaVenda[8],
        leiteparavenda_ano9_qtd: qtdLeiteParaVenda[9],
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
   * @TODO VALOR UNITARIO -- COMO ASSIM? BOTEI ESSE @TODO E NAO LEMBRO SE RESOLVI.
   */
  const handleInputChange = (descricao, ano, field, value, anoIndex) => {
    if (descricao === "Matrizes Descartadas") {
      if (field === "unidade") {
        setUnidadeMatrizesDescartadas(value);
      } else if (field === "valorUnitario") {
        const numValue = parseFloat(value) || 0;
        setValorUnitarioMatrizesDescartadas(numValue);
        const newValorMatrizesDescartadas = qtdMatrizesDescartadas.map(
          (qtd) => numValue * qtd
        );
        setValorMatrizesDescartadas(newValorMatrizesDescartadas);
      } else if (field === "qtd") {
        const numValue = parseFloat(value) || 0;
        const newQtd = [...qtdMatrizesDescartadas];
        newQtd[anoIndex] = numValue;
        setQtdMatrizesDescartadas(newQtd);
        const newValor = [...valorMatrizesDescartadas];
        newValor[anoIndex] = numValue * valorUnitarioMatrizesDescartadas;
        setValorMatrizesDescartadas(newValor);
      }
    } else if (descricao === "Novilhos Vendidos") {
      if (field === "unidade") {
        setUnidadeNovilhosVendidos(value);
      } else if (field === "valorUnitario") {
        const numValue = parseFloat(value) || 0;
        setValorUnitarioNovilhosVendidos(numValue);
        const newValorNovilhosVendidos = qtdNovilhosVendidos.map(
          (qtd) => numValue * qtd
        );
        setValorNovilhosVendidos(newValorNovilhosVendidos);
      } else if (field === "qtd") {
        const numValue = parseFloat(value) || 0;
        const newQtd = [...qtdNovilhosVendidos];
        newQtd[anoIndex] = numValue;
        setQtdNovilhosVendidos(newQtd);
        const newValor = [...valorNovilhosVendidos];
        newValor[anoIndex] = numValue * valorUnitarioNovilhosVendidos;
        setValorNovilhosVendidos(newValor);
      }
    } else if (descricao === "Novilhas Vendidas") {
      if (field === "unidade") {
        setUnidadeNovilhasVendidas(value);
      } else if (field === "valorUnitario") {
        const numValue = parseFloat(value) || 0;
        setValorUnitarioNovilhasVendidas(numValue);
        const newValorNovilhasVendidas = qtdNovilhasVendidas.map(
          (qtd) => numValue * qtd
        );
        setValorNovilhasVendidas(newValorNovilhasVendidas);
      } else if (field === "qtd") {
        const numValue = parseFloat(value) || 0;
        const newQtd = [...qtdNovilhasVendidas];
        newQtd[anoIndex] = numValue;
        setQtdNovilhasVendidas(newQtd);
        const newValor = [...valorNovilhasVendidas];
        newValor[anoIndex] = numValue * valorUnitarioNovilhasVendidas;
        setValorNovilhasVendidas(newValor);
      }
    } else if (descricao === "Queijo (kg)") {
      if (field === "unidade") {
        setUnidadeQueijo(value);
      } else if (field === "valorUnitario") {
        const numValue = parseFloat(value) || 0;
        setValorUnitarioQueijo(numValue);
        const newValorQueijo = qtdQueijo.map(
          (qtd) => numValue * qtd
        );
        setValorQueijo(newValorQueijo);
      } else if (field === "qtd") {
        const numValue = parseFloat(value) || 0;
        const newQtd = [...qtdQueijo];
        newQtd[anoIndex] = numValue;
        setQtdQueijo(newQtd);
        const newValor = [...valorQueijo];
        newValor[anoIndex] = numValue * valorUnitarioQueijo;
        setValorQueijo(newValor);
      }
    } else if (descricao === "Leite para venda (litros)") {
      if (field === "unidade") {
        setUnidadeLeiteParaVenda(value);
      } else if (field === "valorUnitario") {
        const numValue = parseFloat(value) || 0;
        setValorUnitarioLeiteParaVenda(numValue);
        const newValorLeiteParaVenda = qtdLeiteParaVenda.map(
          (qtd) => numValue * qtd
        );
        setValorLeiteParaVenda(newValorLeiteParaVenda);
      } else if (field === "qtd") {
        const numValue = parseFloat(value) || 0;
        const newQtd = [...qtdLeiteParaVenda];
        newQtd[anoIndex] = numValue;
        setQtdLeiteParaVenda(newQtd);
        const newValor = [...valorLeiteParaVenda];
        newValor[anoIndex] = numValue * valorUnitarioLeiteParaVenda;
        setValorLeiteParaVenda(newValor);
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
        <h2 className="text-center font-bold py-4 text-xl rounded-lg mt-4 bg-orange-900">
          Bovinocultura
        </h2>
        {DESCRICOES.map((descricao, index) => (
          <div key={index} className="p-4 shadow-md mb-6 bg-gray-800">
            <h3 className="font-bold text-md p-2 bg-gray-950 mb-4">{descricao}</h3>
            
            {/* Campos únicos para todo o produto */}
            <div className="flex gap-4 mb-6 p-4 bg-gray-900 rounded">
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-2">
                  Unidade
                </label>
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
                      null,
                      "unidade",
                      e.target.value,
                      null
                    )
                  }
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm text-gray-400 mb-2">
                  Valor unitário (R$)
                </label>
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
                      null,
                      "valorUnitario",
                      e.target.value,
                      null
                    )
                  }
                />
              </div>
            </div>

            {/* Cards por ano - apenas Qtd e Valor total */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {anos.map((ano, i) => (
                <div key={ano} className="flex flex-col gap-2 bg-gray-700 p-5 border border-gray-600">
                  <div className="font-semibold text-center mb-4">
                    Ano {ano}
                  </div>
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-500">
                        Qtd
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        className="border-gray-500"
                        disabled={formsDisabled}
                        placeholder="Qtd"
                        value={
                          descricao === "Matrizes Descartadas"
                            ? qtdMatrizesDescartadas[i] || 0
                            : descricao === "Novilhos Vendidos"
                            ? qtdNovilhosVendidos[i] || 0
                            : descricao === "Novilhas Vendidas"
                            ? qtdNovilhasVendidas[i] || 0
                            : descricao === "Queijo (kg)"
                            ? qtdQueijo[i] || 0
                            : descricao === "Leite para venda (litros)"
                            ? qtdLeiteParaVenda[i] || 0
                            : 0
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
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-500">
                        Valor Total (R$)
                      </label>
                      <Input
                        type="text"
                        className="border-gray-500 bg-gray-600"
                        disabled={true}
                        placeholder="Valor"
                        value={
                          descricao === "Matrizes Descartadas"
                            ? valorMatrizesDescartadas[i]?.toFixed(2) || "0.00"
                            : descricao === "Novilhos Vendidos"
                            ? valorNovilhosVendidos[i]?.toFixed(2) || "0.00"
                            : descricao === "Novilhas Vendidas"
                            ? valorNovilhasVendidas[i]?.toFixed(2) || "0.00"
                            : descricao === "Queijo (kg)"
                            ? valorQueijo[i]?.toFixed(2) || "0.00"
                            : descricao === "Leite para venda (litros)"
                            ? valorLeiteParaVenda[i]?.toFixed(2) || "0.00"
                            : "0.00"
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h2 className="text-center font-bold py-4 text-xl rounded-lg mt-4 bg-orange-900">
          Agricultura Sequeiro
        </h2>
        {dadosAgriculturaSequeiro.map((item, index) => (
          <div key={index} className="p-4 shadow-md mb-6">
            <h3 className="font-bold text-md p-2 bg-gray-950">
              {item.descricao} - Unidade: {item.unidade}
            </h3>
            <div className="flex flex-row gap-4 p-2">
              Valor unitário:
              <Input
                className="p-2 w-1/12"
                disabled={formsDisabled}
                onChange={(e) =>
                  handleAgriculturaInputChange(
                    "sequeiro",
                    index,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {anos.map((ano, i) => (
                <div key={ano} className="flex flex-col gap-2 bg-gray-700 p-5">
                  <div className="font-semibold text-center mb-4">
                    Ano {ano}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Qtd
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Quantidade"
                          disabled={true}
                          className="border-gray-500"
                          value={qtdAgriculturaSequeiro[i + 1]}
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Valor
                        </label>
                        <Input
                          className="border-gray-500"
                          disabled={true}
                          placeholder="Valor"
                          value={0.0}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h2 className="text-center font-bold py-4 text-xl rounded-lg mt-4 bg-orange-900">
          Agricultura Irrigada
        </h2>
        {dadosAgriculturaIrrigada.map((item, index) => (
          <div key={index} className="p-4 shadow-md mb-6">
            <h3 className="font-bold text-md p-2 bg-gray-950">
              {item.descricao} - Unidade: {item.unidade}
            </h3>
            <div className="flex flex-row gap-4 p-2">
              Valor unitário:
              <Input
                className="p-2 w-1/12"
                disabled={formsDisabled}
                onChange={(e) =>
                  handleAgriculturaInputChange(
                    "irrigada",
                    index,
                    e.target.value
                  )
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {anos.map((ano, i) => (
                <div key={ano} className="flex flex-col gap-2 bg-gray-700 p-5">
                  <div className="font-semibold text-center mb-4">
                    Ano {ano}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Qtd
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Quantidade"
                          disabled={true}
                          className="border-gray-500"
                          value={qtdAgriculturaIrrigada[i + 1]}
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Valor
                        </label>
                        <Input
                          className="border-gray-500"
                          disabled={true}
                          placeholder="Valor"
                          value={0.0}
                          type="number"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <h2 className="text-center font-bold py-4 text-xl rounded-lg mt-4 bg-orange-900">
          Outras Atividades
        </h2>
        {dadosOutrasAtividades.map((item, index) => (
          <div key={index} className="p-4 shadow-md mb-6">
            <h3 className="font-bold text-md p-2 bg-gray-950">
              {item.descricao} - Unidade: {item.unidade}
            </h3>
            <div className="flex flex-row gap-4 p-2">
              Valor unitário:
              <Input
                className="p-2 w-1/12"
                disabled={formsDisabled}
                onChange={(e) =>
                  handleAgriculturaInputChange("outras", index, e.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
              {anos.map((ano, i) => (
                <div key={ano} className="flex flex-col gap-2 bg-gray-700 p-5">
                  <div className="font-semibold text-center mb-4">
                    Ano {ano}
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-2">
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Qtd
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Quantidade"
                          disabled={true}
                          className="border-gray-500"
                          value={qtdOutrasAtividades[i + 1]}
                        />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm text-gray-500">
                          Valor
                        </label>
                        <Input
                          type="number"
                          step="0.01"
                          className="border-gray-500"
                          disabled={true}
                          placeholder="Valor"
                          value={0.0}
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
