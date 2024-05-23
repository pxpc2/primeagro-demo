"use client";
import { useState } from "react";
import { SubmitButton } from "../login/submit-button";
import completeProfile from "./actions";
import FormPNCF from "./pncf-form";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
export default function ProfileCreationPage({ authID }) {
  /* se chegou até aqui, é porque a conta está cadastrada E logada, MAS os dados básicos
   do perfil ainda não foram preenchidos */

  const [showModal, setShowModal] = useState(false);
  const [showAvaliadorMsg, setShowAvaliadorMsg] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const showAvaliador = () => {
    setShowAvaliadorMsg(!showAvaliadorMsg);
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white  shadow-2xl p-8 sm:p-16 sm:w-[80%] gap-16 justify-center overflow-y-auto">
        <Link href={"/login"}>
          <button
            type="button"
            className="rounded-full  bg-white text-black shadow-sm hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <HomeIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
          </button>
        </Link>
        {!showAvaliadorMsg && (
          <div className="flex items-center flex-col justify-center align-middle h-full">
            <h1 className="font-medium pt-20">Qual o seu tipo de conta?</h1>
            <div className="w-full flex items-center gap-11 justify-center py-10">
              <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-500 hover:text-gray-200"
                onClick={toggleModal}
              >
                Sou beneficiário
              </button>
              <button
                type="button"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-500 hover:text-gray-200"
                onClick={showAvaliador}
              >
                Sou avaliador técnico
              </button>
            </div>
          </div>
        )}

        {showAvaliadorMsg && (
          <h1 className="font-medium pt-20">
            Entre em contato para solicitar a liberação de conta avaliador.
          </h1>
        )}
      </div>

      <FormPNCF
        isToggled={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        msg={"oi"}
      />
    </div>
  );
}
