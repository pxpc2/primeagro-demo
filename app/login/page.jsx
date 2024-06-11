"use client";

import Image from "next/image";
import { signIn } from "@/app/login/actions";
import { useState } from "react";
import SignUpForm from "./SignupForm";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SubmitButton } from "./submit-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RegisterForm from "./signup-form";

export default function LoginPage({ searchParams: { message, successmsg } }) {
  return (
    <div className="flex min-h-full flex-1 bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image
              className="h-36 w-auto"
              src="/confidens-logo-verde-laranja.png"
              alt="Your Company"
              width={1200}
              height={1200}
            />
            <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-gray-900">
              Entre com sua conta
            </h2>
            <div className="flex gap-2 text-[0.8rem]">
              Não possui conta?
              <Dialog>
                <DialogTrigger asChild>
                  <p className="text-primary hover:cursor-pointer hover:underline">
                    Registrar agora.
                  </p>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <RegisterForm msg={successmsg} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-10">
            <div>
              <LoginForm message={message} />
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1656232507424-f33cf6b37cd6?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={2000}
          height={50}
        />
      </div>
    </div>
  );
}

function LoginForm({ message }) {
  const form = useForm();
  return (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@email.com" {...field} />
              </FormControl>
              <FormDescription>
                Este é o endereço de e-mail usado na criação de sua conta.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <div className="flex gap-2">
                <FormDescription>Esta é a sua senha.</FormDescription>
                <FormDescription
                  className="text-indigo-700 hover:underline hover:cursor-pointer"
                  onClick={() => {
                    console.log("esqueceu a senha");
                  }}
                >
                  Esqueceu a senha?
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-[0.8rem] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lembrar dados de acesso
          </label>
        </div>
        <SubmitButton
          formAction={signIn}
          className="w-full hover:bg-orange-500"
          variant="default"
        >
          Entrar
        </SubmitButton>
        {message && (
          <p className="mt-4 p-4 bg-foreground/10 text-center">{message}</p>
        )}
      </form>
    </Form>
  );
}
