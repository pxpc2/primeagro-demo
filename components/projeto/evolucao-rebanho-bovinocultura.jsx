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
}) {
  const [B17, setB17] = useState(0); // REPRODUTORES A ADQUIRIR
  const [E18, setE18] = useState(0); // MATRIZES POR REPRODUTOR

  return (
    <div className="flex flex-col gap-12">
      <AnimaisAAdquirirTable
        formsDisabled={formsDisabled}
        onReprodutoresAdquirirChange={(value) => setB17(value)} // Update B17
        onMatrizesAdquirirChange={(value) => console.log(value)} // Add handler if necessary
      />
      <ReprodutorMatrizTable formsDisabled={formsDisabled} />
      <EquivalenciaUATable formsDisabled={formsDisabled} />
      <div className="flex flex-col gap-4">
        <BovinoculturaTable
          data={data}
          anoInicial={anoInicial}
          formsDisabled={formsDisabled}
        />
        <VendasAnimaisTable
          anoInicial={anoInicial}
          data={data}
          formsDisabled={formsDisabled}
        />
      </div>
    </div>
  );
}

function AnimaisAAdquirirTable({
  formsDisabled,
  onReprodutoresAdquirirChange,
  onMatrizesAdquirirChange,
}) {
  const [reprodutoresAdquirir, setReprodutoresAdquirir] = useState(0);
  const [matrizesAdquirir, setMatrizesAdquirir] = useState(0);

  const handleReprodutoresAdquirirChange = (e) => {
    const value = e.target.value;
    setReprodutoresAdquirir(value);
    onReprodutoresAdquirirChange(value);
  };

  const handleMatrizesAdquirirChange = (e) => {
    const value = e.target.value;
    setMatrizesAdquirir(value);
    onMatrizesAdquirirChange(value);
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

function ReprodutorMatrizTable({ formsDisabled }) {
  const [reprodutor, setReprodutor] = useState(1);
  const [matrizes, setMatrizes] = useState(0);
  const [estabilizacao, setEstabilizacao] = useState("");

  return (
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-bold leading-6 text-white ">
          Relação reprodutor/matriz:
        </h3>
      </div>
      <div className="bg-white p-4 text-gray-800">
        <div className="grid grid-cols-2 gap-4">
          {/* Reprodutor Row */}
          <div className="bg-gray-100 p-2">
            <p className="font-semibold">Reprodutor</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={1}
              onChange={(e) => setReprodutor(e.target.value)}
              disabled={true}
              className="text-center font-bold"
            />
          </div>
          {/* Matrizes Row */}
          <div className="bg-gray-100 p-2">
            <p className="font-semibold">Matrizes</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              value={matrizes}
              onChange={(e) => setMatrizes(e.target.value)}
              disabled={formsDisabled}
              className="text-center font-bold"
            />
          </div>

          {/* Estabilização Row */}
          <div className="col-span-2 p-2">
            <p className="font-semibold">
              Estabilização do Plantel (matrizes):
            </p>
          </div>
          <div className="col-span-2 p-2">
            <Input
              type="number"
              value={estabilizacao}
              onChange={(e) => setEstabilizacao(e.target.value)}
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
          {/* Touro Row */}
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

          {/* Matrizes Row */}
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

          {/* Novilhos(as) Row */}
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

          {/* Garrotes(as) Row */}
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

          {/* Bezerros(as) Row */}
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

function BovinoculturaTable({ data, anoInicial, formsDisabled }) {
  const DESCRICOES = BOVINOCULTURA_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const inventario = Array.isArray(data.dadosInventario)
    ? data.dadosInventario[0]
    : {};

  const handleInputChange = (descricao, ano, value) => {
    if (onChange) {
      onChange(descricao, ano, value);
    }
  };

  const findDataForDescricao = (descricao) => {
    return inventario[descricao.toLowerCase()];
  };

  const calculateTotals = () => {
    const totals = Array(anos.length).fill(0);

    DESCRICOES.forEach((descricao) => {
      const dataItem = findDataForDescricao(mapDescricaoToField(descricao));

      anos.forEach((ano, i) => {
        const value = i === 0 ? parseFloat(dataItem || 0) : 0;
        totals[i] += value;
      });
    });

    return totals;
  };

  const totals = calculateTotals();

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
          {DESCRICOES.map((descricao, index) => {
            const dataItem2024 = findDataForDescricao(
              mapDescricaoToField(descricao)
            );

            return (
              <TableRow key={index}>
                <TableCell className="font-medium">{descricao}</TableCell>
                {anos.map((ano, i) => (
                  <TableCell key={i}>
                    <Input
                      type="text"
                      value={i === 0 ? dataItem2024 || "" : ""}
                      onChange={(e) =>
                        handleInputChange(
                          descricao,
                          `ano${i + 1}`,
                          e.target.value
                        )
                      }
                      className="w-full text-center"
                      disabled={formsDisabled}
                    />
                  </TableCell>
                ))}
              </TableRow>
            );
          })}

          {/* Row for the Total do Rebanho */}
          <TableRow className="bg-gray-400 text-black hover:text-white">
            <TableCell className="font-bold">TOTAL DO REBANHO</TableCell>
            {anos.map((ano, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={totals[i] || ""}
                  className="w-full text-center font-bold"
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
function VendasAnimaisTable({ data, anoInicial, formsDisabled }) {
  const equivalenciaUAData = data.equivalencia_ua || {};
  const DESCRICOES = VENDA_ANIMAIS_PRODUTOS_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const handleInputChange = (descricao, ano, value) => {
    if (onChange) {
      onChange(descricao, ano, value);
    }
  };

  const vendasAnimaisData = Array.isArray(data.aba_vendas_animais)
    ? data.aba_vendas_animais
    : [];

  const findDataForDescricao = (descricao) => {
    return vendasAnimaisData.find((item) => item.descricao === descricao);
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
                        handleInputChange(
                          descricao,
                          `ano${i + 1}`,
                          e.target.value
                        )
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
                  onChange={(e) =>
                    handleInputChange(`ano${i + 1}`, e.target.value)
                  }
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
