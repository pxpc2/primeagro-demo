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
  return (
    <div className="flex flex-col gap-12">
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
        <EquivalenciaUA_FINAL
          data={data}
          anoInicial={anoInicial}
          formsDisabled={formsDisabled}
        />
      </div>
    </div>
  );
}

function ReprodutorMatrizTable({ formsDisabled }) {
  const [reprodutor, setReprodutor] = useState(0);
  const [matrizes, setMatrizes] = useState(0);
  const [estabilizacao, setEstabilizacao] = useState(""); // Assuming this is the third input

  return (
    <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg text-sm">
      <div className="bg-gray-100 p-4">
        <h3 className="text-md font-bold leading-6 text-gray-800 ">
          Relação reprodutor / matrizes a adquirir:
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
              value={reprodutor}
              onChange={(e) => setReprodutor(e.target.value)}
              disabled={formsDisabled}
              className="text-center font-bold text-xl"
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
              className="text-center font-bold text-xl"
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
      <div className="bg-gray-100 p-4">
        <h3 className="text-md font-bold leading-6 text-gray-800">
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

function BovinoculturaTable({ data, anoInicial, formsDisabled }) {
  const DESCRICOES = BOVINOCULTURA_DESCRICOES;
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const handleInputChange = (descricao, ano, value) => {
    if (onChange) {
      onChange(descricao, ano, value);
    }
  };

  const bovinoculturaData = Array.isArray(data.aba_bovinocultura)
    ? data.aba_bovinocultura
    : [];

  const findDataForDescricao = (descricao) => {
    return bovinoculturaData.find((item) => item.descricao === descricao);
  };

  return (
    <div className="w-full border-gray-200 shadow sm:rounded-lg p-4">
      <h2 className="text-lg font-bold">Tabela de evolução do rebanho</h2>
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
          <TableRow>
            <TableCell className="font-bold">TOTAL DO REBANHO</TableCell>
            {anos.map((ano, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={
                    data.total_rebanho
                      ? data.total_rebanho[`ano${i + 1}`] || ""
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "TOTAL DO REBANHO",
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
        </TableBody>
      </Table>
    </div>
  );
}

function VendasAnimaisTable({ data, anoInicial, formsDisabled }) {
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
          <TableRow>
            <TableCell className="font-bold">LEITE PARA VENDA</TableCell>
            {anos.map((ano, i) => (
              <TableCell key={i}>
                <Input
                  type="text"
                  value={
                    data.leite_para_venda
                      ? data.leite_para_venda[`ano${i + 1}`] || "-"
                      : "-"
                  }
                  onChange={(e) =>
                    handleInputChange(
                      "LEITE PARA VENDA",
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
        </TableBody>
      </Table>
    </div>
  );
}

function EquivalenciaUA_FINAL({ data, anoInicial, formsDisabled }) {
  const anos = Array.from({ length: 11 }, (_, i) => anoInicial + i);

  const handleInputChange = (ano, value) => {
    if (onChange) {
      onChange("Equivalencia UA", ano, value);
    }
  };

  const equivalenciaUAData = data.equivalencia_ua || {};

  return (
    <Table className="mt-4 w-full  p-4">
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/4"></TableHead>
          {anos.map((ano) => (
            <TableHead key={ano}>{ano}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
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
  );
}
