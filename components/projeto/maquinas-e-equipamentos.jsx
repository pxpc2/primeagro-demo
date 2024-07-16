import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal, Pencil, PlusIcon, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";

export default function MaquinasEquipamentosTable({
  data,
  setTableData,
  formsDisabled,
  onAddNewItem,
  onEditItem,
  onDeleteItem,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const form = useForm();

  const handleDialogSubmit = form.handleSubmit((newData) => {
    const newItem = {
      ...editingItem,
      descricao: newData.descricao,
      unidade_medida: newData.unidade,
      quantidade: newData.qtd,
    };
    if (editingItem) {
      const updatedData = data.map((item) =>
        item.id === editingItem.id ? newItem : item
      );
      setTableData(updatedData);
    } else {
      onAddNewItem(newItem);
    }
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(false);
  });

  useEffect(() => {
    if (editingItem) {
      form.setValue("descricao", editingItem.descricao);
      form.setValue("unidade", editingItem.unidade_medida);
      form.setValue("qtd", editingItem.quantidade);
    } else {
      form.reset();
    }
  }, [editingItem, form]);

  return (
    <Table className="border-collapse">
      <TableCaption>Máquinas e equipamentos existentes</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Descrição</TableHead>
          <TableHead className="text-center">Unidade de Medida</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          {!formsDisabled && (
            <TableHead className="text-center">Ações</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="text-center">{item.descricao}</TableCell>
            <TableCell className="text-center">{item.unidade_medida}</TableCell>
            <TableCell className="text-center">{item.quantidade}</TableCell>
            {!formsDisabled && (
              <TableCell className="text-center">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger>
                    <MoreHorizontal className="hover:cursor-pointer hover:bg-gray-200 hover:shadow-md rounded-md p-0.5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setEditingItem(item);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => onDeleteItem(item)}
                    >
                      <Trash className="mr-2 h-4 w-4 text-red-500" />
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="justify-center border-t flex">
        <div className="mt-4">
          {!formsDisabled && (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="" className="gap-1">
                  Inserir novo
                  <PlusIcon className="h-3.5 w-3.5 mt-0.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? "Editar" : "Adicionar"}
                  </DialogTitle>
                  <DialogDescription>
                    Insira os dados para o novo item.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleDialogSubmit}
                  className="flex flex-col gap-4 py-4"
                >
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="descricao" className="text-right">
                      Descrição
                    </Label>
                    <Input
                      id="descricao"
                      className="col-span-3"
                      {...form.register("descricao")}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="unidade" className="text-right">
                      Unidade de Medida
                    </Label>
                    <Input
                      id="unidade"
                      className="col-span-3"
                      {...form.register("unidade")}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="qtd" className="text-right">
                      Quantidade
                    </Label>
                    <Input
                      id="qtd"
                      type="number"
                      className="col-span-3"
                      {...form.register("qtd")}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit">
                      {editingItem ? "Salvar mudanças" : "Adicionar"}
                    </Button>
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
