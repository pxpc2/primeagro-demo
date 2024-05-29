import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import DocumentoInstance from "./DocumentoHandlerComponent";
import { DOCUMENTOS } from "@/utils/constants";
import { getDocuments } from "@/app/user-dashboard/actions";
import { useEffect, useState } from "react";

export default function UserDocumentosDashboard({ cliente }) {
  const [docStatus, setDocStatus] = useState({});
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchDocuments = async () => {
      let docsExistentes = await getDocuments(cliente.authuser_id);
      let newDocStatus = {};
      DOCUMENTOS.forEach((doc) => {
        let n = `${doc.id}.pdf`;
        let n2 = `${doc.id}.PDF`;
        newDocStatus[doc.id] =
          docsExistentes.includes(n) || docsExistentes.includes(n2);
      });
      setDocStatus(newDocStatus);
    };

    fetchDocuments();
  }, [cliente.authuser_id, reload]);
  const handleDocumentSubmit = () => {
    // Trigger a re-fetch of documents
    setReload((prev) => !prev);
  };
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
                {DOCUMENTOS.map((doc) => (
                  <DocumentoInstance
                    doc={doc}
                    key={doc.id}
                    status={docStatus[doc.id]}
                    onSubmit={handleDocumentSubmit}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
