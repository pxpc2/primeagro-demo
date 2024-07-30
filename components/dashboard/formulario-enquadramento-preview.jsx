import { DOCUMENTOS_ENQUADRAMENTO } from "@/utils/constants";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Trash2Icon } from "lucide-react";
import { deleteEnquadramento } from "@/app/user-dashboard/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function FormularioEnquadramentoPreview({ dados, cliente }) {
  const questionMap = {
    campo1: "Grupo",
    campo2: "Estado que pretende comprar a propriedade",
    campo3: "É maior de 18 anos?",
    campo4: "Possui menos de 70 anos?",
    campo5: "Você é funcionário público?",
    campo6:
      "Podem participar do PNCF: Trabalhadores rurais não-proprietários, preferencialmente assalariados, parceiros, posseiros e arrendatários. Ou agricultores proprietários de imóveis cuja área não alcance a dimensão da propriedade familiar. (320 hectares, ou 66,1 alqueires para grande parte do Tocantins). Você se enquadra em uma dessas condições?",
    campo7:
      "O PNCF é dividido em 4 linhas, considerando renda anual e patrimônio, marque em qual das linhas você se enquadra.",
    campo8:
      "Você já foi assentado da reforma agrária, ou participou de algum programa que tenha recursos do Fundo de Terras da Reforma Agrária?",
    campo9:
      "Marque quais dos documentos listados abaixo você possui ou já possuiu nos últimos 15 anos que seja possível localizar e contabilizar pelo menos 5 anos (pode marcar mais de 1)",
  };

  const getDocumentLabels = (docIds) => {
    return docIds.map((docId) => {
      const doc = DOCUMENTOS_ENQUADRAMENTO.find((d) => d.id === docId);
      return doc ? doc.label : docId;
    });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const statusEnquadramento = dados.erradas.length === 0;
  const handleDeleteEnquadramento = async () => {
    await deleteEnquadramento();
    setIsDialogOpen(false);
  };

  const renderRespostas = () => {
    if (!dados) return null;

    return Object.keys(questionMap).map((key, index) => {
      const bgColor = index % 2 === 0 ? "bg-white" : "bg-gray-100"; // alternância de cores

      let answer;
      if (key === "campo9") {
        answer = dados.docs ? getDocumentLabels(dados.docs).join(", ") : "";
      } else {
        answer = dados[key];
      }

      return (
        <div
          key={key}
          className={`${bgColor} px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3 ${
            dados.erradas &&
            (dados.erradas.includes(key) ||
              (key === "campo9" && dados.erradas.includes("docs")))
              ? "outline outline-red-600"
              : ""
          }`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {index + 1}. {questionMap[key]}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {key === "campo9" && dados.erradas.includes("docs") ? (
              <p>Não pussuo nenhum documento da lista.</p>
            ) : (
              <p>{answer}</p>
            )}
          </dd>
        </div>
      );
    });
  };

  return (
    <div>
      {!statusEnquadramento && (
        <div>
          <div className="flex flex-col sm:flex-row gap-4 items-center py-4 text-sm">
            <p>
              Você possui 1 ou mais resposta(s) errrada(s). Para prosseguir,
              refaça o questionário.
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:bg-red-600 hover:text-white sm:bg-inherit bg-red-600 sm:text-inherit text-white"
                >
                  Excluir e refazer enquadramento
                  <Trash2Icon className="ml-1.5 w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirmar Exclusão</DialogTitle>
                  <DialogDescription>
                    Tem certeza de que deseja excluir o enquadramento? Esta ação
                    não pode ser desfeita.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDeleteEnquadramento}
                  >
                    Excluir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="mt-8 sm:mt-2 text-sm">
            Veja abaixo suas respostas (erradas estarão contornadas em
            vermelho):{" "}
          </p>
        </div>
      )}
      <div className="pt-8">
        <h3 className="text-base font-bold leading-7 text-gray-900">
          Dados Básicos
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="bg-gray-100 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nome
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cliente?.primeiro_nome} {cliente?.sobrenome}
            </dd>
          </div>
          <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Estado de residência
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cliente?.uf}
            </dd>
          </div>
          <div className="bg-gray-100 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Endereço de Email
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {cliente?.email}
            </dd>
          </div>
        </dl>
      </div>
      <div className="">
        <h3 className="text-base font-bold leading-7 text-gray-900 mt-10 sm:mt-16">
          Dados do Formulário
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderRespostas()}</dl>
      </div>
    </div>
  );
}
