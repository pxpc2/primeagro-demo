import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

const documentos = [
  {
    id: "1.1",
    nome: "DAP OU CAF ATIVA",
    descricao: "Ver mais",
    status: "Ativo",
  },
  {
    id: "1.2",
    nome: "COMPROVANTE DE ELEGILIBIDADE E EXPERIENCIA RURAL - (VER TIPOS POSSÍVEL EM ANEXO)",
    descricao: "Ver mais",
    status: "Ativo",
  },
  {
    id: "1.3",
    nome: "DOCUMENTO DE IDENTIFICAÇÃO PROPONENTE (RG, CPF, TÍTULO ELEITORAL, (CNH SE HOUVER)",
    descricao: "Ver mais",
    status: "Pendente",
  },
  {
    id: "1.4",
    nome: "CPF - COMPROVANTE DE SITUAÇÃO CADASTRAL PROPONENTE.",
    descricao: "Ver mais",
    status: "Ativo",
  },
  {
    id: "1.5",
    nome: "CPF - COPROVANTE DE SITUAÇÃO CADASTRAL CONJUGE (Se houver)",
    descricao: "Ver mais",
    status: "Pendente",
  },
  {
    id: "1.6",
    nome: "ESTADO CIVIL (CERTIDÃO DE CASAMENTO, OU NASCIMENTO, OU AVERBAÇÃO DE DIVORCIO, OU OUTRO DOC QUE COMPROVE A SITUAÇÃO CIVIL)",
    descricao: "Ver mais",
    status: "Pendente",
  },
  {
    id: "1.10",
    nome: "COMPROVANTE DE ENDEREÇO (NÃO DEVE HAVER DIVERGÊNCIA. MANTER SEMPRE EXATAMENTE O MESMO ENDEREÇO DA DECLARACAO DE ELEGIBILIDADE DE PREFERENCIA NO NOME DO BENEFICIÁRIO OU DA ESPOSA, SE EM NOME DE TERCEIROS, JÁ INCLUI JUNTO DECLARAÇÃO DE RESIDENCIA DE PREFERENCIA NO MESMO ARQUIVO.",
    descricao: "Ver mais",
    status: "Pendente",
  },
];

export default function UserDocumentosDashboard() {
  documentos.forEach((doc) => {
    if (doc.status === "Pendente") {
      doc.corTexto = "text-orange-600";
      doc.corBg = "bg-orange-50";
      doc.corRing = "ring-orange-800/40";
    } else if (doc.status === "Ativo") {
      doc.corTexto = "text-green-600";
      doc.corBg = "bg-green-50";
      doc.corRing = "ring-green-800/40";
    }
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Documentos Anexos do Beneficiário
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Aqui você encontra todos os documentos para serem anexados pelo
            beneficiário.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"></div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-12">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Nome
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">
                      <ArrowUpTrayIcon />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {documentos.map((doc) => (
                  <tr key={doc.id}>
                    <td className="break-words overflow-auto py-5 pl-4 pr-4 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <div className="font-normal text-sm text-gray-900">
                            {doc.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="break-words px-3 py-5 text-xs text-gray-500">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-normal text-sm text-gray-900">
                            {doc.nome}
                          </div>
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
                      <a
                        href="#"
                        className="text-black-600 hover:text-indigo-500"
                      >
                        {doc.status === "Ativo" ? (
                          <></>
                        ) : (
                          <ArrowUpTrayIcon className="w-4 h-4" />
                        )}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
