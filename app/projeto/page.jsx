"use client";

import { useEffect, useState } from "react";
import PreAnaliseTab from "@/components/projeto/pre-analise-tab";
import { PROJETO_TABS } from "@/utils/constants";
import { getProjetoFormsData, isAdminUser } from "./actions";
import { Loader2 } from "lucide-react";
import IdentificacaoBeneficiarioTab from "@/components/projeto/id-beneficiario-tab";
import DadosImovelTab from "@/components/projeto/dados-imovel-tab";
import InventarioTab from "@/components/projeto/inventario-tab";
import InvestimentosTab from "@/components/projeto/investimentos-tab";
import TiposDeSoloTab from "@/components/projeto/tipos-de-solo-tab";
import CronogramaTab from "@/components/projeto/cronograma-tab";
import SIBTab from "@/components/projeto/sib-tab";
import EvolucaoRebanhoTab from "@/components/projeto/evolucao-rebanho-tab";
import TotalTab from "@/components/projeto/totalUA-tab";
import ReceitasTab from "@/components/projeto/receitas-tab";
import OrcamentosTab from "@/components/projeto/orcamentos-tab";
import { set } from "react-hook-form";
import DespesasTab from "@/components/projeto/despesas-tab";
import SimuladorPNCF from "@/components/projeto/simuladorPNCF-tab";
import { getDadosEnquadramentoForm } from "../user-dashboard/actions";
import FluxoCaixaTab from "@/components/projeto/fluxo-caixa-tab";
import SimuladorPRONAF from "@/components/projeto/simulador-pronaf";
import CapacidadePagamentoTab from "@/components/projeto/capacidade-pagamento-tab";
import SumulaTab from "@/components/projeto/sumula-tab";

