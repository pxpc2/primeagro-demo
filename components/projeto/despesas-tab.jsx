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

export default function DespesasTab({ data, isAdmin, receitasData }) {
  const [loading, setLoading] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);

  const [totalReceitas, setTotalReceitas] = useState(Array(12).fill(0));
  const anos = Array.from({ length: 12 }, (_, index) => ANO_INICIAL + index);

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
  }, []);

  const handleCancel = () => {
    setFormsDisabled(true);
  };

  const onEdit = () => {
    setFormsDisabled(false);
  };

  const onSave = () => {
    try {
      setLoading(true);
      setLoading(false);
    } catch (e) {}
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
      <div className="mt-8 mx-3">
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="border border-gray-500 p-1 text-sm font-semibold">
                ANO
              </TableHead>
              {anos.map((ano) => (
                <TableHead
                  key={ano}
                  className="border border-gray-500 p-1 text-sm"
                >
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
      </div>
    </div>
  );
}
