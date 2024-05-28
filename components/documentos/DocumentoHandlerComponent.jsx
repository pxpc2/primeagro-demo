import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function DocumentoInstance({ doc }) {
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
          className={`inline-flex items-center rounded-md ${doc.corBg} px-2 py-1 text-xs font-medium ${doc.corTexto} ring-1 ring-inset ${doc.corRing} `}
        >
          {doc.status}
        </span>
      </td>
      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <a href="#" className="text-black-600 hover:text-indigo-500">
          {doc.status === "Ativo" ? (
            <></>
          ) : (
            <ArrowUpTrayIcon className="w-4 h-4" />
          )}
        </a>
      </td>
    </tr>
  );
}
