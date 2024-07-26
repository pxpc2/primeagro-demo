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
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Pencil, PlusIcon, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";

function ReusableDialog({
  form,
  handleDialogSubmit,
  columns,
  editingItem,
  setEditingItem,
  hasSEQ,
  hasBRLFormatting,
  brlFieldIdentifier,
}) {
  const formatBRL = (value) => {
    if (!value) return value;
    value = value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2).replace(".", ",");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleChange = (e, fieldKey) => {
    console.log("has formatting? " + hasBRLFormatting);
    console.log("brl field identifier: " + brlFieldIdentifier);
    if (hasBRLFormatting && fieldKey.includes(brlFieldIdentifier)) {
      const inputValue = e.target.value;
      const formattedValue = formatBRL(inputValue);
      form.setValue(fieldKey, formattedValue);
    } else {
      form.setValue(fieldKey, e.target.value);
    }
  };
  useEffect(() => {
    if (editingItem) {
      columns.forEach((column) => {
        form.setValue(column.key, editingItem[column.key]);
      });
    } else {
      form.reset();
    }
  }, [editingItem, form, columns]);

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {editingItem ? "Editar Item" : "Adicionar Item"}
        </DialogTitle>
        <DialogDescription>
          {editingItem
            ? "Edite os dados do item"
            : "Insira os dados do novo item"}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleDialogSubmit} className="flex flex-col gap-4 py-4">
        {columns.map((column) => (
          <div key={column.key} className="grid grid-cols-4 items-center gap-4">
            {(!hasSEQ || column.key !== "seq") && (
              <>
                <Label htmlFor={column.key} className="text-right">
                  {column.label}
                </Label>
                <Input
                  type={column.key === "quantidade" ? "number" : ""}
                  id={column.key}
                  className="col-span-3"
                  {...form.register(column.key)}
                  onChange={(e) => handleChange(e, column.key)}
                />
              </>
            )}
          </div>
        ))}
        <DialogFooter>
          <Button type="submit">
            {editingItem ? "Salvar mudanças" : "Adicionar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default function ReusableTable({
  data,
  columns,
  onAddNewItem,
  onEditItem,
  onDeleteItem,
  formsDisabled,
  caption,
  hasSEQ,
  hasBRLFormatting,
  brlFieldIdentifier,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const form = useForm();

  const handleDialogSubmit = form.handleSubmit((newData) => {
    if (editingItem) {
      onEditItem({ ...editingItem, ...newData });
    } else {
      onAddNewItem(newData);
    }
    setEditingItem(null);
    form.reset();
    setIsDialogOpen(false);
  });

  const handleEditItem = (item) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (item) => {
    onDeleteItem(item);
  };

  const handleAddNewItemClick = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  return (
    <Table className="border-collapse">
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className="text-center">
              {column.label}
            </TableHead>
          ))}
          {!formsDisabled && (
            <TableHead className="text-center">Ações</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.key} className="text-center">
                {item[column.key]}
              </TableCell>
            ))}
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
                      onClick={() => handleEditItem(item)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:cursor-pointer"
                      onClick={() => handleDeleteItem(item)}
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
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <ReusableDialog
            form={form}
            handleDialogSubmit={handleDialogSubmit}
            columns={columns}
            editingItem={editingItem}
            setEditingItem={setEditingItem}
            hasSEQ={hasSEQ}
            brlFieldIdentifier={brlFieldIdentifier}
            hasBRLFormatting={hasBRLFormatting}
          />
        </Dialog>
      </TableBody>
      <TableFooter className="justify-center border-t flex">
        <div className="mt-4">
          {!formsDisabled && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant=""
                  className="gap-1"
                  onClick={handleAddNewItemClick}
                >
                  Inserir novo
                  <PlusIcon className="h-3.5 w-3.5 mt-0.5" />
                </Button>
              </DialogTrigger>
              <ReusableDialog
                form={form}
                handleDialogSubmit={handleDialogSubmit}
                columns={columns}
                editingItem={null}
                hasSEQ={hasSEQ}
                brlFieldIdentifier={brlFieldIdentifier}
                hasBRLFormatting={hasBRLFormatting}
              />
            </Dialog>
          )}
        </div>
      </TableFooter>
    </Table>
  );
}
