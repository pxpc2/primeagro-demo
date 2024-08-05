import Image from "next/image";
import SVG from "@/public/money.svg";
import { Button } from "../ui/button";
import { ExternalLinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function PagamentoCard({ cliente, status_enquadramento }) {
  const [statusTexto, setStatusTexto] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  if (cliente.status_pagamento || !status_enquadramento) return;
  const handlePaymentLinkClick = () => {
    setStatusTexto(
      "Após concluir o pagamento, informe seu avaliador técnico para liberação."
    );
    setDialogOpen(false);
  };
  return (
    <div className="text-center mt-8 px-3 sm:mt-12 flex flex-col items-center">
      <Loader2 className="animate-spin w-5 h-5 text-black" />
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        Pagamento não identificado.
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Conclua o pagamento para seguir para a próxima etapa.
      </p>
      <h3 className="mt-4 font-bold text-red-500 ">
        ATENÇÃO: O processo de elaboração do projeto está incluso no
        financiamento e não é pago, este pagamento se refere somente aos
        serviços de consultoria e processos ANTERIORES à elaboração do projeto.
      </h3>

      <div className="mt-6">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-500">
              Ir para pagamento
              <ExternalLinkIcon className="ml-1.5 h-5 w-5" aria-hidden="true" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmação de Pagamento</DialogTitle>
              <DialogDescription>
                Você tem certeza de que entendeu o que este pagamento cobre? O
                processo de elaboração do projeto está incluso no financiamento
                e não é pago, este pagamento se refere somente aos serviços de
                consultoria e processos ANTERIORES à elaboração do projeto.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handlePaymentLinkClick} asChild>
                <Link
                  href="https://www.asaas.com/c/h5b4yhbjzfwfm920"
                  target="_blank"
                >
                  Confirmar e Ir para pagamento
                </Link>
              </Button>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <p className="mt-4 text-sm text-lime-700 font-semibold">{statusTexto}</p>
    </div>
  );
}
