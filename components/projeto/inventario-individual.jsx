import { CirclePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
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

export default function InventarioIndividual({
  inventariosIndividuais,
  setInventariosIndividuais,
  formDisabled,
  setIsDialogOpen,
}) {
  const form = useForm();
  const handleDialogSubmit = form.handleSubmit((data) => {
    const newItem = { ...data };
    setInventariosIndividuais((prev) => [...prev, newItem]);
    setIsDialogOpen(false);
    form.reset();
  });
  return (
    <div>
      {inventariosIndividuais?.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      <Dialog>
        <DialogTrigger asChild>
          {!formDisabled ? (
            <Button size="sm" variant="" className="gap-1">
              Inserir novo
              <CirclePlusIcon className="h-3.5 w-3.5 mt-0.5" />
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
          <form onSubmit={handleDialogSubmit}>
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
  );
}

function Item({ item }, key) {
  return (
    <p className="" key={key}>
      {item.tipo}
    </p>
  );
}
