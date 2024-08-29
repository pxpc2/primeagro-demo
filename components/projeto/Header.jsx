import {
  CheckIcon,
  ChevronRightIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function Heading({
  tabName,
  onEdit,
  onSave,
  isEditing,
  isLoading,
  onCancel,
  isAdmin,
}) {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <nav className="flex" aria-label="Breadcrumb">
          <ol role="list" className="flex items-center space-x-4">
            <li>
              <div className="flex">
                <p className="text-sm font-medium text-gray-200 hover:text-gray-500 hover:cursor-default">
                  Projeto
                </p>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon
                  className="h-5 w-5 flex-shrink-0 text-gray-200"
                  aria-hidden="true"
                />
                <p className="ml-4 text-sm font-medium text-gray-200 hover:text-gray-500 hover:cursor-default">
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
            <Button type="button" onClick={onEdit} variant="outline">
              Editar
              <PencilIcon
                className="ml-1.5 h-3.5 w-3.5 text-gray-100"
                aria-hidden="true"
              />
            </Button>
          </span>
        ) : (
          <div className="flex flex-row gap-6">
            <span className="sm:-ml-3">
              <Button variant="outline" onClick={onCancel}>
                Cancelar
              </Button>
            </span>

            <span className="">
              <button
                type="button"
                onClick={onSave}
                className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm w-full font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? "" : "Salvar"}
                {isLoading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <CheckIcon
                    className="h-3.5 w-3.5 mt-0.5 ml-1"
                    aria-hidden="true"
                  />
                )}
              </button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
