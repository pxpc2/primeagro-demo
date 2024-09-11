import { useState } from "react";
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
  BOVINOCULTURA_DESCRICOES,
  VENDA_ANIMAIS_PRODUTOS_DESCRICOES,
} from "@/utils/constants";

export default function EvolucaoRebanhoBovinocultura({
  data,
  formsDisabled,
  anoInicial,
  onChange,
}) {
  const handleDataChange = (updatedData) => {
    onChange(updatedData);
  };

  console.log(data);

  return (
    <div className="flex flex-col gap-12">
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
      <EquivalenciaUATable formsDisabled={formsDisabled} />
      <div className="flex flex-col gap-4">
        <BovinoculturaTable
          data={data}
          anoInicial={anoInicial}
          formsDisabled={formsDisabled}
          onChange={handleDataChange}
        />
        <VendasAnimaisTable
          anoInicial={anoInicial}
          data={data}
          formsDisabled={formsDisabled}
          onChange={handleDataChange}
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
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          Animais a adquirir:
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-2">
            <p className="font-semibold">Reprodutores</p>
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

          <div className="bg-gray-100 p-2">
            <p className="font-semibold">Matrizes</p>
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
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          Relação reprodutor/matriz:
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-2">
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

          <div className="bg-gray-100 p-2">
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

function EquivalenciaUATable({ formsDisabled }) {
  const [touro, setTouro] = useState(1.5);
  const [matrizes, setMatrizes] = useState(1);
  const [novilhos, setNovilhos] = useState(1);
  const [garrotes, setGarrotes] = useState(0.5);
  const [bezerros, setBezerros] = useState(0.25);

  return (
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white">
          Equivalência em UA
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-100 p-2 flex items-center">
            <p className="font-semibold">Touro</p>
          </div>
          <div className="p-2 ">
            <Input
              type="number"
              value={touro}
              onChange={(e) => setTouro(e.target.value)}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className="bg-gray-100 p-2 flex items-center">
            <p className="font-semibold">Matrizes</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={matrizes}
              onChange={(e) => setMatrizes(e.target.value)}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className="bg-gray-100 p-2 flex items-center">
            <p className="font-semibold">Novilhos(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={novilhos}
              onChange={(e) => setNovilhos(e.target.value)}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className="bg-gray-100 p-2 flex items-center">
            <p className="font-semibold">Garrotes(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={garrotes}
              onChange={(e) => setGarrotes(e.target.value)}
              disabled={formsDisabled}
              className="text-center"
            />
          </div>

          <div className="bg-gray-100 p-2 flex items-center">
            <p className="font-semibold">Bezerros(as)</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={bezerros}
              onChange={(e) => setBezerros(e.target.value)}
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

function BovinoculturaTable({ data, anoInicial, formsDisabled, onChange }) {
  const DESCRICOES = BOVINOCULTURA_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const reprodutoresAdquirir =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_reprodutores || 0;
  const relacaoMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.relacao_matrizes || 0;
  const estabilizacaoPlantel =
    data?.dadosEvolucaoRebanho?.[0]?.estabilizacao_plantel || 0;
  const animaisAdquirirMatrizes =
    data?.dadosEvolucaoRebanho?.[0]?.animaisAdquirir_matrizes || 0;

  // Temporarily store D8 as 0 POR ENQUANTO
  const [D8, setD8] = useState(0);

  const inventario = data?.dadosInventario?.[0] || {};

  // Get the initial value from inventario (2024)
  const getStartingValue = (descricao) => {
    const field = mapDescricaoToField(descricao);
    return parseFloat(inventario[field] || 0);
  };

  const handleInputChange = (descricao, value) => {
    const field = mapDescricaoToField(descricao);
    const updatedInventario = {
      ...inventario,
      [field]: value,
    };
    const updatedData = { ...data, dadosInventario: [updatedInventario] };
    onChange(updatedData);
  };

  const calculateMatrizesForYear = (
    yearIndex,
    prevYearValue,
    novilhasValue
  ) => {
    const adjustmentFactor = prevYearValue * D8; // D24 * D8
    const calculatedNovilhas = novilhasValue * 0.9; // E30 * 0.9

    const sum = prevYearValue - adjustmentFactor + calculatedNovilhas;

    return Math.round(sum < estabilizacaoPlantel ? sum : estabilizacaoPlantel);
  };

  const calculateMatrizesFor2025 = () => {
    const matrizes2024 = getStartingValue("Matrizes");
    const novilhas2024 = getStartingValue("Novilhas (24 a 36 meses)");
    const sum = animaisAdquirirMatrizes + matrizes2024 + novilhas2024;

    return Math.round(sum < estabilizacaoPlantel ? sum : estabilizacaoPlantel);
  };

  const calculateMatrizesFor2026 = () => {
    const matrizes2025 = calculateMatrizesFor2025();
    const novilhas2026 = getStartingValue("Novilhas (24 a 36 meses)") * 0.9;

    return Math.round(
      matrizes2025 + novilhas2026 < estabilizacaoPlantel
        ? matrizes2025 + novilhas2026
        : estabilizacaoPlantel
    );
  };

  // Calculate values for 2027 onwards
  const calculateMatrizesForLaterYears = (yearIndex) => {
    const prevYearValue =
      yearIndex === 1 ? calculateMatrizesFor2025() : calculateMatrizesFor2026();
    const novilhasValue = getStartingValue("Novilhas (24 a 36 meses)");

    return calculateMatrizesForYear(yearIndex, prevYearValue, novilhasValue);
  };

  const calculateTourosForYear = (yearIndex) => {
    const matrizes2024 = getStartingValue("Matrizes");

    if (matrizes2024 < 1) {
      return 0;
    } else if (matrizes2024 / relacaoMatrizes <= reprodutoresAdquirir) {
      return reprodutoresAdquirir;
    } else {
      return Math.round(matrizes2024 / relacaoMatrizes);
    }
  };

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg p-4">
      <h2 className="text-lg font-bold">Tabela de evolução</h2>
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
                        ? calculateMatrizesForLaterYears(i) // Handle years 2027 onwards
                        : i === 0
                        ? getStartingValue(descricao)
                        : ""
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
        </TableBody>
      </Table>
    </div>
  );
}

function VendasAnimaisTable({ data, anoInicial, formsDisabled, onChange }) {
  const equivalenciaUAData = data?.equivalencia_ua || {};
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const handleInputChange = (descricao, ano, value) => {
    const updatedVendasAnimais = data?.aba_vendas_animais?.map((item) =>
      item.descricao === descricao ? { ...item, [`ano${ano}`]: value } : item
    );
    const updatedData = { ...data, aba_vendas_animais: updatedVendasAnimais };
    onChange(updatedData);
  };

  const findDataForDescricao = (descricao) => {
    return data?.aba_vendas_animais?.find(
      (item) => item.descricao === descricao
    );
  };

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg p-4">
      <h2 className="text-lg font-bold">
        Tabela de vendas de animais e produtos
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
          {DESCRICOES.map((descricao, index) => {
            const dataItem = findDataForDescricao(descricao);
            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{descricao}</TableCell>
                {anos.map((ano, i) => (
                  <TableCell key={i}>
                    <Input
                      type="text"
                      value={dataItem ? dataItem[`ano${i + 1}`] || "" : ""}
                      onChange={(e) =>
                        handleInputChange(descricao, i + 1, e.target.value)
                      }
                      className="w-full text-center"
                      disabled={formsDisabled}
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          <TableRow className="bg-gray-400 text-black hover:text-white">
            <TableCell className="font-bold text-md">Equivalência UA</TableCell>
            {anos.map((ano, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={equivalenciaUAData[`ano${i + 1}`] || ""}
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
