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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { submitDadosImovelForm } from "@/app/projeto/actions";

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
      await submitDadosImovelForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Dados do Imóvel"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
      />
      <div className="w-full mt-4 sm:px-4 sm:py-2 bg-gray-50 flex flex-col gap-8">
        <div className="p-4  flex flex-col gap-8">
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
                <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                  Indicações de acesso ao imóvel
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
        <CondicoesTable form={form} formsDisabled={formsDisabled} />
        <FormField
          control={form.control}
          name="campo21"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Eletrificação existente (tipo, distribuição até onde chega)
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
          name="campo22"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Abastecimento de água existente (para uso domestico)
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
          name="campo23"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Recursos hídricos existente (perenes / não perenes)
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
          name="campo24"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Matas, capoeiras e áreas de extrativismo vegetal
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
          name="campo25"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Outros recursos naturais
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
        <p className="text-indigo-800 font-semibold pt-2 sm:pt-6">
          Complementação dos dados do imóvel:
        </p>
        <FormField
          control={form.control}
          name="campo26"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Providencias necessárias para melhorar as condições de acesso
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
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Providencias para melhorar a eletrificação existentes -
                Planejado
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
          name="campo28"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Abastecimento de água - Planejado
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
          name="campo29"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Recursos hídricos (perenes / não perenes) - Planejado
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
          name="campo30"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Matas, capoeiras e áreas de extrativismo vegetal - Planejado
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
          name="campo31"
          render={({ field }) => (
            <FormItem className="text-center text-white w-full">
              <button className="w-full font-semibold bg-blue-700 py-2 cursor-default">
                Outros recursos naturais - Planejados / recomendados
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

const condicoesList = [
  {
    id: "estrada-pavimentada",
    condicao: "Estrada Pavimentada",
    km: "22",
    transitavel: "12 meses",
  },
  {
    id: "estrada-terra-condicoes-boas",
    condicao: "Estrada de terra em boas condições",
    km: "10",
    transitavel: "12 meses",
  },
  {
    id: "estrada-terra-condicoes-regulares",
    condicao: "Estrada de terra em condições regulares",
  },
  {
    id: "estrada-terra-condicoes-pessimas",
    condicao: "Estrada de terra em péssimas condições",
  },
  { id: "trilha", condicao: "Trilha", km: "25" },
  { id: "fluvial-lacustre", condicao: "Fluvial / lacustre" },
];

function CondicoesTable({ form, formsDisabled }) {
  return (
    <Table>
      <TableHeader className="bg-blue-700">
        <TableRow className="">
          <TableHead className=" text-white">Condições de acesso</TableHead>
          <TableHead className="text-white">KM</TableHead>
          <TableHead className="text-white">Transitável (meses)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {condicoesList.map((k) => (
          <TableRow key={k.id}>
            <TableCell colSpan={1} className="font-medium">
              {k.condicao}
            </TableCell>
            <TableCell colSpan={1}>
              <FormField
                control={form.control}
                name={`campo-${k.id}-km`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value || k.km}
                        disabled={formsDisabled}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                name={`campo-${k.id}-transitavel`}
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormControl>
                      <Input
                        type="text"
                        {...field}
                        value={field.value || k.transitavel}
                        disabled={formsDisabled}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function onSubmit(values) {
  console.log("enviando formulário...");
}
