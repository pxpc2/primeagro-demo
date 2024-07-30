"use client";

import { CheckIcon, ExternalLinkIcon, Loader2, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";
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
  const handleOpenProject = (userId) => {};

  return (
    <>
      <div className="flex flex-col gap-y-4 p-4">
        {clientes?.map((user) => {
          const nomeCompletoPartes = user.nome_completo.trim().split(" ");
          const iniciais = nomeCompletoPartes
            .map((i) => i.charAt(0).toUpperCase())
            .join("");
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
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-sm italic">
        * na lista aparecem todos os clientes criados, independente de seu
        enquadramento.
      </p>
    </>
  );
}