export default function ProjetoPage() {
  const tabs = PROJETO_TABS;
  const [currentTab, setCurrentTab] = useState("Menu");
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [vendasAnimaisData, setVendasAnimaisData] = useState({}); // p/ usar em receitas
  const [dadosEnquadramento, setDadosEnquadramento] = useState({});
  const handleVendasAnimaisUpdate = (newData) => {
    setVendasAnimaisData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProjetoFormsData();
      setDadosEnquadramento(await getDadosEnquadramentoForm());
      setIsAdmin(await isAdminUser());
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
          <div className="w-full h-[55vh] bg-logoGrande bg-no-repeat bg-contain bg-top over "></div>
        );
      case "Pré-análise":
        return (
          <PreAnaliseTab
            defaultValues={formData?.aba_preanalise}
            isAdmin={isAdmin}
            dadosEnquadramento={dadosEnquadramento}
          />
        );
      case "Identificação do Beneficiário":
        return (
          <IdentificacaoBeneficiarioTab
            defaultValues={formData?.aba_identificacao_beneficiario}
            isAdmin={isAdmin}
          />
        );
      case "Dados do Imóvel":
        return (
          <DadosImovelTab
            defaultValues={formData?.aba_dadosImovel}
            isAdmin={isAdmin}
          />
        );
      case "Inventário":
        return <InventarioTab isAdmin={isAdmin} />;
      case "Investimentos":
        return (
          <InvestimentosTab
            data={formData?.aba_investimentos}
            isAdmin={isAdmin}
          />
        );
      case "Tipos de solo":
        return (
          <TiposDeSoloTab data={formData?.aba_tiposDeSolo} isAdmin={isAdmin} />
        );

      case "Cronograma":
        return (
          <CronogramaTab data={formData?.aba_cronograma} isAdmin={isAdmin} />
        );

      case "SIB":
        return (
          <SIBTab
            data={formData?.aba_sib}
            isAdmin={isAdmin}
            dadosImovel={formData?.aba_dadosImovel}
          />
        );
      case "Evolução do rebanho":
        return (
          <EvolucaoRebanhoTab
            data={formData?.aba_evolucao_rebanho}
            isAdmin={isAdmin}
            setVendaAnimaisData={setVendasAnimaisData}
          />
        );
      case "Total (UA)":
        return (
          <TotalTab
            data={formData?.aba_total_ua}
            isAdmin={isAdmin}
            evolucaoRebanhoData={formData?.aba_evolucao_rebanho}
          />
        );
      case "Receitas":
        return (
          <ReceitasTab
            data={formData?.aba_receitas}
            isAdmin={isAdmin}
            vendaAnimaisData={vendasAnimaisData}
            evolucaoRebanhoData={formData?.aba_evolucao_rebanho}
          />
        );
      case "Despesas":
        return (
          <DespesasTab
            data={formData?.aba_despesas}
            isAdmin={isAdmin}
            receitasData={formData?.aba_receitas}
          />
        );
      case "Orçamentos":
        return (
          <OrcamentosTab data={formData?.aba_orcamentos} isAdmin={isAdmin} />
        );
      case "Simulador PNCF":
        return (
          <SimuladorPNCF
            data={formData?.aba_simuladorPNCF}
            isAdmin={isAdmin}
            dadosSIB={formData?.aba_sib}
            abaPreAnalise={formData?.aba_preanalise}
          />
        );
      case "Fluxos de Caixa":
        return (
          <FluxoCaixaTab
            fluxoCaixaData={formData?.aba_fluxo_de_caixa}
            dadosImovelData={formData?.aba_dadosImovel}
            identificacaoBeneficiarioData={
              formData?.aba_identificacao_beneficiario
            }
            preAnaliseData={formData?.aba_preanalise}
            isAdmin={isAdmin}
            despesasData={formData?.aba_despesas}
            receitasData={formData?.aba_receitas}
          />
        );
      case "Simulador PRONAF":
        return (
          <SimuladorPRONAF
            data={formData?.aba_simuladorPRONAF}
            isAdmin={isAdmin}
            preAnaliseData={formData?.aba_preanalise}
            sibData={formData?.aba_sib}
          />
        );
      case "Capacidade de Pagamento":
        return (
          <CapacidadePagamentoTab
            data={formData?.aba_capacidade_pagamento}
            isAdmin={isAdmin}
            preAnaliseData={formData?.aba_preanalise}
            identificacaoBeneficiarioData={formData?.aba_identificacao_beneficiario}
            dadosImovelData={formData?.aba_dadosImovel}
            sibData={formData?.aba_sib}
            fluxoCaixaData={formData?.aba_fluxo_de_caixa}
            receitasData={formData?.aba_receitas}
            despesasData={formData?.aba_despesas}
          />
        );
      case "Súmula (PAG01)":
        return (
          <SumulaTab
            preAnaliseData={formData?.aba_preanalise}
            identificacaoBeneficiarioData={formData?.aba_identificacao_beneficiario}
            dadosImovelData={formData?.aba_dadosImovel}
            investimentosData={formData?.aba_investimentos}
            receitasData={formData?.aba_receitas}
            despesasData={formData?.aba_despesas}
            simuladorPNCFData={formData?.aba_simuladorPNCF}
            simuladorPRONAFData={formData?.aba_simuladorPRONAF}
            fluxoCaixaData={formData?.aba_fluxo_de_caixa}
            isAdmin={isAdmin}
          />
        );
      case "Imprimir a súmula":
        return (
          <div className="w-full h-[55vh] flex items-center justify-center">
            <p className="text-xl text-gray-400">Use a aba Súmula (PAG01) para visualizar e imprimir</p>
          </div>
        );
      default:
        return <h1 className="h-screen">{tabName}</h1>;
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center align-middle text-center">
        <div className="flex flex-col gap-4 items-center text-center justify-center">
          <h1 className="text-xl font-semibold">Carregando o seu projeto</h1>
          <Loader2 className="animate-spin  sm:h-[20%] sm:w-[20%] w-5 h-5 text-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow h-full flex flex-col justify-center">
      <div className="px-4 py-5 sm:px-6 bg-gray-200">
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
                    "tab flex items-center justify-center border border-gray-400"
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
                    "tab flex items-center justify-center border border-gray-400"
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
      <div className="bg-gray-900/80 w-full h-full p-5 overflow-hidden">
        {renderContent(currentTab)}
      </div>
    </div>
  );
}
