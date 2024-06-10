"use client";

import { useState } from "react";
import PreAnaliseTab from "@/components/projeto/pre-analise-tab";
import Heading from "@/components/projeto/Header";

export default function ProjetoPage() {
  const tabs = [
    { name: "Menu", href: "#", current: true },
    { name: "Pré-análise", href: "#", current: false },
    { name: "Identificação do Beneficiário", href: "#", current: false },
    { name: "Inventário", href: "#", current: false },
    { name: "Dados do Imóvel", href: "#", current: false },
    { name: "Tipos de Solo", href: "#", current: false },
    { name: "Investimentos", href: "#", current: false },
    { name: "Cronograma", href: "#", current: false },
    { name: "Orçamentos", href: "#", current: false },
    { name: "SIB", href: "#", current: false },
    { name: "Uso e suporte da terra", href: "#", current: false },
    { name: "Total (UA)", href: "#", current: false },
    { name: "Evolução do rebanho", href: "#", current: false },
    { name: "Receitas", href: "#", current: false },
    { name: "Despesas", href: "#", current: false },
    { name: "Simulador PNCF", href: "#", current: false },
    { name: "Simulador PRONAF", href: "#", current: false },
    { name: "Fluxos de Caixa", href: "#", current: false },
    { name: "Capacidade de Pagamento", href: "#", current: false },
    { name: "Informações complementares", href: "#", current: false },
    { name: "Súmula (PAG01)", href: "#", current: false },
    { name: "Imprimir a súmula", href: "#", current: false },
  ];

  const [currentTab, setCurrentTab] = useState("Menu");

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
          <div className="w-full h-full bg-pncf bg-no-repeat bg-cover bg-top"></div>
        );
      case "Pré-análise":
        return <PreAnaliseTab />;
      default:
        return <h1>{tabName}</h1>;
    }
  };

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
      <div className="py-4 px-12">
        {currentTab === "Menu" ? "" : <Heading tabName={currentTab} />}
      </div>
      <div className="bg-gray-50 w-full h-full p-12 overflow-scroll">
        {renderContent(currentTab)}
      </div>
    </div>
  );
}
