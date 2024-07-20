import Image from "next/image";
import SVG from "@/public/money.svg";
import { Button } from "../ui/button";
import { ExternalLinkIcon, Loader2 } from "lucide-react";

export default function PagamentoCard({ cliente }) {
  if (cliente.status_pagamento || !cliente.status_enquadramento) return;
  return (
    <div className="text-center mt-8 sm:mt-12 flex flex-col items-center">
      <Loader2 className="animate-spin w-5 h-5 text-black" />
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        Pagamento não identificado.
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Conclua o pagamento para seguir para a próxima etapa.
      </p>
      <div className="mt-6">
        <Button className="bg-orange-600 hover:bg-orange-500">
          Ir para pagamento
          <ExternalLinkIcon className="ml-1.5 h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
