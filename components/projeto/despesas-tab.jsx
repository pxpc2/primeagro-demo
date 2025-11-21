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

  // Armazena em porcentagem para exibição (50 = 50%)
  const [custoPadraoBovinocultura, setCustoPadraoBovinocultura] = useState(
    data?.custoPadraoBovinocultura ? data.custoPadraoBovinocultura * 100 : 50
  );

  /**
   * @TODO
   */
  const [totalCustosBovinocultura, setTotalCustosBovinocultura] = useState(
    data?.totalCustos || Array(12).fill(0)
  );
  /**
   * @TODO
   */
  const [totalCustosSequeiro, setTotalCustosSequeiro] = useState(
    Array(12).fill(0)
  );
  /**
   * @TODO
   */
  const [totalCustosIrrigada, setTotalCustosIrrigada] = useState(
    Array(12).fill(0)
  );
  /**
   * @TODO
   */
  const [totalCustosOutras, setTotalCustosOutras] = useState(Array(12).fill(0));
  /**
   * @TODO
   */
  const [lucroOperacional, setLucroOperacional] = useState(
    data?.lucroOperacional || Array(12).fill(0)
  );
  /**
   * @TODO
   */
  const [totalCustos, setTotalCustos] = useState(
    data?.totalCustos || Array(12).fill(0)
  );

  console.log(receitasData);
  console.log(data);

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

      /**
       * @TODO vem de objeto separado por ano em receitas
       */
      const totalSequeiro = 0;
      const totalIrrigada = 0;
      const totalOutras = 0;

      newTotalReceitas[i] =
        totalMatrizes +
        totalNovilhos +
        totalNovilhas +
        totalQueijo +
        totalLeite +
        totalSequeiro +
        totalIrrigada +
        totalOutras;

      if (i === 9) {
        newTotalReceitas[i + 1] = newTotalReceitas[i];
        newTotalReceitas[i + 2] = newTotalReceitas[i];
      }
    }
    setTotalReceitas(newTotalReceitas);
  }, [receitasData]);

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
        bovinocultura_custopadrao: custoPadraoBovinocultura / 100, // Salva como decimal
        bovinocultura_custo_ano0: totalCustosBovinocultura[0],
        bovinocultura_custo_ano1: totalCustosBovinocultura[1],
        bovinocultura_custo_ano2: totalCustosBovinocultura[2],
        bovinocultura_custo_ano3: totalCustosBovinocultura[3],
        bovinocultura_custo_ano4: totalCustosBovinocultura[4],
        bovinocultura_custo_ano5: totalCustosBovinocultura[5],
        bovinocultura_custo_ano6: totalCustosBovinocultura[6],
        bovinocultura_custo_ano7: totalCustosBovinocultura[7],
        bovinocultura_custo_ano8: totalCustosBovinocultura[8],
        bovinocultura_custo_ano9: totalCustosBovinocultura[9],
        bovinocultura_custo_ano10: totalCustosBovinocultura[10],
        bovinocultura_custo_ano11: totalCustosBovinocultura[11],
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

  const handleCustoPadraoBovinoculturaChange = (e) => {
    const percentValue = parseFloat(e.target.value) || 0;
    setCustoPadraoBovinocultura(percentValue);

    // Converte porcentagem para decimal (ex: 35 -> 0.35)
    const decimalValue = percentValue / 100;

    // Recalcula custos de bovinocultura baseado no valor decimal
    const newCustos = totalReceitas.map(receita => receita * decimalValue);
    setTotalCustosBovinocultura(newCustos);

    // Recalcula lucro operacional
    const newLucro = newCustos.map((custo, index) => totalReceitas[index] - custo);
    setLucroOperacional(newLucro);
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
          <h2 className="text-center p-2 bg-gray-950 border-x border-t border-gray-500">
            RECEITAS ANUAIS (A)
          </h2>
          <TotalReceitasTable anos={anos} totalReceitas={totalReceitas} />
        </div>
        <div className="w-full items-center justify-center">
          <CustoPadrao
            data={data}
            formsDisabled={formsDisabled}
            custoPadraoBovinocultura={custoPadraoBovinocultura}
            handleInputChange={handleCustoPadraoBovinoculturaChange}
          />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-center p-2 bg-gray-950 border-x border-t border-gray-500">
            BOVINOCULTURA (B1)
          </h2>
          <TotalCustosTable
            anos={anos}
            totalCustos={totalCustosBovinocultura}
          />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-center p-2 bg-gray-950 border-x border-t border-gray-500">
            AGRICULTURA SEQUEIRO (B2)
          </h2>
          <TotalCustosTable anos={anos} totalCustos={totalCustosSequeiro} />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-center p-2 bg-gray-950 border-x border-t border-gray-500">
            AGRICULTURA IRRIGADA (B3)
          </h2>
          <TotalCustosTable anos={anos} totalCustos={totalCustosIrrigada} />
        </div>
        <div className="w-full items-center justify-center">
          <h2 className="text-center p-2 bg-gray-950 border-x border-t border-gray-500">
            OUTRAS ATIVIDADES (B4)
          </h2>
          <TotalCustosTable anos={anos} totalCustos={totalCustosOutras} />
        </div>

        <div className="w-full items-center justify-center">
          <h2 className="text-center p-2 text-gray-950 font-bold bg-gray-300 border-x border-t border-gray-500">
            LUCRO OPERACIONAL (A - B1 - B2 - B3 - B4)
          </h2>
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
                  : total > 0
                  ? "border-green-500 text-green-500"
                  : "border-gray-400 text-gray-400"
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
          <div className="p-2 relative">
            <Input
              type="number"
              step="1"
              min="0"
              max="100"
              disabled={formsDisabled}
              value={custoPadraoBovinocultura}
              className="text-center font-bold pr-8"
              onChange={handleInputChange}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
