import { useCallback, useEffect, useState } from "react";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ANO_INICIAL,
  BOVINOCULTURA_DESCRICOES,
  VENDA_ANIMAIS_PRODUTOS_DESCRICOES,
} from "@/utils/constants";

function getConstanteFromData({ arr, letra, numero }) {
  const { descricao, anoIndex } = mapExcelToBanco({ letra, numero });
  const foundItem = arr?.find((item) => item.descricao === descricao);
  if (foundItem) {
    const ano = `ano${anoIndex}`;
    // OS DADOS DE INDICADORES TÉCNICOS SÃO EM PORCENTAGEM, menos as duas últimas fileiras
    let porcentagem = numero === 10 || numero === 11 ? 1 : 100;
    return foundItem[ano] / porcentagem;
  }
  return undefined;
}

export default function EvolucaoRebanhoBovinocultura({
  data,
  formsDisabled,
  anoInicial,
  onChange,
  onVendasAnimaisChange,
}) {
  const handleDataChange = (updatedData) => {
    onChange(updatedData);
  };

  const arr =
    data?.dadosEvolucaoRebanho?.[0]?.aba_evolucao_rebanho_indicadores_tecnicos;

  const [B4, setB4] = useState(
    getConstanteFromData({ arr, letra: "B", numero: 4 })
  );
  const [D8, setD8] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 8 })
  );
  const [C5, setC5] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 5 })
  );
  const [C6, setC6] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 6 })
  );
  const [C4, setC4] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 4 })
  );
  const [D4, setD4] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 4 })
  );
  const [D5, setD5] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 5 })
  );
  const [E4, setE4] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 4 })
  );
  const [E5, setE5] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 5 })
  );
  const [F4, setF4] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 4 })
  );
  const [F5, setF5] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 5 })
  );
  const [G4, setG4] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 4 })
  );
  const [G5, setG5] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 5 })
  );
  const [H4, setH4] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 4 })
  );
  const [H5, setH5] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 5 })
  );
  const [I4, setI4] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 4 })
  );
  const [I5, setI5] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 5 })
  );
  const [J4, setJ4] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 4 })
  );
  const [J5, setJ5] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 5 })
  );
  const [K4, setK4] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 4 })
  );
  const [K5, setK5] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 5 })
  );
  const [L4, setL4] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 4 })
  );
  const [L5, setL5] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 5 })
  );
  const [L6, setL6] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 5 })
  );
  const [D6, setD6] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 6 })
  );
  const [E6, setE6] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 6 })
  );
  const [F6, setF6] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 6 })
  );
  const [G6, setG6] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 6 })
  );
  const [H6, setH6] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 6 })
  );
  const [I6, setI6] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 6 })
  );
  const [J6, setJ6] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 6 })
  );
  const [K6, setK6] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 6 })
  );
  // OS X8 SÃO P/ ANIMAIS VENDAS TABLE
  const [C8, setC8] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 8 })
  );
  const [E8, setE8] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 8 })
  );
  const [F8, setF8] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 8 })
  );
  const [G8, setG8] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 8 })
  );
  const [H8, setH8] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 8 })
  );
  const [I8, setI8] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 8 })
  );
  const [J8, setJ8] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 8 })
  );
  const [K8, setK8] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 8 })
  );
  const [L8, setL8] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 8 })
  );
  const [B10, setB10] = useState(
    getConstanteFromData({ arr, letra: "B", numero: 10 })
  );
  const [B11, setB11] = useState(
    getConstanteFromData({ arr, letra: "B", numero: 11 })
  );
  const [C10, setC10] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 10 })
  );
  const [C11, setC11] = useState(
    getConstanteFromData({ arr, letra: "C", numero: 11 })
  );
  const [D10, setD10] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 10 })
  );
  const [D11, setD11] = useState(
    getConstanteFromData({ arr, letra: "D", numero: 11 })
  );
  const [E10, setE10] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 10 })
  );
  const [F10, setF10] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 10 })
  );
  const [G10, setG10] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 10 })
  );
  const [H10, setH10] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 10 })
  );
  const [I10, setI10] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 10 })
  );
  const [J10, setJ10] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 10 })
  );
  const [K10, setK10] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 10 })
  );
  const [L10, setL10] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 10 })
  );
  const [F11, setF11] = useState(
    getConstanteFromData({ arr, letra: "F", numero: 11 })
  );
  const [G11, setG11] = useState(
    getConstanteFromData({ arr, letra: "G", numero: 11 })
  );
  const [H11, setH11] = useState(
    getConstanteFromData({ arr, letra: "H", numero: 11 })
  );
  const [I11, setI11] = useState(
    getConstanteFromData({ arr, letra: "I", numero: 11 })
  );
  const [J11, setJ11] = useState(
    getConstanteFromData({ arr, letra: "J", numero: 11 })
  );
  const [K11, setK11] = useState(
    getConstanteFromData({ arr, letra: "K", numero: 11 })
  );
  const [L11, setL11] = useState(
    getConstanteFromData({ arr, letra: "L", numero: 11 })
  );
  const [E11, setE11] = useState(
    getConstanteFromData({ arr, letra: "E", numero: 11 })
  );

  const inventario = data?.dadosInventario?.[0] || {};
  const reprodutoresAdquirir =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_reprodutores || 0;
  const relacaoMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.relacao_matrizes || 0;
  const estabilizacaoPlantel =
    data?.dadosEvolucaoRebanho?.[0]?.estabilizacao_plantel || 0;
  const animaisAdquirirMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_matrizes || 0;

  const getStartingValue = (descricao) => {
    const field = mapDescricaoToField(descricao);
    return parseFloat(inventario[field] || 0);
  };

  const calculateMatrizesForYear = (
    yearIndex,
    prevYearValue,
    novilhasValue
  ) => {
    const adjustmentFactor = prevYearValue * D8; // D24 * D8
    const calculatedNovilhas = novilhasValue * 0.9; // E30 * 0.9
    let sum = prevYearValue - adjustmentFactor + calculatedNovilhas;
    if (sum < estabilizacaoPlantel) {
      sum = estabilizacaoPlantel;
    }

    return Math.round(sum);
  };

  /* INICIO MATRIZES */
  //ANO 2
  const calculateMatrizesFor2025 = () => {
    const matrizes2024 = getStartingValue("Matrizes");
    const novilhas2024 = getStartingValue("Novilhas (24 a 36 meses)");
    const sum = animaisAdquirirMatrizes + matrizes2024 + novilhas2024;

    return Math.round(sum < estabilizacaoPlantel ? sum : estabilizacaoPlantel);
  };

  //ANO 3
  const calculateMatrizesFor2026 = () => {
    const matrizes2025 = calculateMatrizesFor2025();
    const novilhas2026 = getStartingValue("Novilhas (24 a 36 meses)") * 0.9;

    return Math.round(
      matrizes2025 + novilhas2026 < estabilizacaoPlantel
        ? matrizes2025 + novilhas2026
        : estabilizacaoPlantel
    );
  };

  // ANOS 4 EM FRENTE
  const calculateMatrizesForLaterYears = (yearIndex) => {
    const prevYearValue =
      yearIndex === 2 ? calculateMatrizesFor2025() : calculateMatrizesFor2026();
    const novilhasValue = getStartingValue("Novilhas (24 a 36 meses)");

    let result = calculateMatrizesForYear(
      yearIndex,
      prevYearValue,
      novilhasValue
    );

    if (result < estabilizacaoPlantel) {
      result = estabilizacaoPlantel;
    }

    return result;
  };
  /* FIM MATRIZES */

  const calculateTourosForYear = (yearIndex) => {
    if (yearIndex === 0) {
      const touros2024 = getStartingValue("Touro");
      return touros2024;
    }

    const matrizesValue =
      yearIndex === 1
        ? calculateMatrizesFor2025()
        : yearIndex === 2
        ? calculateMatrizesFor2026()
        : calculateMatrizesForLaterYears(yearIndex);

    if (matrizesValue < 1) {
      return 0;
    }

    const calculatedTouros = Math.round(matrizesValue / relacaoMatrizes);

    return calculatedTouros <= reprodutoresAdquirir
      ? reprodutoresAdquirir
      : calculatedTouros;
  };

  const calculateBezerrosFor2025 = (descricao) => {
    const value2024 = getStartingValue(descricao);
    const matrizes2025 = calculateMatrizesFor2025();

    const reductionTerm = value2024 - value2024 * C5;
    const contributionTerm = (matrizes2025 * C4) / 2;
    const subtractionTerm = contributionTerm * C5;

    if (descricao === "Bezerros (0 a 12 meses)") {
      return Math.round(reductionTerm + contributionTerm - subtractionTerm);
    } else if (descricao === "Bezerras (0 a 12 meses)") {
      return Math.round(reductionTerm + contributionTerm - subtractionTerm);
    }

    return 0;
  };

  const calculateBezerrosForLaterYears = (yearIndex) => {
    const matrizesValue =
      yearIndex === 2
        ? calculateMatrizesFor2026()
        : calculateMatrizesForLaterYears(yearIndex);

    let X4, X5;
    switch (yearIndex) {
      case 2:
        X4 = D4;
        X5 = D5;
        break;
      case 3:
        X4 = E4;
        X5 = E5;
        break;
      case 4:
        X4 = F4;
        X5 = F5;
        break;
      case 5:
        X4 = G4;
        X5 = G5;
        break;
      case 6:
        X4 = H4;
        X5 = H5;
        break;
      case 7:
        X4 = I4;
        X5 = I5;
        break;
      case 8:
        X4 = J4;
        X5 = J5;
        break;
      case 9:
        X4 = K4;
        X5 = K5;
        break;
      case 10:
        X4 = L4;
        X5 = L5;
        break;
      default:
        X4 = C4;
        X5 = C5;
        break;
    }

    const contributionTerm = (matrizesValue * X4) / 2;
    const subtractionTerm = contributionTerm * X5;

    const result = contributionTerm - subtractionTerm;

    return Math.round(result);
  };

  const calculateGarrotesFor2025 = (descricao) => {
    const value2024 = getStartingValue(descricao);
    const result = value2024 - value2024 * C6;
    return Math.round(result);
  };

  const calculateGarrotesForLaterYears = (yearIndex, descricao) => {
    const bezerrosValue =
      yearIndex === 2
        ? calculateBezerrosFor2025(
            descricao === "Garrotes (12 a 24 meses)"
              ? "Bezerros (0 a 12 meses)"
              : "Bezerras (0 a 12 meses)"
          )
        : yearIndex === 3
        ? calculateBezerrosForLaterYears(
            3,
            descricao === "Garrotes (12 a 24 meses)"
              ? "Bezerros (0 a 12 meses)"
              : "Bezerras (0 a 12 meses)"
          )
        : yearIndex === 4
        ? calculateBezerrosForLaterYears(
            4,
            descricao === "Garrotes (12 a 24 meses)"
              ? "Bezerros (0 a 12 meses)"
              : "Bezerras (0 a 12 meses)"
          )
        : calculateBezerrosForLaterYears(
            yearIndex,
            descricao === "Garrotes (12 a 24 meses)"
              ? "Bezerros (0 a 12 meses)"
              : "Bezerras (0 a 12 meses)"
          );

    let X5;
    switch (yearIndex) {
      case 2:
        X5 = D5;
        break;
      case 3:
        X5 = E5;
        break;
      case 4:
        X5 = F5;
        break;
      case 5:
        X5 = G5;
        break;
      case 6:
        X5 = H5;
        break;
      case 7:
        X5 = I5;
        break;
      case 8:
        X5 = J5;
        break;
      case 9:
        X5 = K5;
        break;
      case 10:
        X5 = L5;
        break;
      default:
        X5 = C5;
        break;
    }

    // Formula: bezerrosValue - bezerrosValue * X5
    const result = bezerrosValue - bezerrosValue * X5;

    return Math.round(result);
  };

  const calculateNovilhosFor2025 = (descricao) => {
    if (descricao === "Novilhos (24 a 36 meses)") {
      const garrotes2024 = getStartingValue("Garrotes (12 a 24 meses)");
      const result = garrotes2024 - garrotes2024 * C6;
      return Math.round(result);
    } else if (descricao === "Novilhas (24 a 36 meses)") {
      return getStartingValue("Novilhas (24 a 36 meses)");
    }
    return 0;
  };

  const calculateNovilhosForLaterYears = (yearIndex, descricao) => {
    let baseValue;

    if (descricao === "Novilhos (24 a 36 meses)") {
      baseValue =
        yearIndex === 2
          ? calculateGarrotesFor2025("Garrotes (12 a 24 meses)")
          : calculateGarrotesForLaterYears(
              yearIndex - 1,
              "Garrotes (12 a 24 meses)"
            );
    } else if (descricao === "Novilhas (24 a 36 meses)") {
      baseValue =
        yearIndex === 2
          ? calculateGarrotesFor2025("Garrotas (12 a 24 meses)")
          : calculateGarrotesForLaterYears(
              yearIndex - 1,
              "Garrotas (12 a 24 meses)"
            );
    }

    let X6;
    switch (yearIndex) {
      case 2:
        X6 = D6;
        break;
      case 3:
        X6 = E6;
        break;
      case 4:
        X6 = F6;
        break;
      case 5:
        X6 = G6;
        break;
      case 6:
        X6 = H6;
        break;
      case 7:
        X6 = I6;
        break;
      case 8:
        X6 = J6;
        break;
      case 9:
        X6 = K6;
        break;
      case 10:
        X6 = L6;
        break;
      default:
        X6 = C6;
        break;
    }

    // Formula: baseValue - (baseValue * X6)
    const result = baseValue - baseValue * X6;
    return Math.round(result);
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="flex sm:flex-row gap-4 sm:gap-8">
        <AnimaisAAdquirirTable
          formsDisabled={formsDisabled}
          data={data}
          onChange={handleDataChange}
        />
        <ReprodutorMatrizTable
          formsDisabled={formsDisabled}
          onChange={handleDataChange}
          data={data}
        />
      </div>

      <EquivalenciaUATable
        formsDisabled={formsDisabled}
        data={data}
        onChange={handleDataChange}
      />
      <div className="flex flex-col gap-4">
        <BovinoculturaTable
          data={data}
          anoInicial={anoInicial}
          formsDisabled={formsDisabled}
          onChange={handleDataChange}
          calculateTourosForYear={calculateTourosForYear}
          calculateMatrizesFor2025={calculateMatrizesFor2025}
          calculateMatrizesFor2026={calculateMatrizesFor2026}
          calculateMatrizesForLaterYears={calculateMatrizesForLaterYears}
          calculateBezerrosFor2025={calculateBezerrosFor2025}
          calculateBezerrosForLaterYears={calculateBezerrosForLaterYears}
          calculateGarrotesFor2025={calculateGarrotesFor2025}
          calculateGarrotesForLaterYears={calculateGarrotesForLaterYears}
          calculateNovilhosFor2025={calculateNovilhosFor2025}
          calculateNovilhosForLaterYears={calculateNovilhosForLaterYears}
          getStartingValue={getStartingValue}
        />
        <VendasAnimaisTable
          anoInicial={anoInicial}
          data={data}
          formsDisabled={formsDisabled}
          onChange={handleDataChange}
          C8={C8}
          E8={E8}
          F8={F8}
          G8={G8}
          H8={H8}
          I8={I8}
          J8={J8}
          K8={K8}
          L8={L8}
          D8={D8}
          B10={B10}
          B11={B11}
          B4={B4}
          C10={C10}
          C11={C11}
          C4={C4}
          D10={D10}
          D11={D11}
          D4={D4}
          F4={F4}
          G4={G4}
          H4={H4}
          I4={I4}
          J4={J4}
          K4={K4}
          L4={L4}
          E10={E10}
          E11={E11}
          F10={F10}
          G10={G10}
          H10={H10}
          I10={I10}
          J10={J10}
          K10={K10}
          L10={L10}
          F11={F11}
          G11={G11}
          H11={H11}
          I11={I11}
          J11={J11}
          K11={K11}
          L11={L11}
          E4={E4}
          calculateTourosForYear={calculateTourosForYear}
          calculateMatrizesFor2025={calculateMatrizesFor2025}
          calculateMatrizesFor2026={calculateMatrizesFor2026}
          calculateMatrizesForLaterYears={calculateMatrizesForLaterYears}
          calculateBezerrosFor2025={calculateBezerrosFor2025}
          calculateBezerrosForLaterYears={calculateBezerrosForLaterYears}
          calculateGarrotesFor2025={calculateGarrotesFor2025}
          calculateGarrotesForLaterYears={calculateGarrotesForLaterYears}
          calculateNovilhosFor2025={calculateNovilhosFor2025}
          calculateNovilhosForLaterYears={calculateNovilhosForLaterYears}
          getStartingValue={getStartingValue}
        />
      </div>
    </div>
  );
}

