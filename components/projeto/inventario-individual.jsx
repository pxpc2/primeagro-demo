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

export default function InventarioIndividual({
  inventariosIndividuais,
  setInventariosIndividuais,
  formDisabled,
}) {
  return (
    <div>
      {inventariosIndividuais?.map((item) => (
        <Item item={item} key={item.id} />
      ))}
      <Dialog>
        <DialogTrigger asChild>
          {!formDisabled ? (
            <Button size="sm" variant="" className="gap-1">
              <CirclePlusIcon className="h-3.5 w-3.5" />
              Inserir novo
            </Button>
          ) : (
            <></>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
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
