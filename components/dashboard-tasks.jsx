import {
  CheckBadgeIcon,
  ClockIcon,
  CheckIcon,
  NoSymbolIcon,
  ArrowDownCircleIcon,
} from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboardTasksComponent({ enqStatus, docStatus }) {
  const actions = [
    {
      title: "Formulário de Enquadramento",
      href: "#",
      icon: enqStatus === true ? CheckIcon : NoSymbolIcon,
      iconForeground: "text-white",
      iconBackground: enqStatus === false ? "bg-red-400" : "bg-green-400",
      description:
        enqStatus === true
          ? "A ConfidensAgro (DTS Rebouças Ltda-CNPJ-43.263.293/0001-02) empresa credenciada para operacionalizar o Programa Nacional de Crédito Fundiário (PNCF) no estado do Tocantins, tem o prazer de lhe informar que você está ENQUADRADO como beneficiário de acordo com suas respostas."
          : "Você respondeu a 1 ou mais critérios restritivos para enquadramento no PNCF, não podendo desta forma seguir com o seu processo neste momento. Caso tenha ficado alguma dúvida sobre os critérios restritivos, entre em contato conosco através do celular/WhatsApp - 63-9913-14127.",
    },
    {
      title: "Documentos",
      href: "#",
      icon:
        docStatus === null
          ? enqStatus === true
            ? ClockIcon
            : NoSymbolIcon
          : NoSymbolIcon,
      iconForeground: "text-white",
      iconBackground: enqStatus === false ? "bg-red-400" : "bg-orange-400",
      description:
        docStatus === null
          ? enqStatus === true
            ? "A Próxima etapa de juntada de documentação, é uma das etapas mais importantes do processo. Precisamos coletar documentos com alta qualidade de imagem, pra que seja possível a leitura de todos dos dados pelos analistas, encaminhe documentos feitos via scanner, caso tenha dúvida entre em contato conosco pelo número 63-99131-4127.  Obrigado! Equipe ConfidensAgro."
            : "Você não pode avançar para etapa de documentos."
          : "erro",
    },
  ];
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
      {actions.map((action, actionIdx) => (
        <div
          key={action.title}
          className={classNames(
            actionIdx === 0
              ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
              : "",
            "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
          )}
        >
          <div>
            <span
              className={classNames(
                action.iconBackground,
                action.iconForeground,
                "inline-flex rounded-lg p-3 ring-4 ring-white"
              )}
            >
              <action.icon className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              <a href={action.href} className="focus:outline-none">
                {/* Extend touch target to entire panel */}
                <span className="absolute inset-0" aria-hidden="true" />
                {action.title}
              </a>
            </h3>
            <p className="mt-2 text-sm text-gray-500">{action.description}</p>
          </div>
          <span
            className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
