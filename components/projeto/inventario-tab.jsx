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

export default function InventarioTab({ data }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: data,
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
            data={data.benfeitoriasImovel}
          />
        </div>
      </div>
    </div>
  );
}

function EquipamentosExistentesImovelTable({ form, formsDisabled, data }) {
  console.log(data);
  return (
    <Table className="border-collapse">
      <TableCaption>
        Lista de benfeitorias/equipamentos relacionados ao imóvel
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">SEQ</TableHead>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">
            Declarado pelo proprietário?
          </TableHead>
          <TableHead className="text-center">Unidade</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          <TableHead className="text-center">Valor (R$)</TableHead>
          <TableHead className="text-center">Estado de conservação</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 &&
          data.map((item) => (
            <TableRow key={item.SEQ}>
              <TableCell className="font-medium text-center">
                {item.SEQ}
              </TableCell>
              <TableCell className="text-center max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                {item.descricao}
              </TableCell>
              <TableCell className="text-center">
                {item.declarado_pelo_proprietario ? "Sim" : "Não"}
              </TableCell>
              <TableCell className="text-center">
                {item.unidade_medida}
              </TableCell>
              <TableCell className="text-center">{item.quantidade}</TableCell>
              <TableCell className="text-center">{item.valor}</TableCell>
              <TableCell className="text-center">
                {item.estado_conservacao}
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
