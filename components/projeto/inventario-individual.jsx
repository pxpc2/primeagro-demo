import { CirclePlusIcon, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  deleteInventarioIndividual,
  deleteInventarioItem,
} from "@/app/projeto/actions";
import { useState } from "react";

export default function InventarioIndividual({
  formDisabled,
  setIsDialogOpen,
  setTempInventariosIndividuais,
  tempInventariosIndividuais,
  itens,
  setItens,
  onAddInventarioItem,
}) {
  const form = useForm();
  const handleInventarioDialogSubmit = form.handleSubmit((data) => {
    const newItem = { ...data };
    setTempInventariosIndividuais((prev) => [...prev, newItem]);
    setIsDialogOpen(false);
    form.reset();
  });
  const handleDeleteInventarioItem = async (itemID) => {
    await deleteInventarioItem({ itemID: itemID });
    setItens((prev) => prev.filter((item) => item.id !== itemID));
  };
  const handleDeleteInventario = async (inventarioID) => {
    await deleteInventarioIndividual({ inventarioID: inventarioID });
    setTempInventariosIndividuais((prev) =>
      prev.filter((item) => item.id !== inventarioID)
    );
    setItens((prev) =>
      prev.filter((item) => item.inventarioIndividual_id !== inventarioID)
    );
  };
  return (
    <div className="flex flex-col w-full">
      <div className="w-full px-2 grid grid-cols-2 sm:grid-cols-3 sm:gap-8">
        {tempInventariosIndividuais?.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteInventarioItem={handleDeleteInventarioItem}
            formsDisabled={formDisabled}
            onDeleteInventario={handleDeleteInventario}
            data={itens}
            onAdd={onAddInventarioItem}
          />
        ))}
      </div>
      <div className="flex w-full items-center justify-center pt-2 sm:pt-12">
        <Dialog>
          <DialogTrigger asChild>
            {!formDisabled ? (
              <Button
                size="sm"
                variant=""
                className="gap-1 sm:max-w-[320px] items-center justify-center"
              >
                Inserir novo inventário
                <PlusIcon className="h-3.5 w-3.5 mt-0.5" />
              </Button>
            ) : (
              <></>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar novo</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handleInventarioDialogSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tipo" className="text-right">
                    Tipo
                  </Label>
                  <Input
                    id="tipo"
                    className="col-span-3"
                    {...form.register("tipo")}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Adicionar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function primeiraMaiuscula(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Item({
  item,
  onDeleteInventarioItem,
  formsDisabled,
  onDeleteInventario,
  data,
  onAdd,
}) {
  const form = useForm();

  const filteredData = data.filter(
    (row) => row.inventarioIndividual_id === item.id
  );

  const [isAddItemDialogOpen, setAddItemDialogOpen] = useState(false);
  const [showSaveInventarioPopup, setShowSaveInventarioPopup] = useState(false);

  const handleAddItemButtonClick = () => {
    if (!item.id) {
      setShowSaveInventarioPopup(true);
    } else {
      setAddItemDialogOpen(true);
    }
  };

  const handleAddItemDialogSubmit = form.handleSubmit((data) => {
    const newItem = { ...data, inventarioIndividual_id: item.id };
    onAdd(newItem);
    if (isAddItemDialogOpen) setAddItemDialogOpen(!isAddItemDialogOpen);
    form.reset();
  });
  return (
    <div className="border border-gray-300 shadow-sm border-dotted rounded">
      <div className="flex flex-row justify-center gap-2 border-b">
        <h2 className="font-semibold text-center py-2 px-4">
          {primeiraMaiuscula(item.tipo)}
        </h2>
        {!formsDisabled && (
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDeleteInventario(item.id)}
            className="my-1 hover:bg-red-600 text-red-600 hover:text-white"
          >
            Deletar inventário
            <Trash className="h-4 ml-1" />
          </Button>
        )}
      </div>

      <Table className="border-collapse overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Descrição</TableHead>
            <TableHead className="text-center">Cabeças</TableHead>
            {!formsDisabled && (
              <TableHead className="text-center">Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData?.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">{row.descricao}</TableCell>
              <TableCell className="text-center">{row.cabecas}</TableCell>
              {!formsDisabled && (
                <TableCell className="text-center">
                  <Button
                    size="xs"
                    className="py-1 px-0.5 text-black hover:bg-red-600 hover:text-white"
                    variant="ghost"
                    onClick={() => onDeleteInventarioItem(row.id)}
                  >
                    <Trash className="h-3" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <div className="w-full flex flex-row justify-center">
            {!formsDisabled && (
              <>
                <Button
                  size="xs"
                  className="bg-green-700 hover:bg-green-600 py-1 px-0.5 my-2 text-xs text-white rounded-lg"
                  onClick={handleAddItemButtonClick}
                >
                  <PlusIcon className="h-3" />
                </Button>
                {showSaveInventarioPopup && (
                  <Dialog
                    open={showSaveInventarioPopup}
                    onOpenChange={setShowSaveInventarioPopup}
                  >
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Alerta</DialogTitle>
                        <DialogDescription>
                          Por favor, salve o novo inventário antes de adicionar
                          itens.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">
                            Fechar
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </>
            )}
            <Dialog
              open={isAddItemDialogOpen}
              onOpenChange={setAddItemDialogOpen}
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Adicionar Item</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddItemDialogSubmit}>
                  <div className="grid gap-4 py-4">
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
                      <Label htmlFor="cabecas" className="text-right">
                        Cabeças
                      </Label>
                      <Input
                        id="cabecas"
                        type="number"
                        className="col-span-3"
                        {...form.register("cabecas")}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Adicionar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TableFooter>
      </Table>
    </div>
  );
}
