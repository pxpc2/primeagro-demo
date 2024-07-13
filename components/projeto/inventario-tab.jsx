"use client";

import { useCallback, useEffect, useState } from "react";
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
import { CirclePlusIcon, MoreHorizontal, Pencil, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectContent } from "@radix-ui/react-select";
import { submitInventario } from "@/app/projeto/actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

export default function InventarioTab({ data }) {
  const [editingItem, setEditingItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      benfeitorias_coletivas_numero_familias_irao_adquirir:
        data.aba_inventario[0]
          ?.benfeitorias_coletivas_numero_familias_irao_adquirir || "",
      benfeitorias_coletivas_valor_por_familia:
        data.aba_inventario[0]?.benfeitorias_coletivas_valor_por_familia || "",
    },
  });
  const [tableData, setTableData] = useState(data.benfeitoriasImovel || []);
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);

    form.handleSubmit(async (data) => {
      await submitInventario({
        data: data,
        tableData: tableData,
      });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    form.reset({
      benfeitorias_coletivas_numero_familias_irao_adquirir:
        data.aba_inventario[0]
          ?.benfeitorias_coletivas_numero_familias_irao_adquirir || "",
      benfeitorias_coletivas_valor_por_familia:
        data.aba_inventario[0]?.benfeitorias_coletivas_valor_por_familia || "",
    });
    setFormsDisabled(true);
  };

  const handleAddNewItem = (newItem) => {
    setTableData((prevData) => [...prevData, newItem]);
  };
  const getValorTotal = useCallback(() => {
    return tableData.reduce((total, item) => {
      const valor = parseFloat(item.valor.replace(/\./g, "").replace(",", "."));
      return total + (isNaN(valor) ? 0 : valor);
    }, 0);
  }, [tableData]);

  const [valorTotal, setValorTotal] = useState(getValorTotal);
  const getValorPorFamilia = useCallback((total, numFamilies) => {
    if (numFamilies > 0) {
      return (total / numFamilies).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return "0,00";
  }, []);

  useEffect(() => {
    setValorTotal(getValorTotal());
  }, [tableData, getValorTotal]);

  useEffect(() => {
    const qtdFamilias = parseInt(
      form.getValues("benfeitorias_coletivas_numero_familias_irao_adquirir"),
      10
    );
    if (!isNaN(qtdFamilias) && qtdFamilias > 0) {
      const valorPorFamilia = getValorPorFamilia(valorTotal, qtdFamilias);
      form.setValue(
        "benfeitorias_coletivas_valor_por_familia",
        valorPorFamilia
      );
    }
  }, [valorTotal, form, getValorPorFamilia]);

  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
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
            onEditItem={handleEditItem}
            setEditingItem={setEditingItem}
            editingItem={editingItem}
            setIsDialogOpen={setIsDialogOpen}
            isDialogOpen={isDialogOpen}
            setTableData={setTableData}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex w-full flex-row justify-end gap-10">
              <FormField
                control={form.control}
                name="benfeitorias_coletivas_numero_familias_irao_adquirir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nº de famílias que irão adquirir as benfeitorias
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        disabled={formsDisabled}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          const qtdFamilias = parseInt(value, 10);
                          if (!isNaN(qtdFamilias) && qtdFamilias > 0) {
                            const valorPorFamilia = getValorPorFamilia(
                              valorTotal,
                              qtdFamilias
                            );
                            form.setValue(
                              "benfeitorias_coletivas_valor_por_familia",
                              valorPorFamilia
                            );
                          } else {
                            form.setValue(
                              "benfeitorias_coletivas_valor_por_familia",
                              ""
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="benfeitorias_coletivas_valor_por_familia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor das benfeitorias por família</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value} disabled />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

function EquipamentosExistentesImovelTable({
  formsDisabled,
  data,
  onAddNewItem,
  editingItem,
  setEditingItem,
  setTableData,
  onEditItem,
  setIsDialogOpen,
  isDialogOpen,
}) {
  const form = useForm();
  const handleDialogSubmit = form.handleSubmit((newData) => {
    const newItem = {
      ...editingItem,
      SEQ: editingItem ? editingItem.SEQ : data.length + 1,
      descricao: newData.descricao,
      declarado_pelo_proprietario:
        newData.declarado_pelo_proprietario === "sim" ? true : false,
      unidade_medida: newData.unidade,
      quantidade: newData.qtd,
      valor: newData.valor,
      estado_conservacao: newData.estado_conservacao,
    };
    if (editingItem) {
      const updatedData = data.map((item) =>
        item.SEQ === editingItem.SEQ ? newItem : item
      );
      setTableData(updatedData);
    } else {
      onAddNewItem(newItem);
    }
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(false);
  });
  const formatBRL = (value) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleValorChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatBRL(inputValue);
    form.setValue("valor", formattedValue);
  };
  const handleQuantidadeChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    form.setValue("qtd", inputValue);
  };
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
          <TableHead className="text-center">Valor total (R$)</TableHead>
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
              {!formsDisabled ? (
                <TableCell>
                  <Dialog>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger>
                        <MoreHorizontal className="hover:cursor-pointer hover:bg-gray-200 hover:shadow-md rounded-md p-0.5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            className="hover:cursor-pointer"
                            onClick={() => onEditItem(item)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem className="hover:cursor-pointer">
                          <Trash className="mr-2 h-4 w-4 text-red-500" />
                          Deletar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <AddBenfeitoriaColetivaDialog
                      form={form}
                      handleDialogSubmit={handleDialogSubmit}
                      handleQuantidadeChange={handleQuantidadeChange}
                      handleValorChange={handleValorChange}
                      editingItem={editingItem}
                    />
                  </Dialog>
                </TableCell>
              ) : (
                <></>
              )}
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
              <AddBenfeitoriaColetivaDialog
                form={form}
                handleDialogSubmit={handleDialogSubmit}
                handleQuantidadeChange={handleQuantidadeChange}
                handleValorChange={handleValorChange}
              />
            </Dialog>
          )}
        </div>
      </TableFooter>
    </Table>
  );
}

