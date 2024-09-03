"use client";

import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useState } from "react";
import ReusableTable from "../reusable-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { submitCronogramaData } from "@/app/projeto/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ANO_INICIAL } from "@/utils/constants";

export default function CronogramaTab({ data, isAdmin }) {
  const anoInicial = useState(data?.anoInicial || ANO_INICIAL); // ano de inicio do financiamento (vem da Aba SimuladorPNCF)
  const [cronogramaData, setCronogramaData] = useState(data[0] || []);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [investimentosData, setInvestimentosData] = useState(data[1] || []);
  const colunas = [
    { key: "seq", label: "SEQ" },
    { key: "descricao", label: "Descrição básica" },
    { key: "ano1", label: "Ano " + parseInt(anoInicial).toString() },
    { key: "ano3", label: "Ano " + (parseInt(anoInicial) + 2).toString() },
    { key: "ano2", label: "Ano " + (parseInt(anoInicial) + 1).toString() },
    { key: "ano4", label: "Ano " + (parseInt(anoInicial) + 3).toString() },
    { key: "ano5", label: "Ano " + (parseInt(anoInicial) + 4).toString() },
  ];
  const [combinedData, setCombinedData] = useState(
    investimentosData.map((item) => {
      const cronogramaItem =
        cronogramaData.find((c) => c.seq === item.seq) || {};
      return {
        ...item,
        descricao: `${item.categoria} ${item.item} - ${item.descricao}`,
        investimento_id: item.id,
        ano1: cronogramaItem.ano1 || "",
        ano2: cronogramaItem.ano2 || "",
        ano3: cronogramaItem.ano3 || "",
        ano4: cronogramaItem.ano4 || "",
        ano5: cronogramaItem.ano5 || "",
      };
    })
  );
  const form = useForm();
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const onEdit = () => {
    setFormsDisabled(false);
  };
  const onSave = async () => {
    setLoading(true);
    const updatedCronogramaData = combinedData.map((item) => ({
      id: item.id,
      seq: item.seq,
      investimento_id: item.investimento_id,
      ano1: item.ano1,
      ano2: item.ano2,
      ano3: item.ano3,
      ano4: item.ano4,
      ano5: item.ano5,
      descricao: item.descricao,
    }));
    await submitCronogramaData({ cronogramaData: updatedCronogramaData });
    setCronogramaData(updatedCronogramaData);
    console.log(updatedCronogramaData);
    setLoading(false);
    setFormsDisabled(true);
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };
  const handleDeleteItem = async (item) => {
    /*const updatedData = await deleteInvestimento({
      data: investimentosData,
      itemToDelete: item,
    });
    if (updatedData) {
      updatedData.forEach((item, index) => {
        item.seq = index + 1;
      });
      setInvestimentosData(updatedData);
    }*/
    setIsDialogOpen(true);
  };

  const handleInputChange = (index, field, value) => {
    setCombinedData((prevData) => {
      const newData = [...prevData];
      newData[index][field] = value;
      return newData;
    });
  };
  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Cronograma"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
        isAdmin={isAdmin}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 flex flex-col gap-8">
        <div className="h-screen">
          <Table className="border-collapse text-xs">
            <TableCaption className="text-xs">
              Cronograma de Investimentos
            </TableCaption>
            <TableHeader>
              <TableRow>
                {colunas.map((coluna) => (
                  <TableHead className="text-center" key={coluna.key}>
                    {coluna.label}
                  </TableHead>
                ))}
                {!formsDisabled && <TableHead>Ações</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {combinedData.map((item, index) => (
                <TableRow key={item.seq}>
                  <TableCell className="text-center">{item.seq}</TableCell>
                  <TableCell className="text-center">
                    {item.descricao}
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={item.ano1}
                      disabled={formsDisabled}
                      onChange={(e) =>
                        handleInputChange(index, "ano1", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={item.ano2}
                      disabled={formsDisabled}
                      onChange={(e) =>
                        handleInputChange(index, "ano2", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={item.ano3}
                      disabled={formsDisabled}
                      onChange={(e) =>
                        handleInputChange(index, "ano3", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={item.ano4}
                      disabled={formsDisabled}
                      onChange={(e) =>
                        handleInputChange(index, "ano4", e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="text"
                      value={item.ano5}
                      disabled={formsDisabled}
                      onChange={(e) =>
                        handleInputChange(index, "ano5", e.target.value)
                      }
                    />
                  </TableCell>
                  {!formsDisabled && (
                    <TableCell className="text-center">
                      <Button
                        onClick={() => handleDeleteItem(item)}
                        variant="ghost"
                        className="hover:bg-red-600 hover:text-gray-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4 font-bold text-red-800">
              Você não pode excluir este item.
            </DialogTitle>
            <DialogDescription className="text-gray-700">
              Este item pertence a sua lista de INVESTIMENTOS. Para excluir,
              favor deletar o investimento correspondente e a mudança refletirá
              aqui.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setIsDialogOpen(false)}
              className=" hover:bg-green-700 hover:text-gray-100"
              variant="outline"
            >
              Entendido!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
