"use client";

import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@/utils/supabase/client";
import FormularioEnquadramentoPreview from "@/components/dashboard/formulario-enquadramento-preview";
import DashboardSteps from "@/components/dashboard/dashboard-steps";
import PagamentoCard from "@/components/dashboard/pagamento-card";
import DocumentosDashboard from "@/components/documentos/DocumentosDashboard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboardPage({ cliente, dadosEnquadramento }) {
  const [role, setRole] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Geral");
  const navigation = [
    { name: "Geral", href: "#", current: selectedTab === "Geral" },
    {
      name: "Formulário de Enquadramento",
      href: "#",
      current: selectedTab === "Formulário de Enquadramento",
    },
    { name: "Documentos", href: "#", current: selectedTab === "Documentos" },
  ];
  const userNavigation = [
    { name: "Sua Conta", href: "#" },
    { name: "Sair", href: "#" },
  ];

  const usuario = cliente[0];

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

  return (
    <div className="min-h-full">
      <div className="bg-orange-800 pb-32">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-orange-700">
                  <div className="flex h-28 items-end justify-between px-4 sm:px-0">
                    <div className="flex items-end">
                      <div className="flex-shrink-0 mr-8 sm:mb-2">
                        <Link href={"/"}>
                          <Image
                            src="/logo-04.svg"
                            alt="ConfidensAgro"
                            height={200}
                            width={100}
                          />
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4 sm:mb-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              onClick={() => {
                                setSelectedTab(item.name);
                              }}
                              className={classNames(
                                item.current
                                  ? "bg-orange-700 text-gray-200 font-bold"
                                  : "text-gray-200 hover:bg-orange-700 font-normal",
                                (!usuario.status_enquadramento ||
                                  !usuario.status_pagamento) &&
                                  item.name === "Documentos"
                                  ? "hidden"
                                  : "rounded-md px-3 py-2 text-sm hover:cursor-pointer"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          ))}
                          <Link
                            href={"/projeto"}
                            target="_blank"
                            className={classNames(
                              "text-gray-200 hover:bg-orange-700 font-normal rounded-md px-3 py-2 text-sm hover:cursor-pointer border border-orange-600 border-dotted",
                              usuario.status_documentos ? "" : "hidden"
                            )}
                          >
                            <button>Projeto</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block sm:mb-4">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="relative rounded-full bg-orange-600 p-1 text-gray-100 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-200"
                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Ver Notificações</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">
                                Abrir menu de usuário
                              </span>
                              <Image
                                className="h-8 w-8 rounded-full"
                                src={"/farmer.png"}
                                alt=""
                                width={300}
                                height={50}
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Abrir menu principal</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                <div className="space-y-1 px-2 py-3 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        className="h-10 w-10 rounded-full"
                        src={"/farmer.png"}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {usuario.primeiro_nome}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {usuario.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Ver Notificações</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-1xl font-semibold tracking-tight text-white">
              Bem-vindo, {usuario.primeiro_nome} {usuario.ultimo_nome}
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-0">
          <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
            {selectedTab === "Geral" ? (
              <DashboardSteps cliente={usuario} />
            ) : selectedTab === "Documentos" ? (
              <DocumentosDashboard cliente={usuario} />
            ) : (
              <FormularioEnquadramentoPreview
                dados={dadosEnquadramento[0]}
                cliente={usuario}
              />
            )}
          </div>
          {selectedTab === "Geral" ? (
            <div>
              <PagamentoCard cliente={usuario} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
}
