import { signUp } from "./actions";
import { SubmitButton } from "./submit-button";

export default function SignUpForm({ isToggled, onClose, msg }) {
  if (!isToggled) return null;
  return (
    <div className="fixed inset-x-0 inset-y-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="h-full flex flex-col w-[800px] bg-white px-16 py-16 overflow-y-scroll">
        <form>
          <div className="space-y-12">
            <div className="border-b border-orange-600/30 pb-12">
              <h2 className="text-2xl font-bold leading-7 text-black pb-4">
                Registre sua conta
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                As informações dispostas no formulário abaixo são importantes
                para gerar seu cadastro no sistema PrimeAgro e adiantar o
                processamento de suas aplicações.
              </p>
            </div>
            <div className="border-b border-orange-600/30 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Endereço de Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="senha-atual"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="repeat-password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Repetir senha
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="repeat-password"
                      id="repeat-password"
                      autoComplete="repetir-senha"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => {
                onClose();
              }}
              className="rounded-md  px-3 py-2 text-sm place-self-end font-semibold text-gray-500 shadow-sm hover:bg-red-500 hover:text-white border"
            >
              Cancelar
            </button>
            <SubmitButton
              formAction={signUp}
              pendingText="Registrando..."
              className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Salvar informações e registrar conta
            </SubmitButton>
            {msg && (
              <p className="mt-4 p-4 bg-foreground/10 text-center">{msg}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
