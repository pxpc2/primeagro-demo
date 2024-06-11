import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function PreAnaliseTab() {
  return (
    <div className="h-full w-full flex flex-row justify-evenly">
      <div className="w-full h-full p-4 gap-4">
        <h2 className="text-center text-white font-semibold p-4 border rounded-md bg-orange-500 bg-opacity-85">
          Informações Iniciais
        </h2>
        <div className="mt-4 p-4 bg-gray-50">
          <InformacoesIniciaisForm />
        </div>
      </div>
      <div className="w-full h-full p-4 gap-4">
        <h2 className="text-center text-white font-semibold p-4 border rounded-md bg-orange-500 bg-opacity-85">
          Pré-análise
        </h2>
      </div>
    </div>
  );
}

function InformacoesIniciaisForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="aba1-protocolo-obter-credito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número Protocolo Obter Crédito</FormLabel>
              <FormControl>
                <Input type="text" placeholder="15337531" {...field} />
              </FormControl>
              <FormDescription>Número do protocolo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aba1-data-protocolo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data do protocolo</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>Data de início do protocolo</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="hidden">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
