"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@/utils/supabase/client";
import FormularioEnquadramentoPreview from "@/components/dashboard/formulario-enquadramento-preview";
import DashboardSteps from "@/components/dashboard/dashboard-steps";
import PagamentoCard from "@/components/dashboard/pagamento-card";
import DocumentosDashboard from "@/components/documentos/DocumentosDashboard";
import { Button } from "@/components/ui/button";
import {
  BookTextIcon,
  CalendarIcon,
  ExternalLinkIcon,
  FolderIcon,
  HomeIcon,
  Loader2,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DialogPanel,
  TransitionChild,
  Dialog,
  DialogBackdrop,
} from "@headlessui/react";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import { getAllClients } from "./actions";

const navigation = [
  { name: "Geral", href: "#", icon: HomeIcon },
  { name: "Formulário de Enquadramento", href: "#", icon: BookTextIcon },
  { name: "Documentos", href: "#", icon: FolderIcon },
];

const adminNav = [
  { name: "Dashboard", href: "#", icon: HomeIcon },
  { name: "Beneficiários", href: "#", icon: UsersIcon },
  { name: "Técnicos", href: "#", icon: CalendarIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboardPage({
  cliente,
  dadosEnquadramento,
  isAdmin,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [selectedTab, setSelectedTab] = useState(
    `${isAdmin ? "Dashboard" : "Geral"}`
  );
  const [clientes, setClientes] = useState([]);

  const userNavigation = [{ name: "Sair", href: "#" }];

  const usuario = cliente[0];

  const [clientesListLoading, setClientesListLoading] = useState(true);

  const supabase = createClient();

  const { subscription: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session) {
        const jwt = jwtDecode(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole);
      }
    }
  );

  useEffect(() => {
    const fetchClients = async () => {
      setClientesListLoading(true);
      const fetched = await getAllClients();
      setClientes(fetched);
      setClientesListLoading(false);
    };
    fetchClients();
  }, []);

  const nomeCompletoPartes = usuario.nome_completo.trim().split(" ");
  const iniciais = nomeCompletoPartes
    .map((i) => i.charAt(0).toUpperCase())
    .join("");

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full">
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon aria-hidden="true" className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
              <div className="flex mt-4 shrink-0 items-center">
                <Image
                  src="/logo-04.svg"
                  alt="ConfidensAgro"
                  height={160}
                  width={160}
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul
                      role="list"
                      className="-mx-2 space-y-3 flex flex-col mt-2"
                    >
                      {(isAdmin ? adminNav : navigation).map((item) => (
                        <li key={item.name}>
                          <Button
                            onClick={() => {
                              setSelectedTab(item.name);
                              setSidebarOpen(false);
                            }}
                            disabled={
                              item.name === "Documentos" &&
                              (!usuario.status_pagamento ||
                                !dadosEnquadramento[0].erradas.length === 0)
                                ? true
                                : false
                            }
                            className={classNames(
                              selectedTab === item.name
                                ? "text-gray-200 bg-gray-800 hover:bg-gray-800"
                                : "text-gray-200 hover:bg-gray-800 hover:text-white bg-gray-900",
                              "flex justify-start gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full"
                            )}
                          >
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                            {item.name}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex my-4 shrink-0 items-center">
            <Link href={"/login"}>
              <Image
                src="/logo-04.svg"
                alt="ConfidensAgro"
                height={160}
                width={160}
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {(isAdmin ? adminNav : navigation).map((item) => (
                    <li key={item.name}>
                      <Button
                        onClick={() => setSelectedTab(item.name)}
                        className={classNames(
                          selectedTab === item.name
                            ? " text-gray-200 bg-gray-800 hover:bg-gray-800"
                            : "text-gray-200 hover:bg-gray-800 hover:text-white bg-gray-900",
                          "group flex gap-x-3 rounded-md p-2 text-xs font-normal leading-6"
                        )}
                        disabled={
                          item.name === "Documentos" &&
                          (!usuario.status_pagamento ||
                            !dadosEnquadramento[0].erradas.length === 0)
                            ? true
                            : false
                        }
                      >
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                        {item.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                >
                  <Avatar className="text-black">
                    <AvatarFallback className="bg-gray-300">
                      {iniciais}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate text-gray-200">
                    {usuario.email}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        >
          <span className="sr-only">Abrir menu</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          {selectedTab}
        </div>
        <a href="#">
          <span className="sr-only">Seu perfil</span>
        </a>
      </div>

      <main
        className={`py-2 lg:pl-72 sm:h-full ${
          selectedTab === "Geral" ? "bg-gray-950" : "bg-gray-100"
        }`}
      >
        <div
          className={`px-4 sm:px-6 lg:px-8 flex flex-col align-middle h-full  ${
            selectedTab === "Geral" ? "sm:justify-center" : "py-8"
          }`}
        >
          <div className="   px-1 py-6 shadow sm:px-6">
            {!isAdmin && selectedTab === "Geral" ? (
              <DashboardSteps
                cliente={usuario}
                setSelectedTab={setSelectedTab}
                dadosEnquadramento={dadosEnquadramento}
              />
            ) : !isAdmin && selectedTab === "Documentos" ? (
              <DocumentosDashboard cliente={usuario} />
            ) : !isAdmin && selectedTab === "Formulário de Enquadramento" ? (
              <FormularioEnquadramentoPreview
                dados={dadosEnquadramento[0]}
                cliente={usuario}
              />
            ) : isAdmin && selectedTab === "Dashboard" ? (
              <>
                {clientesListLoading ? (
                  <div>
                    <Loader2 className="animate-spin w-5 h-5 text-black" />
                  </div>
                ) : (
                  <AdminDashboard clientes={clientes} />
                )}
              </>
            ) : isAdmin && selectedTab === "Beneficiários" ? (
              <p>ABA BENEFICIÁRIOS</p>
            ) : isAdmin && selectedTab === "Técnicos" ? (
              <p>ABA TÉCNICOS</p>
            ) : (
              <p>aba não identificada, por favor recarregue a página.</p>
            )}
          </div>
          {selectedTab === "Geral" && !isAdmin && (
            <div>
              <PagamentoCard
                cliente={usuario}
                status_enquadramento={
                  dadosEnquadramento[0].erradas.length === 0
                }
              />
            </div>
          )}
          {!isAdmin && selectedTab === "Geral" && usuario.status_documentos && (
            <div className="flex-col items-center text-sm align-middle justify-center mx-12 py-4 sm:p-12 sm:my-12">
              <Link href="/projeto" target="_blank">
                <Button variant="secondary" className="mt-4">
                  Acessar o projeto <ExternalLinkIcon className="ml-1.5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
