"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { SubmitButton } from "@/app/login/submit-button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { submitEnquadramentoForm } from "@/app/user-dashboard/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { redirect } from "next/navigation";

export default function EnquadramentoForm({ authID, onClose, msg }) {
  const docs = [
    {
      id: "doc1",
      label:
        "Comprovante de matrícula ou ficha de insc. em escola rural, ata ou boletim escolar do trabalhador ou dos filhos.",
    },
    {
      id: "doc2",
      label: "Ficha de associado em cooperativa.",
    },
    {
      id: "doc3",
      label:
        "Comprovante de participação como beneficiário em programas governamentais para áreas rurais do estado ou do município.",
    },
    {
      id: "doc4",
      label:
        "Comprovante de recebimento de assistência ou de acompanhamento de empresa de assistência técnica e extensão rural.",
    },
    {
      id: "doc5",
      label: "Escritura pública de imóvel rural",
    },
    {
      id: "doc6",
      label: "Recibo de pagamento de contribuição federativa ou confederativa.",
    },
    {
      id: "doc7",
      label:
        "Registro de processos administrativos ou judiciais, inclusive inquéritos, como testemunha, autor ou réu.",
    },
    {
      id: "doc8",
      label:
        "Ficha de registro em livros de casas de saúde, hospitais, postos de saúde, ou do programa dos agentes comunitários de saúde.",
    },
    {
      id: "doc9",
      label: "Carteira de Vacinação (com endereço rural).",
    },
    {
      id: "doc10",
      label: "Título de propriedade de imóvel rural.",
    },
    {
      id: "doc11",
      label:
        "Recibo ou nota fiscal de compra de implementos ou de insumos agrícolas.",
    },
    {
      id: "doc12",
      label: "Publicação na imprensa ou informativos de circulação pública.",
    },
    {
      id: "doc13",
      label:
        "Registro em documentos de associações de produtores rurais, comunitárias, recreativas, desportivas ou religiosas.",
    },
    {
      id: "doc14",
      label: "Carteira de trabalho (quando possuir vínculo CLT)",
    },
    {
      id: "doc15",
      label: "Título de Aforamento",
    },
    {
      id: "doc16",
      label:
        "Declaração de aptidão ao Pronaf (DAP) ou Cadastro de agricultura familiar (CAF) - Atualizadas ou antigas (expiradas).",
    },
    {
      id: "doc17",
      label:
        "Contratos firmados e registrados de arrendamento, parcerias, meação ou posseiros.",
    },
  ];
  /* se chegou até aqui, é porque a conta está cadastrada E logada, MAS os dados básicos
   do perfil ainda não foram preenchidos */
  const form = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      await submitEnquadramentoForm({ formData: data });
      setLoading(false);
      redirect("/user-dashboard");
    })();
  };

  return (
    <div className="fixed inset-x-0 inset-y-0 w-full bg-gray-50 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white  shadow-2xl p-8 sm:p-16  h-full overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 gap-4 flex flex-col">
            <h1 className="text-2xl font-bold text-orange-700 uppercase">
              Formulário de Enquadramento <a className="text-green-700">PNCF</a>
            </h1>
            <p>
              Seu próximo passo é preencher o formulário de enquadramento a
              seguir para o Programa Nacional de Crédio Fundiário.
            </p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="divide-y divide-gray-900/10">
              <Form {...form}>
                <form>
                  <div className="divide-y divide-gray-200">
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="primeiroNome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Primeiro nome</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormDescription>
                                Seu primeiro nome
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="sobrenome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Seu sobrenome</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormDescription>Seu sobrenome</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-7 gap-4 pt-4">
                        <FormField
                          control={form.control}
                          name="cpf"
                          render={({ field }) => (
                            <FormItem className="col-span-3">
                              <FormLabel>CPF</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormDescription>Seu CPF</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="rg"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>RG</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormDescription>Seu RG</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
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
                              <FormDescription>
                                Orgão expedido do RG
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <FormField
                          control={form.control}
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
                                  <SelectItem value="masculino">
                                    Masculino
                                  </SelectItem>
                                  <SelectItem value="feminino">
                                    Feminino
                                  </SelectItem>
                                  <SelectItem value="outro">
                                    Outro(s)
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
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
                                  <SelectItem value="amarela">
                                    Amarela
                                  </SelectItem>
                                  <SelectItem value="indigena">
                                    Indígena
                                  </SelectItem>
                                  <SelectItem value="outras">Outras</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
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
                                  <SelectItem value="casado">
                                    Casado(a)
                                  </SelectItem>
                                  <SelectItem value="divorciado">
                                    Divorciado(a)
                                  </SelectItem>
                                  <SelectItem value="viuvo">
                                    Viúvo(a)
                                  </SelectItem>
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
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
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
                          name="telefone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input type="text" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
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
                      <div className="grid grid-cols-4 gap-4 pb-8">
                        <FormField
                          control={form.control}
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
                                <SelectContent>
                                  <SelectItem value="AC">Acre</SelectItem>
                                  <SelectItem value="AL">Alagoas</SelectItem>
                                  <SelectItem value="AP">Amapá</SelectItem>
                                  <SelectItem value="AM">Amazonas</SelectItem>
                                  <SelectItem value="BA">Bahia</SelectItem>
                                  <SelectItem value="CE">Ceará</SelectItem>
                                  <SelectItem value="DF">
                                    Distrito Federal
                                  </SelectItem>
                                  <SelectItem value="ES">
                                    Espírito Santo
                                  </SelectItem>
                                  <SelectItem value="GO">Goiás</SelectItem>
                                  <SelectItem value="MA">Maranhão</SelectItem>
                                  <SelectItem value="MT">
                                    Mato Grosso
                                  </SelectItem>
                                  <SelectItem value="MS">
                                    Mato Grosso do Sul
                                  </SelectItem>
                                  <SelectItem value="MG">
                                    Minas Gerais
                                  </SelectItem>
                                  <SelectItem value="PA">Pará</SelectItem>
                                  <SelectItem value="PB">Paraíba</SelectItem>
                                  <SelectItem value="PR">Paraná</SelectItem>
                                  <SelectItem value="PE">Pernambuco</SelectItem>
                                  <SelectItem value="PI">Piauí</SelectItem>
                                  <SelectItem value="RJ">
                                    Rio de Janeiro
                                  </SelectItem>
                                  <SelectItem value="RN">
                                    Rio Grande do Norte
                                  </SelectItem>
                                  <SelectItem value="RS">
                                    Rio Grande do Sul
                                  </SelectItem>
                                  <SelectItem value="RO">Rondônia</SelectItem>
                                  <SelectItem value="RR">Roraima</SelectItem>
                                  <SelectItem value="SC">
                                    Santa Catarina
                                  </SelectItem>
                                  <SelectItem value="SP">São Paulo</SelectItem>
                                  <SelectItem value="SE">Sergipe</SelectItem>
                                  <SelectItem value="TO">Tocantins</SelectItem>
                                  <SelectItem value="EX">
                                    Estrangeiro
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription></FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="pt-8 flex gap-4 flex-col">
                      <FormField
                        control={form.control}
                        name="campo1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              1. Você faz parte de algum grupo?
                            </FormLabel>
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
                                <SelectItem value="nenhumGrupo">
                                  Não faço parte de nenhum grupo ainda.
                                </SelectItem>
                                <SelectItem value="visitanteAgrotins">
                                  Visitante AGROTINS - 2024
                                </SelectItem>
                                <SelectItem value="grupoTerraPorto">
                                  G01 - PNCF - Grupo da Terra-Porto/Terezinha
                                </SelectItem>
                                <SelectItem value="grupoAltoSerra">
                                  G02 - PNCF - Alto da Serra - Ap. Rio Negro
                                </SelectItem>
                                <SelectItem value="Ananas">
                                  G04 - Ananás-01-Bico
                                </SelectItem>
                                <SelectItem value="Sandolandia">
                                  G05 - Sandolândia 01
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
                        name="campo2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              2. Em qual estado pretende comprar sua
                              propriedade?
                            </FormLabel>
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
                                <SelectItem value="AC">Acre</SelectItem>
                                <SelectItem value="AL">Alagoas</SelectItem>
                                <SelectItem value="AP">Amapá</SelectItem>
                                <SelectItem value="AM">Amazonas</SelectItem>
                                <SelectItem value="BA">Bahia</SelectItem>
                                <SelectItem value="CE">Ceará</SelectItem>
                                <SelectItem value="DF">
                                  Distrito Federal
                                </SelectItem>
                                <SelectItem value="ES">
                                  Espírito Santo
                                </SelectItem>
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
                                <SelectItem value="RJ">
                                  Rio de Janeiro
                                </SelectItem>
                                <SelectItem value="RN">
                                  Rio Grande do Norte
                                </SelectItem>
                                <SelectItem value="RS">
                                  Rio Grande do Sul
                                </SelectItem>
                                <SelectItem value="RO">Rondônia</SelectItem>
                                <SelectItem value="RR">Roraima</SelectItem>
                                <SelectItem value="SC">
                                  Santa Catarina
                                </SelectItem>
                                <SelectItem value="SP">São Paulo</SelectItem>
                                <SelectItem value="SE">Sergipe</SelectItem>
                                <SelectItem value="TO">Tocantins</SelectItem>
                                <SelectItem value="INDEFINIDO">
                                  Não está definido ainda
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-3">
                        <FormField
                          control={form.control}
                          name="campo3"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>3. Você é maior de idade?</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value || ""}
                                  className="flex flex-row space-x-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="sim" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Sim
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="nao" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Não
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="campo4"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                4. Você tem menos de 70 anos?
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value || ""}
                                  className="flex flex-row space-x-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="sim" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Sim
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="nao" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Não
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="campo5"
                          render={({ field }) => (
                            <FormItem className="py-2">
                              <FormLabel>
                                5. Você é funcionário público?
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value || ""}
                                  className="flex flex-row space-x-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="sim" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Sim
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="nao" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Não
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="campo6"
                        render={({ field }) => (
                          <FormItem className="py-2">
                            <FormLabel>
                              6. Podem participar do PNCF: Trabalhadores rurais
                              não-proprietários, preferencialmente assalariados,
                              parceiros, posseiros e arrendatários. Ou
                              agricultores proprietários de imóveis cuja área
                              não alcance a dimensão da propriedade familiar.
                              (320 hectares, ou 66,1 alqueires para grande parte
                              do Tocantins). Você se enquadra nessas condições?
                            </FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={(value) => {
                                  field.onChange(value);
                                }}
                                value={field.value || ""}
                                className="flex flex-row space-x-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="sim" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Sim
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="nao" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    Não
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="campo7"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              7. O PNCF é dividido em 4 linhas, considerando
                              renda anual e patrimônio, selecione em qual das
                              linhas você se enquadra.
                            </FormLabel>
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
                                <SelectItem value="PNCF - Social">
                                  PNCF - Social (Renda Anual de até R$ 27.775,99
                                  e Patrimônio de até R$ 70 mil).
                                </SelectItem>
                                <SelectItem value="PNCF - Mais">
                                  PNCF - Mais (Renda Anual de até R$ 55.551,98 e
                                  Patrimônio de até R$ 140 mil).
                                </SelectItem>
                                <SelectItem value="PNCF - Jovem Terra da Juventude">
                                  PNCF - Jovem Terra da Juventude (Renda Anual
                                  de até R$ 55.551,98 e Patrimônio de até R$ 140
                                  mil).
                                </SelectItem>
                                <SelectItem value="PNCF - Empreendedor">
                                  PNCF - Empreendedor (Renda Anual de até R$
                                  299.890,63 e Patrimônio de até R$ 500 mil).
                                </SelectItem>
                                <SelectItem value="renda-acima">
                                  Tenho renda anual acima de R$ 299,890,63 - Não
                                  me enquadro em nenhuma das opções.
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription></FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1">
                        <FormField
                          control={form.control}
                          name="campo8"
                          render={({ field }) => (
                            <FormItem className="py-2">
                              <FormLabel>
                                8. Você já foi assentado da reforma agrária, ou
                                participou de algum programa que tenha recursos
                                do Fundo de Terras da Reforma Agrária?
                              </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                  }}
                                  value={field.value || ""}
                                  className="flex flex-row space-x-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="sim" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Sim
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="nao" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Não
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="campo9"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">
                                9. Marque quais dos documentos listados abaixo
                                você possui ou já possuiu nos últimos 15 anos
                                que seja possÍvel localizar e contabilizar pelo
                                menos 5 anos (pode marcar mais de 1, deixe em
                                branco caso possua nenhum)
                              </FormLabel>
                            </div>
                            {docs.map((doc) => (
                              <FormField
                                key={doc.id}
                                control={form.control}
                                name={`docs.${doc.id}`}
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={doc.id}
                                      className="flex flex-row items-start space-x-3 space-y-2"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          className="mt-3"
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal leading-2">
                                        {doc.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <DialogFooter className="pt-12">
                    <Button onClick={onSubmit}>
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
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
