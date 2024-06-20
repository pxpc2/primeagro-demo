import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Heading({
  tabName,
  onEdit,
  onSave,
  isEditing,
  isLoading,
}) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <p className="text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-default">
                  Projeto
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 hover:cursor-default">
                  {tabName}
                </p>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        {!isEditing ? (
          <span className="mr-3 sm:block">
            <button
              type="button"
              onClick={onEdit}
              className="inline-flex items-center rounded-md bg-white px-3 py-2 w-full text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              <PencilIcon
                className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Editar
            </button>
          </span>
        ) : (
          <span className="sm:ml-3">
            <button
              type="button"
              onClick={onSave}
              className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm w-full font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
                <CheckIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
              )}
              {isLoading ? "" : "Salvar"}
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
