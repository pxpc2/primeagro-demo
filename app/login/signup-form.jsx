import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./submit-button";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

export default function RegisterForm({ msg }) {
  const form = useForm();
  return (
    <div>
      <DialogHeader>
        <DialogTitle>Registrar conta</DialogTitle>
        <DialogDescription>
          Crie sua conta para acessar o sistema ConfidensAgro.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form>
          <div className="grid gap-4 py-8">
            <FormField
              control={form.control}
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
            <SubmitButton className="hover:bg-orange-500" formAction={signUp}>
              Registrar
            </SubmitButton>
          </DialogFooter>
          {msg && (
            <p className="mt-4 p-4 bg-foreground/10 text-center">{msg}</p>
          )}
        </form>
      </Form>
    </div>
  );
}