function AddBenfeitoriaColetivaDialog({
  form,
  handleDialogSubmit,
  handleQuantidadeChange,
  handleValorChange,
  editingItem,
}) {
  useEffect(() => {
    if (editingItem) {
      form.setValue("descricao", editingItem.descricao);
      form.setValue(
        "declarado_pelo_proprietario",
        editingItem.declarado_pelo_proprietario ? "sim" : "nao"
      );
      form.setValue("unidade", editingItem.unidade_medida);
      form.setValue("qtd", editingItem.quantidade);
      form.setValue("valor", editingItem.valor);
      form.setValue("estado_conservacao", editingItem.estado_conservacao);
    } else {
      form.reset();
    }
  }, [editingItem, form]);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="font-bold">
          {editingItem
            ? "Editar benfeitoria/equipamento"
            : "Nova benfeitoria/equipamento"}
        </DialogTitle>
        <DialogDescription className="pt-2">
          Insira os dados relativos ao equipamento existente
          coletivo/benfeitoria do imóvel.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4 py-4">
        <div className="items-center gap-4">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            placeholder="Escreva a descrição do equipamento"
            {...form.register("descricao")}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Label htmlFor="declarado_pelo_proprietario">
            Declarado pelo proprietário?
          </Label>
          <RadioGroup
            className="flex flex-row"
            value={form.watch("declarado_pelo_proprietario")}
            onValueChange={(value) =>
              form.setValue("declarado_pelo_proprietario", value)
            }
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
          <Input
            id="qtd"
            type="number"
            {...form.register("qtd")}
            onChange={handleQuantidadeChange}
            value={form.watch("qtd")}
            placeholder="1"
          />
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="valor">Valo total (R$)</Label>
          <Input
            id="valor"
            {...form.register("valor")}
            onChange={handleValorChange}
            value={form.watch("valor")}
            placeholder="0,00"
          />
        </div>
        <div className="items-center gap-4">
          <Label htmlFor="estado_conservacao">Estado de conservação</Label>
          <Select
            value={form.watch("estado_conservacao")}
            onValueChange={(value) =>
              form.setValue("estado_conservacao", value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  value="bom"
                  {...form.register("estado_conservacao")}
                >
                  Bom
                </SelectItem>
                <SelectItem
                  value="ruim"
                  {...form.register("estado_conservacao")}
                >
                  Ruim
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button type="submit">
            {editingItem ? "Salvar mudanças" : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
