import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import DocumentoInstance from "./DocumentoHandlerComponent";
import { DOCUMENTOS } from "@/utils/constants";
import { getDocuments } from "@/app/user-dashboard/actions";
import { useEffect, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabsData = [
  { name: "Anexos do Beneficiário", id: "beneficiario", current: true },
  { name: "Anexos Técnicos", id: "tecnicos", current: false },
  { name: "Anexos do Vendedor", id: "vendedor", current: false },
  { name: "Anexos do Imóvel Objeto do Crédito", id: "imovel", current: false },
];

export default function UserDocumentosDashboard({ cliente }) {
  const [docStatus, setDocStatus] = useState({});
  const [reload, setReload] = useState(false);
  const [currentTab, setCurrentTab] = useState("beneficiario");
  const [tabs, setTabs] = useState(tabsData); // Assuming tabsData is an array of tabs

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
    setReload((prev) => !prev);
  };

  const filteredDocuments = () => {
    switch (currentTab) {
      case "beneficiario":
        return DOCUMENTOS.filter((doc) => doc.id.startsWith("1."));
      case "tecnicos":
        return DOCUMENTOS.filter((doc) => doc.id.startsWith("2."));
      case "vendedor":
        return DOCUMENTOS.filter((doc) => doc.id.startsWith("3."));
      case "imovel":
        return DOCUMENTOS.filter((doc) => doc.id.startsWith("4."));
      default:
        return [];
    }
  };

  const handleTabChange = (tabId) => {
    setCurrentTab(tabId);
    const updatedTabs = tabs.map((tab) => ({
      ...tab,
      current: tab.id === tabId,
    }));
    setTabs(updatedTabs);
  };

  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          onChange={(e) => handleTabChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
          defaultValue={tabs.find((tab) => tab.current).name}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <p
              key={tab.id}
              href={"#"}
              onClick={() => handleTabChange(tab.id)}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden hover:cursor-pointer bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab.current ? "page" : undefined}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.current ? "bg-orange-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </p>
          ))}
        </nav>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
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
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">
                        <ArrowUpTrayIcon />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredDocuments().map((doc) => (
                    <DocumentoInstance
                      doc={doc}
                      key={doc.id}
                      status={docStatus[doc.id]}
                      onSubmit={handleDocumentSubmit}
                      authid={cliente.authuser_id}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
