"use client";

import Image from "next/image";
import { signIn } from "@/app/login/actions";
import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RegisterForm from "./signup-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Moon, Sun } from "lucide-react";

export default function LoginPage({ searchParams: { message, successmsg } }) {
  const { toast } = useToast();
  useEffect(() => {
    const notify = () =>
      toast({
        title: "Erro ao realizar login",
        description: message,
        variant: "destructive",
      });
    if (message) notify();
  }, [message, toast]);
  return (
    <div className="flex min-h-full flex-1 bg-gray-50">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <a href="/login">
              <Image
                className="h-36 w-auto"
                src="/confidens-logo-verde-laranja.png"
                alt="Your Company"
                width={1200}
                height={1200}
              />
            </a>

            <h2 className="mt-8 text-xl font-bold leading-9 tracking-tight text-popover-foreground">
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
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
    </div>
  );
}

function LoginForm({ message }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          rules={{ required: "E-mail obrigatório." }}
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
          rules={{ required: "Senha obrigatória." }}
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
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-orange-600"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
    </Form>
  );
}
