import { DOCUMENTOS_ENQUADRAMENTO } from "@/utils/constants";
import React from "react";

export default function FormularioEnquadramentoPreview({ dados, cliente }) {
  console.log(dados);

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
            dados.erradas && dados.erradas.includes(key)
              ? "outline outline-red-600"
              : ""
          }`}
        >
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {index + 1}. {questionMap[key]}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {answer}
          </dd>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
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
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900 mt-28">
          Dados do Formulário
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">{renderRespostas()}</dl>
      </div>
    </div>
  );
}
