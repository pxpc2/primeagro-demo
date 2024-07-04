import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { signUp } from "./actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function RegisterForm({ msg }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signUp(data);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Registrar conta</DialogTitle>
        <DialogDescription>
          Crie sua conta para acessar o sistema ConfidensAgro.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-8">
            <FormField
              control={form.control}
              rules={{ required: "E-mail obrigatório." }}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Este é o endereço de e-mail que será utilizado para acessar
                    sua conta. É necessário ser válido.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4 pt-4">
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
                    <FormDescription>Sua senha de acesso.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                rules={{ required: "Por favor, confirme sua senha." }}
                name="password-repeat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetir senha</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>Repita a senha de acesso.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Registrar"
              )}
            </Button>
          </DialogFooter>
          {msg && (
            <p className="mt-4 p-4 bg-foreground/10 text-center">{msg}</p>
          )}
        </form>
      </Form>
    </div>
  );
}
