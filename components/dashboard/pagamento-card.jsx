import Image from "next/image";
import SVG from "@/public/money.svg";
import { Button } from "../ui/button";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PagamentoCard({ cliente, status_enquadramento }) {
  const [statusTexto, setStatusTexto] = useState("");
  if (cliente.status_pagamento || !status_enquadramento) return;
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
        <Link href="https://www.asaas.com/c/h5b4yhbjzfwfm920" target="_blank">
          <Button
            className="bg-orange-600 hover:bg-orange-500"
            onClick={() =>
              setStatusTexto(
                "Após concluir o pagamento, informe seu avaliador técnico para liberação."
              )
            }
          >
            Ir para pagamento
            <ExternalLinkIcon className="ml-1.5 h-5 w-5" aria-hidden="true" />
          </Button>
        </Link>
      </div>
      <p className="mt-4 text-sm text-lime-700 font-semibold">{statusTexto}</p>
    </div>
  );
}
