"use client";

import { useState } from "react";
import Heading from "./Header";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function InventarioTab({ defaultValues }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: defaultValues,
  });
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      console.log(data);
      //await submitDadosImovelForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
        <div className=" bg-blue-600 flex text-center items-center w-full justify-center py-2">
          <h1 className="text-white font-semibold">Dados do Imóvel</h1>
        </div>
        <div className="p-4  flex flex-col gap-8">
          <p className="text-indigo-800 font-semibold">
            Benfeitorias / equipamentos existentes coletivos:
          </p>
          <EquipamentosExistentesImovelTable
            form={form}
            formsDisabled={formsDisabled}
          />
        </div>
      </div>
    </div>
  );
}

function EquipamentosExistentesImovelTable({ form, formsDisabled }) {
  const ex = [
    {
      SEQ: "INV001",
      descricao: "casa",
      declarado: "sim",
      unidade: "m2",
      quantidade: 3,
      valor: "10,000.00",
      estadoConservacao: "bom",
    },
    {
      SEQ: "INV002",
      paymentStatus: "",
      declarado: "sim",
      unidade: "m2",
      quantidade: 156,
      valor: "10,000.00",
      estadoConservacao: "bom",
    },
    {
      SEQ: "INV003",
      descricao: "",
      declarado: "sim",
      unidade: "m2",
      quantidade: 1,
      valor: "10,000.00",
      estadoConservacao: "bom",
    },
    {
      SEQ: "INV004",
      descricao: "",
      declarado: "sim",
      unidade: "m2",
      quantidade: 12,
      valor: "10,000.00",
      estadoConservacao: "bom",
    },
  ];
  return (
    <Table>
      <TableCaption>
        Lista de benfeitorias/equipamentos relacionados ao imóvel
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SEQ</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">
            Declarado pelo proprietário?
          </TableHead>
          <TableHead className="text-center">Unidade</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          <TableHead className="text-right">Valor (R$)</TableHead>
          <TableHead className="text-center">Estado de conservação</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ex.map((item) => (
          <TableRow key={item.SEQ}>
            <TableCell className="font-medium">{item.SEQ}</TableCell>
            <TableCell className="text-center">{item.descricao}</TableCell>
            <TableCell className="text-center">{item.declarado}</TableCell>
            <TableCell className="text-center">{item.unidade}</TableCell>
            <TableCell className="text-center">{item.quantidade}</TableCell>
            <TableCell className="text-right">{item.valor}</TableCell>
            <TableCell className="text-center">
              {item.estadoConservacao}
            </TableCell>
            <TableCell>
              <MoreHorizontal className="hover:cursor-pointer" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <div className="pt-4">
          <Button variant="outline">
            <PlusCircledIcon />
          </Button>
        </div>
      </TableFooter>
    </Table>
  );
}
