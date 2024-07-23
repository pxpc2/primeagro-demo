"use client";

import { CheckIcon, ExternalLinkIcon, Loader2, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
import { adminDeletarEnquadramento } from "@/app/user-dashboard/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function AdminDashboard({ clientes }) {
  const [deletarEnquadramentoStatus, setDeletarEnquadramentoStatus] = useState(
    clientes.reduce((acc, user) => {
      acc[user.authuser_id] = {
        loading: false,
        success: false,
        buttonText: "Deletar enquadramento",
        failed: false,
      };
      return acc;
    }, {})
  );

  const [deletarDialogOpen, setDeletarDialogOpen] = useState(false);
  const [clienteSelected, setClienteSelected] = useState(null);

  const confirmDelete = (userId) => {
    setClienteSelected(userId);
    setDeletarDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    handleDeleteEnquadramento(clienteSelected);
    setDeletarDialogOpen(false);
  };

  const handleOpenProject = (userId) => {};

  const handleDeleteEnquadramento = async (userId) => {
    setDeletarEnquadramentoStatus((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        loading: true,
        buttonText: "",
      },
    }));

    const deletado = await adminDeletarEnquadramento({ authuser_ID: userId });

    setDeletarEnquadramentoStatus((prevState) => ({
      ...prevState,
      [userId]: {
        ...prevState[userId],
        loading: false,
        success: false,
        buttonText: deletado
          ? "Enquadramento deletado! Recarregar página"
          : "Deleção falhou",
        failed: !deletado,
      },
    }));
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 p-4">
        {clientes?.map((user) => {
          const nomeCompletoPartes = (user.primeiro_nome + " " + user.sobrenome)
            .trim()
            .split(" ");
          const iniciais = nomeCompletoPartes
            .map((i) => i.charAt(0).toUpperCase())
            .join("");
          const status = deletarEnquadramentoStatus[user.authuser_id];
          return (
            <div
              key={user.authuser_id}
              className="flex items-center justify-between p-2 bg-white rounded shadow"
            >
              <div className="flex items-center gap-x-4">
                <Avatar className="text-black">
                  <AvatarFallback>{iniciais}</AvatarFallback>
                </Avatar>
                <span>{user.email}</span>
              </div>
              <div className="flex gap-x-2">
                <Button
                  onClick={() => handleOpenProject(user.authuser_id)}
                  variant="secondary"
                  className="cursor-not-allowed hover:bg-secondary opacity-55"
                >
                  Abrir projeto
                  <ExternalLinkIcon className="ml-1.5 mt-0.5" />
                </Button>
                <Button
                  onClick={() => confirmDelete(user.authuser_id)}
                  className={`hover:bg-red-600 hover:text-white bg-transparent text-gray-800 ${
                    status.success ? "bg-red-600 text-white" : ""
                  }`}
                >
                  {status.loading ? (
                    <Loader2 className="animate-spin w-5 h-5 text-white" />
                  ) : (
                    <>
                      {status.buttonText}
                      {!status.failed && !status.success && (
                        <Trash2Icon className="ml-1.5 mt-0.5" />
                      )}
                      {status.success && (
                        <CheckIcon className="ml-1.5 mt-0.5" />
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
        <Dialog open={deletarDialogOpen} onOpenChange={setDeletarDialogOpen}>
          <DialogTrigger asChild>
            <div></div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar deleção</DialogTitle>
              <DialogDescription>
                Você tem certeza que deseja deletar este enquadramento? Esta
                ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setDeletarDialogOpen(false)}
              >
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>
                Deletar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-sm italic">
        * somente clientes que estão com enquadramento preenchido aparecem na
        lista, esteja aprovado ou não.
      </p>
      <p className="text-sm italic">
        ou seja, se o usuário existe, mas seu enquadramento já foi deletado (não
        está preenchido), ele não aparece aqui.
      </p>
    </>
  );
}
