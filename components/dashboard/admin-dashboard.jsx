"use client";

import { ExternalLinkIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export default function AdminDashboard({ clientes }) {
  const handleOpenProject = (userId) => {};
  console.log(clientes);

  const handleDeleteEnquadramento = (userId) => {};
  return (
    <div className="flex flex-col gap-y-4 p-4">
      {clientes?.map((user) => {
        console.log(user);
        const nomeCompletoPartes = (user.primeiro_nome + " " + user.sobrenome)
          .trim()
          .split(" ");
        const iniciais = nomeCompletoPartes
          .map((i) => i.charAt(0).toUpperCase())
          .join("");
        return (
          <div
            key={user.id}
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
                onClick={() => handleOpenProject(user.id)}
                variant="secondary"
              >
                Abrir projeto
                <ExternalLinkIcon className="ml-1.5 mt-0.5" />
              </Button>
              <Button
                onClick={() => handleDeleteEnquadramento(user.id)}
                variant="ghost"
                className="hover:bg-red-600 hover:text-white"
              >
                Deletar enquadramento
                <Trash2Icon className="ml-1.5 mt-0.5" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function UserList() {}
