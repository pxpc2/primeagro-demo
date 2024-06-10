import { PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import SVG from "@/public/money.svg";

export default function PagamentoCard({ cliente }) {
  if (cliente.status_pagamento || !cliente.status_enquadramento) return;
  return (
    <div className="text-center mt-24 flex flex-col items-center">
      <Image src={SVG} alt="" className="w-12 h-12" />
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        Pagamento não realizado.
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Conclua o pagamento para seguir para a próxima etapa.
      </p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-normal text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Gerar Boleto
        </button>
      </div>
    </div>
  );
}
