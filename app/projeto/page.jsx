"use client";

import { useEffect, useState } from "react";
import PreAnaliseTab from "@/components/projeto/pre-analise-tab";
import { PROJETO_TABS } from "@/utils/constants";
import { getProjetoFormsData } from "./actions";
import { Loader2 } from "lucide-react";
import IdentificacaoBeneficiarioTab from "@/components/projeto/id-beneficiario-tab";

export default function ProjetoPage() {
  const tabs = PROJETO_TABS;
  const [currentTab, setCurrentTab] = useState("Menu");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjetoFormsData();
      setFormData(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const firstRowTabs = tabs.slice(0, 11);
  const secondRowTabs = tabs.slice(11);

  /**
   *
   * @param {*} tabName nome da aba
   * @returns conteúdo baseado no nome da aba, a cada switch renderiza um component diferente
   */
  const renderContent = (tabName) => {
    switch (tabName) {
      case "Menu":
        return (
          <div className="w-full h-screen bg-pncf bg-no-repeat bg-cover bg-top"></div>
        );
      case "Pré-análise":
        return <PreAnaliseTab defaultValues={formData?.aba_preanalise} />;
      case "Identificação do Beneficiário":
        return <IdentificacaoBeneficiarioTab />;
      default:
        return <h1 className="h-screen">{tabName}</h1>;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center align-middle text-center">
        <div className="flex flex-col gap-4 items-center text-center justify-center">
          <h1 className="text-xl font-semibold">Carregando o seu projeto</h1>
          <Loader2 className="animate-spin  sm:h-[20%] sm:w-[20%] w-5 h-5 text-black" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow h-full flex flex-col justify-center">
      <div className="px-4 py-5 sm:px-6">
        <div>
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Selecione uma aba
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              defaultValue={currentTab}
              onChange={(e) => setCurrentTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name} value={tab.name}>
                  {tab.name}
                </option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <nav
              className="isolate grid grid-cols-11 gap-0 rounded-lg shadow"
              aria-label="Tabs"
            >
              {firstRowTabs.map((tab, tabIdx) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(tab.name);
                  }}
                  className={classNames(
                    tab.name === currentTab
                      ? "text-gray-900 bg-white"
                      : "text-gray-500 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-tl-lg" : "",
                    tabIdx === firstRowTabs.length - 1 ? "rounded-tr-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-gray-100 px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
                    "tab flex items-center justify-center border"
                  )}
                  aria-current={tab.name === currentTab ? "page" : undefined}
                >
                  <span className="whitespace-break-spaces">{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.name === currentTab
                        ? "bg-orange-500"
                        : "bg-transparent",
                      "absolute inset-x-0 bottom-0 h-0.5"
                    )}
                  />
                </a>
              ))}
              {secondRowTabs.map((tab, tabIdx) => (
                <a
                  key={tab.name}
                  href={tab.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentTab(tab.name);
                  }}
                  className={classNames(
                    tab.name === currentTab
                      ? "text-gray-900 bg-white"
                      : "text-gray-500 hover:text-gray-700",
                    tabIdx === 0 ? "rounded-bl-lg" : "",
                    tabIdx === secondRowTabs.length - 1 ? "rounded-br-lg" : "",
                    "group relative min-w-0 flex-1 overflow-hidden bg-gray-100 px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10",
                    "tab flex items-center justify-center border"
                  )}
                  aria-current={tab.name === currentTab ? "page" : undefined}
                >
                  <span className="whitespace-normal">{tab.name}</span>
                  <span
                    aria-hidden="true"
                    className={classNames(
                      tab.name === currentTab
                        ? "bg-orange-500"
                        : "bg-transparent",
                      "absolute inset-x-0 bottom-0 h-0.5"
                    )}
                  />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full h-full p-5 overflow-scroll">
        {renderContent(currentTab)}
      </div>
    </div>
  );
}
