"use client";

import { createClient } from "@/utils/supabase/client";
import {
  ArrowUpTrayIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function DocumentoInstance({
  doc,
  status,
  onSubmit,
  authid,
  onView,
  onDelete,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(`${doc.id}.pdf`);
    setIsDialogOpen(false);
  };

  const handleView = () => {
    if (onView) {
      onView(doc);
    }
  };

  const handleDelete = async () => {
    try {
      const docName = `${doc.id}.pdf`;
      await onDelete(docName);
    } catch (error) {
      console.error("Erro ao deletar o documento: ", error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    await handleUpload(file);
  };

  const handleUpload = async (file) => {
    if (file) {
      const supabase = createClient();
      const path = `${authid}/${doc.id}.pdf`;
      let { data, error } = await supabase.storage
        .from("Documentos")
        .upload(path, file, { contentType: "application/pdf" });

      if (error) {
        if (error.message === "The resource already exists") {
          return redirect(
            "/error?message=" +
              "O documento já foi enviado. Por favor, se deseja alterar, primeiro exclua o existente. Em caso de dúvidas, entre em contato conosco da ConfidensAgro."
          );
        } else {
          return redirect(
            "/error?message=" +
              "Ocorreu um erro ao enviar o documento. Por favor, entre em contato."
          );
        }
      }
      if (onSubmit) {
        onSubmit();
      }
    }
  };

  let corTexto = "text-red-600";
  let corBg = "bg-red-50";
  let corRing = "ring-red-800/40";

  if (status) {
    corTexto = "text-green-600";
    corBg = "bg-green-50";
    corRing = "ring-green-800/40";
  }

  return (
    <tr key={doc.id}>
      <td className="break-words overflow-auto py-5 pl-4 pr-4 text-sm sm:pl-0">
        <div className="flex items-center">
          <div className="ml-3">
            <div className="font-normal text-sm text-gray-900">{doc.id}</div>
          </div>
        </div>
      </td>
      <td className="break-words px-3 py-5 text-xs text-gray-500">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="font-normal text-sm text-gray-900">{doc.nome}</div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-xs text-gray-500">
        <div className="text-gray-900">
          <a className="hover:underline text-indigo-500 cursor-pointer">
            {doc.descricao}
          </a>
        </div>
      </td>
      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
        <span
          className={`inline-flex items-center rounded-md ${
            status ? "bg-green-50" : "bg-red-50"
          } px-2 py-1 text-xs font-medium ${
            status ? "text-green-600" : "text-red-600"
          } ring-1 ring-inset ${
            status ? "ring-green-800/40" : "ring-red-800/40"
          } `}
        >
          {status ? "Concluído" : "Pendente"}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        {status ? (
          <div className="flex flex-row w-full">
            <button onClick={handleView}>
              <EyeIcon className="h-4 w-4 inline-block mr-2 text-blue-600 hover:text-blue-800" />
            </button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Trash2Icon className="w-4 h-4 inline-block ml-2 text-red-700 mt-1 cursor-pointer hover:text-red-900" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza de que deseja excluir este documento? Esta ação
                    não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <button
                    onClick={handleDeleteConfirm}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Excluir
                  </button>
                  <button
                    onClick={() => setIsDialogOpen(false)}
                    className="ml-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <div className="flex flex-row w-full">
            <label
              htmlFor={`file-upload-${doc.id}`}
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <ArrowUpTrayIcon className="w-4 h-4 inline-block mr-2" />
              <input
                id={`file-upload-${doc.id}`}
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
        )}
      </td>
    </tr>
  );
}
