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

export default function IdentificacaoBeneficiarioTab() {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      //await submitPreAnaliseForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  return (
    <div className="p-4">
      <Heading
        tabName={"Identificação do Beneficiário"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <div className="w-full py-4 flex flex-col gap-8">
        <div className="p-4 bg-gray-50 flex flex-col gap-8">
          <p className="text-indigo-800 font-semibold">
            Dados do candidato(a):{" "}
          </p>
          <DadosCandidatoForm form={form} formsDisabled={formsDisabled} />
        </div>
        <div className="p-4 bg-gray-50 flex flex-col gap-8">
          <p className="text-indigo-800 font-semibold">Dados do conjuge: </p>
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
            name="candidatoNome"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome</FormLabel>
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
            name="candidatoCPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
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
            name="candidatoRG"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RG</FormLabel>
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
            name="candidatoOrgaoExp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orgão Expedidor</FormLabel>
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
            name="candidatoNomeSocial"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome Social</FormLabel>
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
            name="candidatoGenero"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gênero</FormLabel>
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
            name="candidatoEtnia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Etnia (cor/raça)</FormLabel>
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
            name="candidatoEstadoCivil"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado Civíl</FormLabel>
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
            name="candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Naturalidade</FormLabel>
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
            name="candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Logradouro</FormLabel>
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
            name="candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>CEP</FormLabel>
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
            name="candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Número</FormLabel>
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
            name="candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Bairro</FormLabel>
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
            name="candidatoUF"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>UF</FormLabel>
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
            name="candidatoComplemento"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={field.value || ""}
                    disabled={{ formsDisabled }}
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
            name="candidatoTelefone"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <FormLabel>Telefone</FormLabel>
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
            name="candidatoEmail"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>E-mail</FormLabel>
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
            name="conjugeNome"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome</FormLabel>
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
            name="conjugeCPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
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
            name="conjugeRG"
            render={({ field }) => (
              <FormItem>
                <FormLabel>RG</FormLabel>
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
            name="conjugeOrgaoExp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orgão Expedidor</FormLabel>
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
            name="conjugeNomeSocial"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Nome Social</FormLabel>
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
            name="conjugeRegimeCasamento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Regime de casamento</FormLabel>
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
            name="conjugeTelefone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
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