function AnimaisAAdquirirTable({ data, formsDisabled, onChange }) {
  const [reprodutoresAdquirir, setReprodutoresAdquirir] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_reprodutores || 0
  );
  const [matrizesAdquirir, setMatrizesAdquirir] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_matrizes || 0
  );

  const handleReprodutoresAdquirirChange = (e) => {
    const value = e.target.value;
    setReprodutoresAdquirir(value);
    const updatedData = { ...data, reprodutoresAdquirir: value };
    onChange(updatedData);
  };

  const handleMatrizesAdquirirChange = (e) => {
    const value = e.target.value;
    setMatrizesAdquirir(value);
    const updatedData = { ...data, matrizesAdquirir: value };
    onChange(updatedData);
  };

  return (
    <div className="overflow-hidden bg-gray-950/80  shadow sm:rounded-sm text-sm mx-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold leading-6 text-white">
          Animais a adquirir:
        </h3>
      </div>
      <div className="p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className=" p-2">
            <p className="font-semibold text-gray-100">Reprodutores</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={reprodutoresAdquirir}
              onChange={handleReprodutoresAdquirirChange}
              disabled={formsDisabled}
              className="text-center font-bold"
            />
          </div>

          <div className=" p-2">
            <p className="font-semibold text-gray-100">Matrizes</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={matrizesAdquirir}
              onChange={handleMatrizesAdquirirChange}
              disabled={formsDisabled}
              className="text-center font-bold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReprodutorMatrizTable({ formsDisabled, onChange, data }) {
  const [matrizes, setMatrizes] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.relacao_matrizes || 0
  );
  const [estabilizacao, setEstabilizacao] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.estabilizacao_plantel || 0
  );

  const handleMatrizesChange = (e) => {
    const value = e.target.value;
    setMatrizes(value);
    onChange({ ...data, relacao_matrizes: value });
  };

  const handleEstabilizacaoChange = (e) => {
    const value = e.target.value;
    setEstabilizacao(value);
    onChange({ ...data, estabilizacao_plantel: value });
  };

  return (
    <div className="overflow-hidden  shadow sm:rounded-sm text-sm mx-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold leading-6 text-white">
          Relação reprodutor/matriz:
        </h3>
      </div>
      <div className="bg-gray-950/80 p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className=" p-2">
            <p className="font-semibold">Reprodutor</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={1}
              disabled={true}
              className="text-center font-bold"
            />
          </div>

          <div className="p-2">
            <p className="font-semibold">Matrizes</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={matrizes}
              onChange={handleMatrizesChange}
              disabled={formsDisabled}
              className="text-center font-bold"
            />
          </div>

          <div className="col-span-2 p-2">
            <p className="font-semibold">
              Estabilização do Plantel (matrizes):
            </p>
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="number"
              value={estabilizacao}
              onChange={handleEstabilizacaoChange}
              disabled={formsDisabled}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EquivalenciaUATable({ data, onChange, formsDisabled }) {
  const [touro, setTouro] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_touro
  );
  const [matrizes, setMatrizes] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_matrizes
  );
  const [novilhos, setNovilhos] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_novilhos
  );
  const [garrotes, setGarrotes] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_garrotes
  );
  const [bezerros, setBezerros] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_bezerros
  );

  const handleTouroChange = (e) => {
    const value = e.target.value;
    setTouro(value);
    onChange({ ...data, equivalenciaUA_touro: value });
  };

  const handleMatrizesChange = (e) => {
    const value = e.target.value;
    setMatrizes(value);
    onChange({ ...data, equivalenciaUA_matrizes: value });
  };

  const handleNovilhosChange = (e) => {
    const value = e.target.value;
    setNovilhos(value);
    onChange({ ...data, equivalenciaUA_novilhos: value });
  };

  const handleGarrotesChange = (e) => {
    const value = e.target.value;
    setGarrotes(value);
    onChange({ ...data, equivalenciaUA_garrotes: value });
  };

  const handleBezerrosChange = (e) => {
    const value = e.target.value;
    setBezerros(value);
    onChange({ ...data, equivalenciaUA_bezerros: value });
  };

  return (
    <div className="overflow-hidden bg-gray-950/80 sm:rounded-sm text-sm mx-4">
      <div className="bg-gray-800 p-4">
        <h3 className="text-lg font-bold leading-6 text-white">
          Equivalência em UA
        </h3>
      </div>
      <div className=" p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className=" p-2 flex items-center">
            <p className="font-semibold">Touro</p>
          </div>
          <div className="p-2 ">
            <Input
              type="number"
              value={touro}
              step="0.05"
              onChange={handleTouroChange}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className="p-2 flex items-center">
            <p className="font-semibold">Matrizes</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              step="0.05"
              value={matrizes}
              onChange={handleMatrizesChange}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className=" p-2 flex items-center">
            <p className="font-semibold">Novilhos(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={novilhos}
              step="0.05"
              onChange={handleNovilhosChange}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className=" p-2 flex items-center">
            <p className="font-semibold">Garrotes(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={garrotes}
              step="0.05"
              onChange={handleGarrotesChange}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className=" p-2 flex items-center">
            <p className="font-semibold">Bezerros(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={bezerros}
              step="0.05"
              onChange={handleBezerrosChange}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function mapDescricaoToField(descricao) {
  switch (descricao) {
    case "Touro":
      return "reprodutores";
    case "Matrizes":
      return "matrizes";
    case "Bezerros (0 a 12 meses)":
      return "bezerros";
    case "Bezerras (0 a 12 meses)":
      return "bezerras";
    case "Garrotes (12 a 24 meses)":
      return "garrotes";
    case "Garrotas (12 a 24 meses)":
      return "garrotas";
    case "Novilhos (24 a 36 meses)":
      return "novilhos";
    case "Novilhas (24 a 36 meses)":
      return "novilhas";
    default:
      return "";
  }
}

function mapExcelToBanco({ letra, numero }) {
  const anoIndex = letra.charCodeAt(0) - "B".charCodeAt(0) + 1;
  let descricao;
  switch (numero) {
    case 4:
      descricao = "Parição";
      break;
    case 5:
      descricao = "Mortalidade de bezerros(as)";
      break;
    case 6:
      descricao = "Mortalidade de garrotes(as)";
      break;
    case 7:
      descricao = "Mortalidade de adultos";
      break;
    case 8:
      descricao = "Descarte matriz existente";
      break;
    case 9:
      descricao = "Descarte adquiridos";
      break;
    case 10:
      descricao = "Período de ordenha";
      break;
    case 11:
      descricao = "Produção leite/dia";
      break;
    default:
      descricao = "Unknown description";
  }

  return { descricao, anoIndex };
}

function BovinoculturaTable({
  data,
  anoInicial,
  formsDisabled,
  onChange,
  calculateTourosForYear,
  calculateMatrizesFor2025,
  calculateMatrizesFor2026,
  calculateMatrizesForLaterYears,
  calculateBezerrosFor2025,
  calculateBezerrosForLaterYears,
  calculateGarrotesFor2025,
  calculateGarrotesForLaterYears,
  calculateNovilhosFor2025,
  calculateNovilhosForLaterYears,
  getStartingValue,
}) {
  const DESCRICOES = BOVINOCULTURA_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  /* DESCRIÇÕES ------------------
    Parição
    Mortalidade de bezerros(as)
    Mortalidade de garrotes(as)
    Mortalidade de adultos
    Descarte matriz existente
    Descarte adquiridos
    Período de ordenha
    Produção leite/dia
   --------------------------- */

  const inventario = data?.dadosInventario?.[0] || {};

  const handleInputChange = (descricao, value) => {
    const field = mapDescricaoToField(descricao);
    const updatedInventario = {
      ...inventario,
      [field]: value,
    };
    const updatedData = { ...data, dadosInventario: [updatedInventario] };
    onChange(updatedData);
  };

  const calculateTotaisEvolucao = (yearIndex) => {
    let total = 0;

    DESCRICOES.forEach((descricao) => {
      let value;

      if (descricao === "Touro") {
        value = calculateTourosForYear(yearIndex);
      } else if (descricao === "Matrizes" && yearIndex === 1) {
        value = calculateMatrizesFor2025();
      } else if (descricao === "Matrizes" && yearIndex === 2) {
        value = calculateMatrizesFor2026();
      } else if (descricao === "Matrizes" && yearIndex > 2) {
        value = calculateMatrizesForLaterYears(yearIndex);
      } else if (
        (descricao === "Bezerros (0 a 12 meses)" ||
          descricao === "Bezerras (0 a 12 meses)") &&
        yearIndex === 1
      ) {
        value = calculateBezerrosFor2025(descricao);
      } else if (
        (descricao === "Bezerros (0 a 12 meses)" ||
          descricao === "Bezerras (0 a 12 meses)") &&
        yearIndex > 1
      ) {
        value = calculateBezerrosForLaterYears(yearIndex, descricao);
      } else if (
        (descricao === "Garrotes (12 a 24 meses)" ||
          descricao === "Garrotas (12 a 24 meses)") &&
        yearIndex === 1
      ) {
        value = calculateGarrotesFor2025(descricao);
      } else if (
        (descricao === "Garrotes (12 a 24 meses)" ||
          descricao === "Garrotas (12 a 24 meses)") &&
        yearIndex > 1
      ) {
        value = calculateGarrotesForLaterYears(yearIndex, descricao);
      } else if (
        (descricao === "Novilhos (24 a 36 meses)" ||
          descricao === "Novilhas (24 a 36 meses)") &&
        yearIndex === 1
      ) {
        value = calculateNovilhosFor2025(descricao);
      } else if (
        (descricao === "Novilhos (24 a 36 meses)" ||
          descricao === "Novilhas (24 a 36 meses)") &&
        yearIndex > 1
      ) {
        value = calculateNovilhosForLaterYears(yearIndex, descricao);
      } else {
        value = getStartingValue(descricao) || 0;
      }

      total += value;
    });

    return total;
  };

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg px-4">
      <h2 className="text-lg font-bold bg-gray-800 p-3 rounded-sm">
        Tabela de evolução
      </h2>
      <Table className="mt-4 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Descrição</TableHead>
            {anos.map((ano) => (
              <TableHead key={ano}>{ano}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {DESCRICOES.map((descricao, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{descricao}</TableCell>
              {anos.map((_, i) => (
                <TableCell key={i}>
                  <Input
                    type="text"
                    value={
                      descricao === "Touro" && i > 0
                        ? calculateTourosForYear(i)
                        : descricao === "Matrizes" && i === 1
                        ? calculateMatrizesFor2025()
                        : descricao === "Matrizes" && i === 2
                        ? calculateMatrizesFor2026()
                        : descricao === "Matrizes" && i > 2
                        ? calculateMatrizesForLaterYears(i)
                        : (descricao === "Bezerros (0 a 12 meses)" ||
                            descricao === "Bezerras (0 a 12 meses)") &&
                          i === 1
                        ? calculateBezerrosFor2025(descricao)
                        : (descricao === "Bezerros (0 a 12 meses)" ||
                            descricao === "Bezerras (0 a 12 meses)") &&
                          i > 1
                        ? calculateBezerrosForLaterYears(i, descricao)
                        : (descricao === "Garrotes (12 a 24 meses)" ||
                            descricao === "Garrotas (12 a 24 meses)") &&
                          i === 1
                        ? calculateGarrotesFor2025(descricao)
                        : (descricao === "Garrotes (12 a 24 meses)" ||
                            descricao === "Garrotas (12 a 24 meses)") &&
                          i > 1
                        ? calculateGarrotesForLaterYears(i, descricao)
                        : // For Novilhos and Novilhas in 2025
                        descricao === "Novilhos (24 a 36 meses)" && i === 1
                        ? calculateNovilhosFor2025(descricao)
                        : descricao === "Novilhas (24 a 36 meses)" && i === 1
                        ? calculateNovilhosFor2025(descricao)
                        : // For Novilhos and Novilhas in later years (2026 and forward)
                        (descricao === "Novilhos (24 a 36 meses)" ||
                            descricao === "Novilhas (24 a 36 meses)") &&
                          i > 1
                        ? calculateNovilhosForLaterYears(i, descricao)
                        : // Starting values for the first year (2024)
                        i === 0
                        ? getStartingValue(descricao) || " "
                        : // Default empty case
                          ""
                    }
                    onChange={(e) =>
                      handleInputChange(descricao, e.target.value)
                    }
                    className="w-full text-center"
                    disabled={true}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* TOTAL DO REBANHO FOOTER */}
          <TableRow className="bg-gray-950 hover:bg-gray-950 font-bold text-white">
            <TableCell>Total do Rebanho</TableCell>
            {anos.map((_, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={calculateTotaisEvolucao(i)}
                  className="w-full text-center"
                  disabled={true}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

function VendasAnimaisTable({
  data,
  anoInicial,
  formsDisabled,
  onChange,
  C8,
  D8,
  E8,
  F8,
  G8,
  H8,
  I8,
  J8,
  K8,
  L8,
  B10,
  B11,
  B4,
  C4,
  C10,
  C11,
  D10,
  D11,
  D4,
  E4,
  F4,
  G4,
  H4,
  I4,
  J4,
  K4,
  L4,
  E10,
  F10,
  G10,
  H10,
  I10,
  J10,
  K10,
  L10,
  E11,
  F11,
  G11,
  H11,
  I11,
  J11,
  K11,
  L11,
  calculateTourosForYear,
  calculateMatrizesFor2025,
  calculateMatrizesFor2026,
  calculateMatrizesForLaterYears,
  calculateBezerrosFor2025,
  calculateBezerrosForLaterYears,
  calculateGarrotesFor2025,
  calculateGarrotesForLaterYears,
  calculateNovilhosFor2025,
  calculateNovilhosForLaterYears,
  getStartingValue,
}) {
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const reprodutoresAdquirir =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_reprodutores || 0;
  const relacaoMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.relacao_matrizes || 0;
  const estabilizacaoPlantel =
    data?.dadosEvolucaoRebanho?.[0]?.estabilizacao_plantel || 0;
  const animaisAdquirirMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_matrizes || 0;

  const [matrizesDescartadasValues, setMatrizesDescartadasValues] = useState(
    Array(11).fill("")
  );
  const [novilhosVendidosValues, setNovilhosVendidosValues] = useState(
    Array(11).fill("")
  );
  const [novilhasVendidasValues, setNovilhasVendidasValues] = useState(
    Array(11).fill("")
  );
  const [leiteParaVendaValues, setLeiteParaVendaValues] = useState(
    Array(11).fill("")
  );
  const [equivalenciaUAValues, setEquivalenciaUAValues] = useState(
    Array(11).fill("")
  );

  const [matrizesDescartadas_ano0, setMatrizesDescartadas_ano0] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.matrizesDescartadas_ano0 || 1
  );
  const handleMatrizesDescartadasAno0Change = (e) => {
    console.log("oi matriz");
    const value = e.target.value;
    setMatrizesDescartadas_ano0(value);
    onChange({ ...data, matrizesDescartadas_ano0: value });
  };

  const [novilhoVendido_ano0, setNovilhoVendido_ano0] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.novilhoVendido_ano0 || 1
  );
  const handleNovilhoVendidoAno0Change = (e) => {
    const value = e.target.value;
    setNovilhoVendido_ano0(value);
    onChange({ ...data, novilhoVendido_ano0: value });
  };

  const [novilhaVendida_ano0, setNovilhaVendida_ano0] = useState(
    data?.dadosEvolucaoRebanho?.[0]?.novilhaVendida_ano0 || 1
  );
  const handleNovilhaVendidaAno0Change = (e) => {
    const value = e.target.value;
    setNovilhaVendida_ano0(value);
    onChange({ ...data, novilhaVendida_ano0: value });
  };

  const [queijoValues, setQueijoValues] = useState(() =>
    Array.from(
      { length: 11 },
      (_, i) => data?.dadosEvolucaoRebanho?.[0]?.[`queijo_ano${i}`] || 0
    )
  );

  const handleQueijoChange = (yearIndex, value) => {
    const updatedQueijoValues = [...queijoValues];
    console.log(yearIndex);
    updatedQueijoValues[yearIndex] = value;
    setQueijoValues(updatedQueijoValues);
    onChange({ ...data, queijoValues: updatedQueijoValues });
  };

  const permiteInput = (descricao, i) => {
    if (formsDisabled) return false;
    return (
      (i === 0 && descricao !== "Leite para venda (litros)") ||
      descricao === "Queijo (kg)"
    );
  };

  const calculateMatrizesDescartadasForYear = useCallback(
    (yearIndex) => {
      const matrizesValue =
        yearIndex === 1
          ? calculateMatrizesFor2025()
          : yearIndex === 2
          ? calculateMatrizesFor2026()
          : calculateMatrizesForLaterYears(yearIndex);
      const discardRate =
        yearIndex === 1
          ? C8
          : yearIndex === 2
          ? D8
          : yearIndex === 3
          ? E8
          : yearIndex === 4
          ? F8
          : yearIndex === 5
          ? G8
          : yearIndex === 6
          ? H8
          : yearIndex === 7
          ? I8
          : yearIndex === 8
          ? J8
          : yearIndex === 9
          ? K8
          : yearIndex === 10
          ? L8
          : 0;

      let res =
        matrizesValue && discardRate
          ? Math.round(matrizesValue * discardRate)
          : "";
      return res;
    },
    [
      C8,
      D8,
      E8,
      F8,
      G8,
      H8,
      I8,
      J8,
      K8,
      L8,
      calculateMatrizesFor2025,
      calculateMatrizesFor2026,
      calculateMatrizesForLaterYears,
    ]
  );

  const calculateNovilhoVendidoForYear = useCallback(
    (yearIndex) => {
      if (yearIndex === 0) {
        return "";
      }

      let novilhosValue;
      switch (yearIndex) {
        case 1: // 2025
          novilhosValue = calculateNovilhosFor2025("Novilhos (24 a 36 meses)");
          break;
        case 2: // 2026
          novilhosValue = calculateNovilhosForLaterYears(
            2,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 3: // 2027
          novilhosValue = calculateNovilhosForLaterYears(
            3,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 4: // 2028
          novilhosValue = calculateNovilhosForLaterYears(
            4,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 5: // 2029
          novilhosValue = calculateNovilhosForLaterYears(
            5,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 6: // 2030
          novilhosValue = calculateNovilhosForLaterYears(
            6,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 7: // 2031
          novilhosValue = calculateNovilhosForLaterYears(
            7,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 8: // 2032
          novilhosValue = calculateNovilhosForLaterYears(
            8,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 9: // 2033
          novilhosValue = calculateNovilhosForLaterYears(
            9,
            "Novilhos (24 a 36 meses)"
          );
          break;
        case 10: // 2034
          novilhosValue = calculateNovilhosForLaterYears(
            10,
            "Novilhos (24 a 36 meses)"
          );
          break;
        default:
          novilhosValue = "";
      }

      return novilhosValue;
    },
    [calculateNovilhosFor2025, calculateNovilhosForLaterYears]
  );

  const calculateNovilhasVendidasFor2025 = useCallback(() => {
    const matrizes2024 = getStartingValue("Matrizes"); // B24
    const novilhas2024 = getStartingValue("Novilhas (24 a 36 meses)"); // B30

    const formula = animaisAdquirirMatrizes + matrizes2024 + novilhas2024;
    const result =
      formula < estabilizacaoPlantel
        ? Math.round(novilhas2024 * 0.1)
        : Math.round(
            animaisAdquirirMatrizes +
              matrizes2024 +
              novilhas2024 * 0.7 -
              estabilizacaoPlantel
          );

    return result;
  }, [animaisAdquirirMatrizes, estabilizacaoPlantel, getStartingValue]);

  const calculateNovilhasVendidasForLaterYears = useCallback(
    (yearIndex) => {
      if (yearIndex === 0) {
        return "";
      }
      const matrizesValue =
        yearIndex === 2
          ? calculateMatrizesFor2026()
          : yearIndex > 2
          ? calculateMatrizesForLaterYears(yearIndex)
          : 0;

      const novilhasValue = calculateNovilhosForLaterYears(
        yearIndex,
        "Novilhas (24 a 36 meses)"
      );

      const discardRate =
        yearIndex === 2
          ? D8
          : yearIndex === 3
          ? E8
          : yearIndex === 4
          ? F8
          : yearIndex === 5
          ? G8
          : yearIndex === 6
          ? H8
          : yearIndex === 7
          ? I8
          : yearIndex === 8
          ? J8
          : yearIndex === 9
          ? K8
          : L8;

      const result =
        matrizesValue < estabilizacaoPlantel
          ? Math.round(novilhasValue * 0.1)
          : Math.round(novilhasValue - matrizesValue * discardRate);

      return result;
    },
    [
      D8,
      E8,
      F8,
      G8,
      H8,
      I8,
      J8,
      K8,
      L8,
      calculateMatrizesFor2026,
      calculateMatrizesForLaterYears,
      calculateNovilhosForLaterYears,
      estabilizacaoPlantel,
    ]
  );

  const findDataForDescricao = useCallback(
    (descricao) => {
      return data?.aba_vendas_animais?.find(
        (item) => item.descricao === descricao
      );
    },
    [data?.aba_vendas_animais]
  );

  const calculateLeiteParaVendaForYear = useCallback(
    (yearIndex) => {
      if (yearIndex === 0) {
        const matrizes2024 = getStartingValue("Matrizes"); // B24
        const leiteParaVenda2024 = Math.round(
          ((B4 * B10) / 360) * matrizes2024 * B11 * 365
        );
        return leiteParaVenda2024;
      } else if (yearIndex === 1) {
        const matrizes2025 = calculateMatrizesFor2025(); // C24
        const bezerros2025 = calculateBezerrosFor2025(
          "Bezerros (0 a 12 meses)"
        ); // C25
        const bezerras2025 = calculateBezerrosFor2025(
          "Bezerras (0 a 12 meses)"
        ); // C26

        const queijo2025 = findDataForDescricao("Queijo (kg)")?.["ano2"] || 0; // C37

        const baseLeite = Math.round(
          ((C4 * C10) / 360) * matrizes2025 * C11 * 365
        );

        const deduction = 4 * 60 * (bezerros2025 + bezerras2025);
        const queijoDeduction = queijo2025 * 10;

        return baseLeite - deduction - queijoDeduction;
      } else if (yearIndex >= 2) {
        const matrizesForYear =
          yearIndex === 2
            ? calculateMatrizesFor2026()
            : calculateMatrizesForLaterYears(yearIndex); // D24, E24, etc.

        const bezerrosForYear = calculateBezerrosForLaterYears(
          yearIndex,
          "Bezerros (0 a 12 meses)"
        ); // D25, E25, etc.

        const bezerrasForYear = calculateBezerrosForLaterYears(
          yearIndex,
          "Bezerras (0 a 12 meses)"
        ); // D26, E26, etc.

        const queijoForYear =
          findDataForDescricao("Queijo (kg)")?.[`ano${yearIndex + 1}`] || 0; // D37, E37, etc.
        const current4 =
          yearIndex === 2
            ? D4
            : yearIndex === 3
            ? E4
            : yearIndex === 4
            ? F4
            : yearIndex === 5
            ? G4
            : yearIndex === 6
            ? H4
            : yearIndex === 7
            ? I4
            : yearIndex === 8
            ? J4
            : yearIndex === 9
            ? K4
            : yearIndex === 10
            ? L4
            : 0;

        const current10 =
          yearIndex === 2
            ? D10
            : yearIndex === 3
            ? E10
            : yearIndex === 4
            ? F10
            : yearIndex === 5
            ? G10
            : yearIndex === 6
            ? H10
            : yearIndex === 7
            ? I10
            : yearIndex === 8
            ? J10
            : yearIndex === 9
            ? K10
            : yearIndex === 10
            ? L10
            : 0;

        const current11 =
          yearIndex === 2
            ? D11
            : yearIndex === 3
            ? E11
            : yearIndex === 4
            ? F11
            : yearIndex === 5
            ? G11
            : yearIndex === 6
            ? H11
            : yearIndex === 7
            ? I11
            : yearIndex === 8
            ? J11
            : yearIndex === 9
            ? K11
            : yearIndex === 10
            ? L11
            : 0;

        const baseLeite = Math.round(
          ((current4 * current10) / 360) * matrizesForYear * current11 * 365
        );

        const deduction = 4 * 60 * (bezerrosForYear + bezerrasForYear);
        const queijoDeduction = queijoForYear * 10;

        return baseLeite - deduction - queijoDeduction;
      }
      return "";
    },
    [
      B10,
      B11,
      B4,
      C10,
      C11,
      C4,
      D10,
      D11,
      D4,
      E10,
      E11,
      E4,
      F10,
      F11,
      F4,
      G10,
      G11,
      G4,
      H10,
      H11,
      H4,
      I10,
      I11,
      I4,
      J10,
      J11,
      J4,
      K10,
      K11,
      K4,
      L10,
      L11,
      L4,
      calculateBezerrosFor2025,
      calculateBezerrosForLaterYears,
      calculateMatrizesFor2025,
      calculateMatrizesFor2026,
      calculateMatrizesForLaterYears,
      findDataForDescricao,
      getStartingValue,
    ]
  );

  /**
   *
   * é a funçao principal dos cálculos.
   *
   * @param {*} descricao
   * @param {*} yearIndex
   * @returns
   */
  const getCalculatedValue = (descricao, yearIndex) => {
    switch (descricao) {
      case "Matrizes Descartadas":
        return calculateMatrizesDescartadasForYear(yearIndex);
      case "Novilhos Vendidos":
        return calculateNovilhoVendidoForYear(yearIndex);
      case "Novilhas Vendidas":
        return yearIndex === 1
          ? calculateNovilhasVendidasFor2025()
          : yearIndex > 1
          ? calculateNovilhasVendidasForLaterYears(yearIndex)
          : "";
      case "Leite para venda (litros)":
        return calculateLeiteParaVendaForYear(yearIndex);
      default:
        return "";
    }
  };

  const calculateEquivalenciaUAForYear = useCallback(
    (yearIndex) => {
      const touroValue = calculateTourosForYear(yearIndex);
      const matrizesValue =
        yearIndex === 0
          ? getStartingValue("Matrizes")
          : yearIndex === 1
          ? calculateMatrizesFor2025()
          : yearIndex === 2
          ? calculateMatrizesFor2026()
          : calculateMatrizesForLaterYears(yearIndex);

      const bezerrosValue =
        yearIndex === 0
          ? getStartingValue("Bezerros (0 a 12 meses)")
          : yearIndex === 1
          ? calculateBezerrosFor2025("Bezerros (0 a 12 meses)")
          : calculateBezerrosForLaterYears(yearIndex);

      const bezerrasValue =
        yearIndex === 0
          ? getStartingValue("Bezerras (0 a 12 meses)")
          : yearIndex === 1
          ? calculateBezerrosFor2025("Bezerras (0 a 12 meses)")
          : calculateBezerrosForLaterYears(yearIndex);

      const garrotesValue =
        yearIndex === 0
          ? getStartingValue("Garrotes (12 a 24 meses)")
          : yearIndex === 1
          ? calculateGarrotesFor2025("Garrotes (12 a 24 meses)")
          : calculateGarrotesForLaterYears(
              yearIndex,
              "Garrotes (12 a 24 meses)"
            );

      const garrotasValue =
        yearIndex === 0
          ? getStartingValue("Garrotas (12 a 24 meses)")
          : yearIndex === 1
          ? calculateGarrotesFor2025("Garrotas (12 a 24 meses)")
          : calculateGarrotesForLaterYears(
              yearIndex,
              "Garrotas (12 a 24 meses)"
            );

      const novilhosValue =
        yearIndex === 0
          ? getStartingValue("Novilhos (24 a 36 meses)")
          : yearIndex === 1
          ? calculateNovilhosFor2025("Novilhos (24 a 36 meses)")
          : calculateNovilhosForLaterYears(
              yearIndex,
              "Novilhos (24 a 36 meses)"
            );

      const novilhasValue =
        yearIndex === 0
          ? getStartingValue("Novilhas (24 a 36 meses)")
          : yearIndex === 1
          ? calculateNovilhosFor2025("Novilhas (24 a 36 meses)")
          : calculateNovilhosForLaterYears(
              yearIndex,
              "Novilhas (24 a 36 meses)"
            );

      const H16 = data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_touro || 1;
      const H17 = data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_matrizes || 1;
      const H18 = data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_novilhos || 1;
      const H19 = data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_garrotes || 1;
      const H20 = data?.dadosEvolucaoRebanho?.[0]?.equivalenciaUA_bezerros || 1;

      const equivalenciaUA =
        touroValue * H16 +
        matrizesValue * H17 +
        bezerrosValue * H20 +
        bezerrasValue * H20 +
        garrotesValue * H19 +
        garrotasValue * H19 +
        novilhosValue * H18 +
        novilhasValue * H18;

      return equivalenciaUA.toFixed(2);
    },
    [
      calculateBezerrosFor2025,
      calculateBezerrosForLaterYears,
      calculateGarrotesFor2025,
      calculateGarrotesForLaterYears,
      calculateMatrizesFor2025,
      calculateMatrizesFor2026,
      calculateMatrizesForLaterYears,
      calculateNovilhosFor2025,
      calculateNovilhosForLaterYears,
      calculateTourosForYear,
      data?.dadosEvolucaoRebanho,
      getStartingValue,
    ]
  );

  // FAZ OS CÁLCULOS NO CARREGAMENTO, SÓ UMA VEZ (OU duas kkkkkkkk)
  useEffect(() => {
    const matrizesDescartadas = anos.map((yearIndex, i) =>
      i === 0
        ? matrizesDescartadas_ano0
        : calculateMatrizesDescartadasForYear(i)
    );
    setMatrizesDescartadasValues(matrizesDescartadas);

    const novilhosVendidos = anos.map((yearIndex, i) =>
      i === 0 ? novilhoVendido_ano0 : calculateNovilhoVendidoForYear(i)
    );
    setNovilhosVendidosValues(novilhosVendidos);

    const novilhasVendidas = anos.map((yearIndex, i) => {
      if (i === 0) return novilhaVendida_ano0;
      if (i === 1) {
        return calculateNovilhasVendidasFor2025();
      }
      return calculateNovilhasVendidasForLaterYears(i);
    });
    setNovilhasVendidasValues(novilhasVendidas);

    const leiteParaVenda = anos.map((yearIndex, i) =>
      calculateLeiteParaVendaForYear(i)
    );
    setLeiteParaVendaValues(leiteParaVenda);

    const equivalenciaUA = anos.map((yearIndex, i) =>
      calculateEquivalenciaUAForYear(i)
    );
    setEquivalenciaUAValues(equivalenciaUA);

    onChange({
      ...data,
      matrizesDescartadasValues: matrizesDescartadas,
      novilhosVendidosValues: novilhosVendidos,
      novilhasVendidasValues: novilhasVendidas,
      leiteParaVendaValues: leiteParaVenda,
      equivalenciaUAValues: equivalenciaUA,
      queijoValues: queijoValues,
    });
  }, []);

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg p-4">
      <h2 className="text-lg font-bold bg-gray-800 p-3 rounded-sm">
        Tabela de vendas de animais e produtos
      </h2>
      <Table className="mt-1 w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">Descrição</TableHead>
            {anos.map((ano) => (
              <TableHead key={ano}>{ano}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {VENDA_ANIMAIS_PRODUTOS_DESCRICOES.map((descricao, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{descricao}</TableCell>
              {anos.map((yearIndex, i) => (
                <TableCell key={i}>
                  <Input
                    type="text"
                    value={
                      descricao === "Matrizes Descartadas"
                        ? i === 0
                          ? matrizesDescartadas_ano0
                          : matrizesDescartadasValues[i]
                        : descricao === "Novilhos Vendidos"
                        ? i === 0
                          ? novilhoVendido_ano0
                          : novilhosVendidosValues[i]
                        : descricao === "Novilhas Vendidas"
                        ? i === 0
                          ? novilhaVendida_ano0
                          : novilhasVendidasValues[i]
                        : descricao === "Leite para venda (litros)"
                        ? leiteParaVendaValues[i]
                        : descricao === "Equivalência UA"
                        ? equivalenciaUAValues[i]
                        : descricao === "Queijo (kg)"
                        ? queijoValues[i]
                        : ""
                    }
                    onChange={(e) => {
                      switch (descricao) {
                        case "Matrizes Descartadas":
                          if (i === 0) handleMatrizesDescartadasAno0Change(e);
                          break;
                        case "Novilhos Vendidos":
                          if (i === 0) handleNovilhoVendidoAno0Change(e);
                          break;
                        case "Novilhas Vendidas":
                          if (i === 0) handleNovilhaVendidaAno0Change(e);
                          break;
                        case "Queijo (kg)":
                          handleQueijoChange(i, parseFloat(e.target.value));
                          break;
                        default:
                          console.log(yearIndex);
                          break;
                      }
                    }}
                    className="w-full text-center"
                    disabled={!permiteInput(descricao, i)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}

          {/* Equivalência UA Row */}
          <TableRow className="bg-gray-950 hover:bg-gray-950">
            <TableCell className="font-bold text-md">Equivalência UA</TableCell>
            {anos.map((_, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={equivalenciaUAValues[i]}
                  className="w-full text-center"
                  disabled={true}
                />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
