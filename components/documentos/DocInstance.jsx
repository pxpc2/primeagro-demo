"use client";

import { createClient } from "@/utils/supabase/client";
import {
  ArrowUpTrayIcon,
  ArrowPathIcon,
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";

export default function DocumentoInstance({ doc, status, onSubmit, authid }) {
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
          className={`inline-flex items-center rounded-md ${corBg} px-2 py-1 text-xs font-medium ${corTexto} ring-1 ring-inset ${corRing} `}
        >
          {status ? "Ativo" : "Pendente"}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        {doc.status === "Ativo" ? (
          <></>
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
            <label className="ml-2 w-[24px] hover:cursor-pointer text-gray-500">
              <EllipsisVerticalIcon />
            </label>
          </div>
        )}
      </td>
    </tr>
  );
}
