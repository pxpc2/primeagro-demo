"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitProfileForm } from "@/app/user-dashboard/actions";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { CheckIcon, Loader2 } from "lucide-react";

export default function ProfileCreationForm() {
  const form = useForm();
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const [loading, setLoading] = useState(false);

  const formatCPF = (value) => {
    if (!value) return value;
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatRG = (value) => {
    if (!value) return value;
    return value
      .replace(/\D/g, "")
      .replace(/(\d{1})(\d{3})(\d{3})$/, "$1.$2.$3");
  };

  const formatTelefone = (value) => {
    if (!value) return value;
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  };

  const handleChange = (e, fieldKey) => {
    let formattedValue = e.target.value;
    if (fieldKey === "cpf") {
      formattedValue = formatCPF(formattedValue);
    } else if (fieldKey === "rg") {
      formattedValue = formatRG(formattedValue);
    } else if (fieldKey === "telefone") {
      formattedValue = formatTelefone(formattedValue);
    }
    form.setValue(fieldKey, formattedValue);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await submitProfileForm({ dados: data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-5 sm:p-6 bg-gray-950">
      <div className="divide-y divide-gray-900/10">
        <h1 className="font-bold text-center">
          Por favor, complete as informações de seu perfil ConfidensAgro abaixo.
        </h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="divide-y divide-gray-200 p-4 sm:p-26 sm:mt-8">
              <div className="grid gap-4 bg-gray-900 p-8 rounded-lg">
                <div className="grid grid-cols-1 gap-4 pt-4">
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="nome_completo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        <FormDescription>Seu nome completo</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 pt-4">
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => handleChange(e, "cpf")}
                          />
                        </FormControl>
                        <FormDescription>Seu CPF</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="rg"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>RG</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => handleChange(e, "rg")}
                          />
                        </FormControl>
                        <FormDescription>Seu RG</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="orgaoExpedidor"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Orgão expedidor</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="ex: SSP/DF"
                          />
                        </FormControl>
                        <FormDescription>Orgão expedido do RG</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="genero"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gênero</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="feminino">Feminino</SelectItem>
                            <SelectItem value="outro">Outro(s)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="etnia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Etnia</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="branca">Branco</SelectItem>
                            <SelectItem value="preta">Preto</SelectItem>
                            <SelectItem value="parda">Pardo</SelectItem>
                            <SelectItem value="amarela">Amarela</SelectItem>
                            <SelectItem value="indigena">Indígena</SelectItem>
                            <SelectItem value="outras">Outras</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="estadoCivil"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado Civil</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="solteiro">
                              Solteiro(a)
                            </SelectItem>
                            <SelectItem value="casado">Casado(a)</SelectItem>
                            <SelectItem value="divorciado">
                              Divorciado(a)
                            </SelectItem>
                            <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                            <SelectItem value="separado">
                              Separado(a)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="naturalidade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naturalidade</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="brasileiro">
                              Brasileiro
                            </SelectItem>
                            <SelectItem value="estrangeiro">
                              Estrangeiro
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => handleChange(e, "telefone")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  rules={{ required: "Campo obrigatório." }}
                  name="enderecoLinha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço linha 1</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          {...field}
                          placeholder="ex: SQS 310 bloco J"
                        />
                      </FormControl>
                      <FormDescription>
                        Primeira linha de seu endereço
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pb-8">
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="bairro"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            placeholder="ex: Asa Sul"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    rules={{ required: "Campo obrigatório." }}
                    name="uf"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>UF</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="overflow-y-auto">
                            <SelectItem value="AC">Acre</SelectItem>
                            <SelectItem value="AL">Alagoas</SelectItem>
                            <SelectItem value="AP">Amapá</SelectItem>
                            <SelectItem value="AM">Amazonas</SelectItem>
                            <SelectItem value="BA">Bahia</SelectItem>
                            <SelectItem value="CE">Ceará</SelectItem>
                            <SelectItem value="DF">Distrito Federal</SelectItem>
                            <SelectItem value="ES">Espírito Santo</SelectItem>
                            <SelectItem value="GO">Goiás</SelectItem>
                            <SelectItem value="MA">Maranhão</SelectItem>
                            <SelectItem value="MT">Mato Grosso</SelectItem>
                            <SelectItem value="MS">
                              Mato Grosso do Sul
                            </SelectItem>
                            <SelectItem value="MG">Minas Gerais</SelectItem>
                            <SelectItem value="PA">Pará</SelectItem>
                            <SelectItem value="PB">Paraíba</SelectItem>
                            <SelectItem value="PR">Paraná</SelectItem>
                            <SelectItem value="PE">Pernambuco</SelectItem>
                            <SelectItem value="PI">Piauí</SelectItem>
                            <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                            <SelectItem value="RN">
                              Rio Grande do Norte
                            </SelectItem>
                            <SelectItem value="RS">
                              Rio Grande do Sul
                            </SelectItem>
                            <SelectItem value="RO">Rondônia</SelectItem>
                            <SelectItem value="RR">Roraima</SelectItem>
                            <SelectItem value="SC">Santa Catarina</SelectItem>
                            <SelectItem value="SP">São Paulo</SelectItem>
                            <SelectItem value="SE">Sergipe</SelectItem>
                            <SelectItem value="TO">Tocantins</SelectItem>
                            <SelectItem value="EX">Estrangeiro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 text-white" />
                ) : (
                  <CheckIcon
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                )}
                {loading ? "" : "Enviar"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
