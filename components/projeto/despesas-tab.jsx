import { ANO_INICIAL } from "@/utils/constants";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Heading from "./Header";
import { Input } from "../ui/input";
import { submitDespesas } from "@/app/projeto/actions";

export default function DespesasTab({ data, isAdmin, receitasData }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [totalReceitas, setTotalReceitas] = useState(Array(12).fill(0)); // guarda TUDO de receitas
  // se colocarmos mais receitas, viria junto nesse array
  // se eu precisar add mais do que bovinocultura eventualmente, vai vir já de receitas
  // aqui dentro a gente separaria a partir desse objeto de receitas ja com outros totais novos
  const anos = Array.from({ length: 12 }, (_, index) => ANO_INICIAL + index);

  const [custoPadraoBovinocultura, setCustoPadraoBovinocultura] = useState(
    data?.custoPadraoBovinocultura || 0.5
  );
  const [totalCustos, setTotalCustos] = useState(
    data?.totalCustos || Array(12).fill(0)
  );
  const [lucroOperacional, setLucroOperacional] = useState(
    data?.lucroOperacional || Array(12).fill(0)
  );

  // Calcula os totais de Receitas para cada ano
  // ultimos dois anos copia ao 2033
  useEffect(() => {
    const newTotalReceitas = Array(12).fill(0);
    for (let i = 0; i < 10; i++) {
      const totalMatrizes =
        receitasData?.dadosReceita?.valorMatrizesDescartadas?.[i] || 0;
      const totalNovilhos =
        receitasData?.dadosReceita?.valorNovilhosVendidos?.[i] || 0;
      const totalNovilhas =
        receitasData?.dadosReceita?.valorNovilhasVendidas?.[i] || 0;
      const totalQueijo = receitasData?.dadosReceita?.valorQueijo?.[i] || 0;
      const totalLeite =
        receitasData?.dadosReceita?.valorLeiteParaVenda?.[i] || 0;

      newTotalReceitas[i] =
        totalMatrizes +
        totalNovilhos +
        totalNovilhas +
        totalQueijo +
        totalLeite;

      if (i === 9) {
        newTotalReceitas[i + 1] = newTotalReceitas[i];
        newTotalReceitas[i + 2] = newTotalReceitas[i];
      }
    }
    setTotalReceitas(newTotalReceitas);

    // sempre atualizamos os custos independente
    const newCustos = newTotalReceitas.map((total, index) => {
      return total * custoPadraoBovinocultura;
    });
    setTotalCustos(newCustos);

    const newLucroOperacional = newCustos.map((custo, index) => {
      return newTotalReceitas[index] - custo;
    });
    setLucroOperacional(newLucroOperacional);
  }, []);

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  const onEdit = () => {
    setFormsDisabled(false);
  };

  const onSave = async () => {
    try {
      setLoading(true);

      const despesasData = {
        bovinocultura_custopadrao: custoPadraoBovinocultura,
        bovinocultura_custo_ano0: totalCustos[0],
        bovinocultura_custo_ano1: totalCustos[1],
        bovinocultura_custo_ano2: totalCustos[2],
        bovinocultura_custo_ano3: totalCustos[3],
        bovinocultura_custo_ano4: totalCustos[4],
        bovinocultura_custo_ano5: totalCustos[5],
        bovinocultura_custo_ano6: totalCustos[6],
        bovinocultura_custo_ano7: totalCustos[7],
        bovinocultura_custo_ano8: totalCustos[8],
        bovinocultura_custo_ano9: totalCustos[9],
        bovinocultura_custo_ano10: totalCustos[10],
        bovinocultura_custo_ano11: totalCustos[11],
        lucro_operacional_ano0: lucroOperacional[0],
        lucro_operacional_ano1: lucroOperacional[1],
        lucro_operacional_ano2: lucroOperacional[2],
        lucro_operacional_ano3: lucroOperacional[3],
        lucro_operacional_ano4: lucroOperacional[4],
        lucro_operacional_ano5: lucroOperacional[5],
        lucro_operacional_ano6: lucroOperacional[6],
        lucro_operacional_ano7: lucroOperacional[7],
        lucro_operacional_ano8: lucroOperacional[8],
        lucro_operacional_ano9: lucroOperacional[9],
        lucro_operacional_ano10: lucroOperacional[10],
        lucro_operacional_ano11: lucroOperacional[11],
      };

      await submitDespesas({ despesasData: despesasData });
      setFormsDisabled(true);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleCustoPadraoChange = (e) => {
    setCustoPadraoBovinocultura(parseFloat(e.target.value));
  };

  return (
    <div className="p-4 bg-gray-900/90">
      <Heading
        tabName={"Despesas"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="p-4 mt-8 flex flex-col gap-8 items-center justify-center">
        <div>
          <TotalReceitasTable anos={anos} totalReceitas={totalReceitas} />
        </div>
        <div className="w-full items-center justify-center">
          <CustoPadrao
            data={data}
            formsDisabled={formsDisabled}
            custoPadraoBovinocultura={custoPadraoBovinocultura}
            handleInputChange={handleCustoPadraoChange}
          />
        </div>
        <div className="w-full items-center justify-center">
          <TotalCustosTable anos={anos} totalCustos={totalCustos} />
        </div>
        <div className="w-full items-center justify-center">
          <LucroOperacionalTable
            anos={anos}
            totalLucroOperacional={lucroOperacional}
          />
        </div>
      </div>
    </div>
  );
}

function LucroOperacionalTable({ anos, totalLucroOperacional }) {
  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-500 p-1 text-sm font-semibold">
            ANO
          </TableHead>
          {anos.map((ano) => (
            <TableHead key={ano} className="border border-gray-500 p-1 text-sm">
              {ano}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border p-1 border-gray-500 text-sm font-semibold">
            TOTAL LUCROS
          </TableCell>
          {totalLucroOperacional.map((total, index) => (
            <TableCell
              key={index}
              className={`border p-1 text-right text-sm border-gray-500 ${
                total < 0
                  ? "border-red-500 text-red-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TotalCustosTable({ anos, totalCustos }) {
  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-500 p-1 text-sm font-semibold">
            ANO
          </TableHead>
          {anos.map((ano) => (
            <TableHead key={ano} className="border border-gray-500 p-1 text-sm">
              {ano}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border p-1 border-gray-500 text-sm font-semibold">
            TOTAL CUSTOS
          </TableCell>
          {totalCustos.map((total, index) => (
            <TableCell
              key={index}
              className={`border p-1 text-right text-sm border-gray-500 ${
                total < 0
                  ? "border-red-500 text-red-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

function TotalReceitasTable({ anos, totalReceitas }) {
  return (
    <Table className="w-full border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border border-gray-500 p-1 text-sm font-semibold">
            ANO
          </TableHead>
          {anos.map((ano) => (
            <TableHead key={ano} className="border border-gray-500 p-1 text-sm">
              {ano}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="border p-1 border-gray-500 text-sm font-semibold">
            TOTAL RECEITAS
          </TableCell>
          {totalReceitas.map((total, index) => (
            <TableCell
              key={index}
              className={`border p-1 text-right text-sm ${
                total < 0
                  ? "border-red-500 text-red-500"
                  : "border-green-500 text-green-500"
              }`}
            >
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </Table>
  );
}

function CustoPadrao({
  custoPadraoBovinocultura,
  handleInputChange,
  formsDisabled,
}) {
  return (
    <div className="overflow-hidden bg-gray-950/80  shadow sm:rounded-sm text-sm w-[50%]">
      <div className="bg-gray-800 p-4">
        <h3 className="text-md font-semibold leading-6 text-white">
          CUSTO PADRÃO COM REMUNERAÇÃO DA MÃO-DE-OBRA
        </h3>
      </div>
      <div className="p-4 text-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div className=" p-2">
            <p className="font-semibold text-gray-100">1- BOVINOCULTURA</p>
          </div>
          <div className="p-2">
            <Input
              type="number"
              step="0.1"
              disabled={formsDisabled}
              value={custoPadraoBovinocultura}
              className="text-center font-bold"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
