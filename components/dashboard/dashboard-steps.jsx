import {
  ENQUADRAMENTO_APROVADO,
  ENQUADRAMENTO_REPROVADO,
} from "@/utils/constants";
import { CheckIcon } from "@heroicons/react/24/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardSteps({
  cliente,
  setSelectedTab,
  dadosEnquadramento,
}) {
  // dadosEnquadramento contém o array de erradas, podemos permitir que delete e responda novamente caso necessário.
  if (dadosEnquadramento[0].erradas.length > 0) {
  }
  const steps = [
    {
      id: "01",
      name: "Formulário de Enquadramento",
      description:
        dadosEnquadramento[0].erradas.length === 0
          ? ENQUADRAMENTO_APROVADO
          : ENQUADRAMENTO_REPROVADO,
      href: "#",
      status:
        dadosEnquadramento[0].erradas.length === 0 ? "complete" : "upcoming",
    },
  ];

  if (dadosEnquadramento[0].erradas.length === 0) {
    steps.push({
      id: "02",
      name: "Pagamento",
      description: cliente.status_pagamento
        ? "Pagamento identificado com sucesso!"
        : "Conclua o pagamento para avançar para a etapa de documentos.",
      href: "#",
      status: cliente.status_pagamento ? "complete" : "current",
    });

    if (cliente.status_pagamento) {
      steps.push({
        id: "03",
        name: "Documentos",
        description: cliente.status_documentos
          ? "Envio de documentos concluído com sucesso!"
          : "Sua próxima etapa é concluir o envio dos documentos pendentes na aba Documentos.",
        href: "#",
        status: cliente.status_documentos ? "complete" : "current",
      });
    }
  }

  const handleClick = (step) => {
    if (step.name === "Documentos" && step.status !== "complete") {
      setSelectedTab("Documentos");
    } else if (step.id === "01" && step.status !== "complete") {
      setSelectedTab("Formulário de Enquadramento");
    }
  };

  return (
    <div className="lg:border-b lg:border-t lg:border-gray-800">
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Progress"
      >
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-800"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className="relative overflow-hidden lg:flex-1 bg-gray-950/80 cursor-default"
            >
              <div
                className={classNames(
                  stepIdx === 0 ? "rounded-t-md border-b-0" : "",
                  stepIdx === steps.length - 1 ? "rounded-b-md border-t-0" : "",
                  "overflow-hidden border border-gray-800 lg:border-0"
                )}
              >
                {step.status === "complete" ? (
                  <a href={step.href} className="group cursor-default">
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-200">
                          <CheckIcon
                            className="h-6 w-6 text-black"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-lime-200">
                          {step.name}
                        </span>
                        <span className="text-sm sm:text-sm mt-1 sm:mt-0 font-normal text-gray-300">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                ) : step.status === "current" ? (
                  <a
                    href={step.href}
                    aria-current="step"
                    className={
                      step.name === "Documentos" ? "" : "cursor-default"
                    }
                    onClick={() => handleClick(step)}
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-orange-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-orange-400">
                          <span className="text-orange-400">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-orange-400">
                          {step.name}
                        </span>
                        <span className="text-sm sm:text-sm mt-1 sm:mt-0 font-normal  text-gray-300">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                ) : (
                  <a
                    href={step.href}
                    className="group"
                    onClick={() => handleClick(step)}
                  >
                    <span
                      className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? "lg:pl-9" : "",
                        "flex items-start px-6 py-5 text-sm font-medium"
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-400">
                          <span className="text-gray-500">{step.id}</span>
                        </span>
                      </span>
                      <span className="ml-4 mt-0.5 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">
                          {step.name}
                        </span>
                        <span className="text-sm text-gray-500 font-normal">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </a>
                )}

                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div
                      className="absolute inset-0 left-0 top-0 hidden w-3 lg:block"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M0.5 0V31L10.5 41L0.5 51V82"
                          stroke="currentcolor"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
