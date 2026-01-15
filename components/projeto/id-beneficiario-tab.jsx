"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Heading from "./Header";
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
import { submitIdentificacaoBeneficiarioForm } from "@/app/projeto/actions";
import { Textarea } from "../ui/textarea";

export default function IdentificacaoBeneficiarioTab({
  defaultValues,
  isAdmin,
}) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues:
      defaultValues[0] === undefined ? defaultValues : defaultValues[0],
  });
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      await submitIdentificacaoBeneficiarioForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };
  return (
    <div className="p-4 bg-gray-900/80">
      <Heading
        tabName={"Identificação do Beneficiário"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        isAdmin={isAdmin}
        onCancel={handleCancel}
      />
      <div className="w-full mt-4 sm:px-4  sm:py-2 flex flex-col gap-8">
        <div className="p-4  flex flex-col gap-8">
          <p className="text-gray-100 font-semibold">Dados do candidato(a): </p>
          <DadosCandidatoForm form={form} formsDisabled={formsDisabled} />
        </div>
        <div className="p-4 flex flex-col gap-8">
          <p className="text-gray-100 font-semibold">Dados do conjuge: </p>
          <DadosConjugeForm form={form} formsDisabled={formsDisabled} />
        </div>
      </div>
    </div>
  );
}

function DadosCandidatoForm({ form, formsDisabled }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="campo1"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>1. Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    disabled
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. CPF</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>3. RG</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4. Orgão Expedidor</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="campo5"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>5. Nome Social</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    disabled={formsDisabled}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo6"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6. Gênero</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo7"
            render={({ field }) => (
              <FormItem>
                <FormLabel>7. Etnia (cor/raça)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo8"
            render={({ field }) => (
              <FormItem>
                <FormLabel>8. Estado Civíl</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-5">
          <FormField
            control={form.control}
            name="campo9"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>9. Nacionalidade</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="campo10"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>10. Logradouro</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo11"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>11. CEP</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="campo12"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>12. Número</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo13"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>13. Bairro</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="campo14"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>14. UF</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo15"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>15. Complemento</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="campo16"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>16. Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo17"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>17. E-mail</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

function DadosConjugeForm({ form, formsDisabled }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="campo18"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>18. Nome</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    disabled={formsDisabled}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo19"
            render={({ field }) => (
              <FormItem>
                <FormLabel>19. CPF</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo20"
            render={({ field }) => (
              <FormItem>
                <FormLabel>20. RG</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo21"
            render={({ field }) => (
              <FormItem>
                <FormLabel>21. Orgão Expedidor</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-5 gap-4">
          <FormField
            control={form.control}
            name="campo22"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>22. Nome Social</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    disabled={formsDisabled}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo23"
            render={({ field }) => (
              <FormItem>
                <FormLabel>23. Regime de casamento</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="campo24"
            render={({ field }) => (
              <FormItem>
                <FormLabel>24. Telefone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={formsDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="campo25"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full bg-gray-800 py-2 cursor-default font-bold">
                HISTÓRICO DA FORMAÇÃO DO GRUPAMENTO
              </button>
              <FormControl>
                <Textarea
                  className="resize-y text-black"
                  {...field}
                  disabled={formsDisabled}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="campo26"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full bg-gray-800 py-2 cursor-default font-bold">
                JUSTIFICATIVA
              </button>
              <FormControl>
                <Textarea
                  className="resize-y text-black"
                  {...field}
                  disabled={formsDisabled}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="campo27"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full bg-gray-800 py-2 cursor-default font-bold">
                MERCADO E COMERCIALIZAÇÃO
              </button>
              <FormControl>
                <Textarea
                  className="resize-y text-black"
                  {...field}
                  disabled={formsDisabled}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
