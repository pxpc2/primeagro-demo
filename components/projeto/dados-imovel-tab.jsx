"use client";

import { useForm } from "react-hook-form";
import Heading from "./Header";
import { useState } from "react";
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
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function DadosImovelTab({ defaultValues }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: defaultValues,
  });
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      console.log(data);
      //await submitIdentificacaoBeneficiarioForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  return (
    <div className="p-4">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <div className="w-full py-4 flex flex-col gap-8">
        <div className="p-4 bg-gray-50 flex flex-col gap-8">
          <p className="text-indigo-800 font-semibold">Dados do imóvel:</p>
          <DadosImovelCampos form={form} formsDisabled={formsDisabled} />
          <BlueFields
            form={form}
            formsDisabled={formsDisabled}
            className="py-2 sm:py-6"
          />
        </div>
      </div>
    </div>
  );
}

function DadosImovelCampos({ form, formsDisabled }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>1. Nome do Imóvel (Escritura)</FormLabel>
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
                <FormLabel>2. Área total (ha)</FormLabel>
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
                <FormLabel>3. Área a ser adquirida (ha)</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4. Município</FormLabel>
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
            name="campo5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>5. UF</FormLabel>
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
            name="campo6"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6. Nº da matricula</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo7"
            render={({ field }) => (
              <FormItem>
                <FormLabel>7. Nº da certificação</FormLabel>
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
            name="campo8"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>8. Nº do CAR</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo9"
            render={({ field }) => (
              <FormItem>
                <FormLabel>9. Nº da certificação</FormLabel>
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
            name="campo10"
            render={({ field }) => (
              <FormItem>
                <FormLabel>10. Nº do ITR</FormLabel>
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
            name="campo11"
            render={({ field }) => (
              <FormItem>
                <FormLabel>11. Módulo Fiscal do município</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo12"
            render={({ field }) => (
              <FormItem>
                <FormLabel>12. Módulos Fiscais do Imóvel</FormLabel>
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
            name="campo13"
            render={({ field }) => (
              <FormItem>
                <FormLabel>13. Fração mínima de parcelamento (ha)</FormLabel>
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
            name="campo14"
            render={({ field }) => (
              <FormItem>
                <FormLabel>14. Situação do lote quanto à FMP</FormLabel>
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
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="campo15"
            render={({ field }) => (
              <FormItem>
                <FormLabel>15. Valor solicitado</FormLabel>
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
            name="campo16"
            render={({ field }) => (
              <FormItem>
                <FormLabel>16. Valor avaliado</FormLabel>
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
            name="campo17"
            render={({ field }) => (
              <FormItem>
                <FormLabel>17. Valor negociado</FormLabel>
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
          name="campo18"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  className="text-center font-bold"
                  {...field}
                  value={field.value || "Igual ao preço de mercado"}
                  disabled
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

function BlueFields({ form, formsDisabled }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pt-8">
        <div className="w-full">
          <FormField
            control={form.control}
            name="campo19"
            render={({ field }) => (
              <FormItem className="text-center text-white w-full">
                <button className="w-full bg-blue-600 py-2 cursor-default">
                  INDICAÇÕES DE ACESSO AO IMÓVEL
                </button>
                <FormControl>
                  <Textarea
                    className="resize-y text-black"
                    {...field}
                    disabled={formsDisabled}
                    placeholder="SAINDO DA SEDE DO MUNICIPIO PELA BR-020, NO KM-48 ENTRA NA ESTRADA QUE VAI PARA O ALEGRE E ANDA MAIS 12 KM EM ENTRADA DE CARROÇAL ATÉ A FAZENDA MONTE ALEGRE."
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3">
          <FormField
            control={form.control}
            name="campo20"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Distância do município mais próximo (Km)</FormLabel>
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
      </form>
    </Form>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
