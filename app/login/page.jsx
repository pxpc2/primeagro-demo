"use client";

import Image from "next/image";
import { signIn } from "@/app/login/actions";
import { SubmitButton } from "@/app/login/submit-button";
import { useState } from "react";
import SignUpForm from "./SignupForm";

export default function LoginPage({ searchParams: { message, successmsg } }) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    console.log("mudando showModal de " + showModal + " para " + !showModal);
    setShowModal(!showModal);
  };

  return (
    <div className="flex min-h-full flex-1 bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              className="h-16 w-auto"
              src="/farmer.png"
              alt="Your Company"
              width={500}
              height={500}
            />
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Entre com sua conta
            </h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Não possui conta?{" "}
              <span className="font-semibold text-orange-600 hover:text-orange-400">
                <button onClick={toggleModal}>Registrar agora.</button>
              </span>
            </p>
          </div>
          <div className="mt-10">
            <div>
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Usuário
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Senha
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm leading-6 text-gray-700"
                    >
                      Lembrar-me
                    </label>
                  </div>

                  <div className="text-sm leading-6">
                    <a
                      href="#"
                      className="font-semibold text-orange-600 hover:text-orange-400"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>

                <div>
                  <SubmitButton
                    formAction={signIn}
                    className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    pendingText="Entrando..."
                  >
                    Entrar
                  </SubmitButton>
                  {message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-center">
                      {message}
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1484557985045-edf25e08da73?q=80&w=2573&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={2000}
          height={50}
        />
      </div>

      <SignUpForm
        isToggled={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        msg={successmsg}
      />
    </div>
  );
}
