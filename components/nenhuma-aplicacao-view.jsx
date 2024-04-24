import SignUpForm from "@/app/login/SignupForm";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import NovaProposta from "./aplicacao-form";
import { jwtDecode } from "jwt-decode";
import { createClient } from "@/utils/supabase/client";

export default function NovaAplicacaoCard() {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState(null);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const supabase = createClient();

  const { subscription: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session) {
        const jwt = jwtDecode(session.access_token);
        const userRole = jwt.user_role;
        setRole(userRole);
      }
    }
  );

  return (
    <div>
      <NovaProposta
        isToggled={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          Nenhuma solicitação em andamento.
        </h3>

        <div>
          {role == "tecnico" ? (
            <div>
              <p className="mt-1 text-sm text-gray-500">
                Preencha os dados e realize sua aplicação.
              </p>
              <div className="mt-6">
                <button
                  onClick={toggleModal}
                  type="button"
                  className="inline-flex items-center rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Nova Aplicação
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="mt-1 text-sm text-gray-500">
                Entre em contato com seu técnico-avaliador para preencher sua
                aplicação.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
