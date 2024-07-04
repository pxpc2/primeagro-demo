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
import { CirclePlusIcon, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { submitBenfeitoriaImovel } from "@/app/projeto/actions";

export default function InventarioTab({ data }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: data,
  });
  const [tableData, setTableData] = useState(data.benfeitoriasImovel || []);
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);

    form.handleSubmit(async (data) => {
      console.log(data);
      await submitBenfeitoriaImovel({ tableData: tableData });
      //await submitDadosImovelForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  const handleAddNewItem = (newItem) => {
    setTableData([...tableData, newItem]);
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
            data={tableData}
            onAddNewItem={handleAddNewItem}
          />
        </div>
      </div>
    </div>
  );
}

function EquipamentosExistentesImovelTable({
  formsDisabled,
  data,
  onAddNewItem,
}) {
  const form = useForm();
  const handleDialogSubmit = form.handleSubmit((newData) => {
    console.log(newData);
    const newItem = {
      SEQ: data.length + 1,
      descricao: newData.descricao,
      declarado_pelo_proprietario:
        newData.declarado_pelo_proprietario === "sim",
      unidade_medida: newData.unidade,
      quantidade: newData.qtd,
      valor: newData.valor,
      estado_conservacao: newData.estadoConservacao,
    };
    console.log(newItem);
    onAddNewItem(newItem);
    form.reset();
  });
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
      <TableFooter className="justify-center border-t flex ">
        <div className="mt-4">
          {formsDisabled ? (
            <></>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="" className="gap-1">
                  <CirclePlusIcon className="h-3.5 w-3.5" />
                  Inserir novo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Nova benfeitoria/equipamento</DialogTitle>
                  <DialogDescription>
                    Insira os dados relativos ao equipamento existente
                    coletivo/benfeitoria do imóvel.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleDialogSubmit}
                  className="flex flex-col gap-4 py-4"
                >
                  <div className="items-center gap-4">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Escreva a descrição do equipamento"
                      {...form.register("descricao")}
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <Label htmlFor="declaradoPeloUsuario">
                      Declarado pelo proprietário?
                    </Label>
                    <RadioGroup
                      defaultValue="sim"
                      className="flex flex-row"
                      {...form.register("declarado_pelo_proprietario")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="sim"
                          id="sim"
                          {...form.register("declarado_pelo_proprietario")}
                        />
                        <Label htmlFor="sim">Sim</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="nao"
                          id="nao"
                          {...form.register("declarado_pelo_proprietario")}
                        />
                        <Label htmlFor="nao">Não</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="items-center gap-4">
                    <Label htmlFor="unidade">Unidade</Label>
                    <Input
                      id="unidade"
                      placeholder="ex: m2"
                      {...form.register("unidade")}
                    />
                  </div>
                  <div className="items-center gap-4">
                    <Label htmlFor="qtd">Quantidade</Label>
                    <Input id="qtd" {...form.register("qtd")} />
                  </div>
                  <div className="items-center gap-4">
                    <Label htmlFor="valor">Valor</Label>
                    <Input id="valor" {...form.register("valor")} />
                  </div>
                  <div className="items-center gap-4">
                    <Label htmlFor="estadoConservacao">
                      Estado de conservação
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        form.setValue("estadoConservacao", value)
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            value="bom"
                            {...form.register("estadoConservacao")}
                          >
                            Bom
                          </SelectItem>
                          <SelectItem
                            value="ruim"
                            {...form.register("estadoConservacao")}
                          >
                            Ruim
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </TableFooter>
    </Table>
  );
}
