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

export default function IdentificacaoBeneficiarioTab({ defaultValues }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const IDENTIFICAO_BENEFICIARIO_PARSED_FIELDS = {
    "1candidatoNome": defaultValues.campo1,
    "2candidatoCPF": defaultValues.campo2,
    "3candidatoRG": defaultValues.campo3,
    "4candidatoOrgaoExp": defaultValues.campo4,
    "6candidatoGenero": defaultValues.campo6,
    "7candidatoEtnia": defaultValues.campo7,
    "8candidatoEstadoCivil": defaultValues.campo8,
    "9candidatoNaturalidade": defaultValues.campo9,
    "10candidatoLogradouro": defaultValues.campo10,
    "11candidatoCEP": defaultValues.campo11,
    "13candidatoBairro": defaultValues.campo13,
    "14candidatoUF": defaultValues.campo14,
    "16candidatoTelefone": defaultValues.campo16,
    "17candidatoEmail": defaultValues.campo17,
  };

  const form = useForm({
    defaultValues: IDENTIFICAO_BENEFICIARIO_PARSED_FIELDS,
  });
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
            name="1candidatoNome"
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
            name="2candidatoCPF"
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
            name="3candidatoRG"
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
            name="4candidatoOrgaoExp"
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
            name="5candidatoNomeSocial"
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
            name="6candidatoGenero"
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
            name="7candidatoEtnia"
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
            name="8candidatoEstadoCivil"
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
            name="9candidatoNaturalidade"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>9. Naturalidade</FormLabel>
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
            name="10candidatoLogradouro"
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
            name="11candidatoCEP"
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
            name="12candidatoNumero"
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
            name="13candidatoBairro"
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
            name="14candidatoUF"
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
            name="15candidatoComplemento"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>15. Complemento</FormLabel>
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
            name="16candidatoTelefone"
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
            name="17candidatoEmail"
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
            name="18conjugeNome"
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
            name="19conjugeCPF"
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
            name="20conjugeRG"
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
            name="21conjugeOrgaoExp"
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
            name="22conjugeNomeSocial"
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
            name="23conjugeRegimeCasamento"
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
            name="24conjugeTelefone"
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
      </form>
    </Form>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
