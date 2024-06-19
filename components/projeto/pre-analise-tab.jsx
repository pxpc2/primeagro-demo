"use client";

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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useState } from "react";
import Heading from "./Header";

export default function PreAnaliseTab() {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const form = useForm();

  const onEdit = () => setFormsDisabled(false);

  const onSave = () => {
    form.handleSubmit((data) => {
      console.log(data); // Later you can send this to the database
      setFormsDisabled(true);
    })();
  };
  return (
    <div className="p-4">
      <Heading
        tabName={"Pré Análise"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
      />
      <div className=" w-full flex flex-row justify-evenly">
        <div className="w-full py-4  gap-4">
          <div className="p-4 bg-gray-50">
            <InformacoesIniciaisForm form={form} formDisabled={formsDisabled} />
          </div>
        </div>
        <div className="w-full  p-4 gap-4">
          <div className="p-4 bg-gray-50">
            <PreAnaliseForm form={form} formDisabled={formsDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InformacoesIniciaisForm({ formDisabled, form }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="1-protocoloObterCredito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Número Protocolo Obter Crédito</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="15337531"
                  {...field}
                  disabled={formDisabled}
                />
              </FormControl>
              <FormDescription>Número do protocolo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="2-dataProtocolo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>2. Data do protocolo</FormLabel>
                <FormControl>
                  <Input type="date" {...field} disabled={formDisabled} />
                </FormControl>
                <FormDescription>Data de início do protocolo.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="3-municipioImovel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. Município do imóvel</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={formDisabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar município" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="campo_dos_goytacazes-rj">
                        Campo dos Goytacazes / RJ
                      </SelectItem>
                      <SelectItem value="campos_gerais-mg">
                        Campos Gerais / MG
                      </SelectItem>
                      <SelectItem value="varginha-mg">Varginha / MG</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Município aonde está localizado o imóvel.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="codigoIBGE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código IBGE</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="1100122"
                    disabled
                  />
                </FormControl>
                <FormDescription>Código IBGE do município.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="4-nomeImovel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>4. Nome do imóvel</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Boa Vista"
                  {...field}
                  disabled={formDisabled}
                />
              </FormControl>
              <FormDescription>Nome de documentação do imóvel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="5-areaTotalImovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>5. Área total (ha)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="19.3932"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Área total do imóvel, em hectares.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="6-valorTotalImovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6. Valor total do imóvel (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="500,000.00"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Valor total do imóvel, em reais.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="7-areaSerAdquirida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>7. Área a ser adquirida (ha)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="9.6966"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Área total a ser adquirida, em hectares.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="8-linhaPNCF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>8. Linha de financiamento</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="PNCF SOCIAL"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>Linha de crédito do PNCF.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="9-candidato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>9. Nome candidato(a)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="ZACARIAS ENZO FERRARI DE LIMA"
                  {...field}
                  disabled={formDisabled}
                />
              </FormControl>
              <FormDescription>
                Nome de documentação do beneficiário.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="10-nomeSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>10. Nome social</FormLabel>
              <FormControl>
                <Input type="text" {...field} disabled={formDisabled} />
              </FormControl>
              <FormDescription>Nome social do beneficiário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="11-dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>11. Data de nascimento</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    placeholder="9.6966"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Data de nascimento do beneficiário.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="12-tempoExerc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  12. Tempo de exerc. na ativ. agropecuária (ano)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="5"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Tempo em que o beneficiário exerce atividade(s)
                  agropecuária(s).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="13-rendaFamiliarAnual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>13. Renda familiar anual (R$)</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="8,560.00"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Renda familiar anual do beneficiário, em reais.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="14-patrimonio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>14. Patrimônio</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="25,000.00"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription>
                  Patrimônio total do beneficiário, em reais.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="15-numeroDoLote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>15. Número do lote a ser adquirido</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="1"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="16-numeroTotalLotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>16. Número total de lotes do imóvel</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="2"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="hidden">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}

function PreAnaliseForm({ formDisabled, form }) {
  const [text17, setText17] = useState("Preenche o requisito");
  const handleRadio17Change = (value) => {
    if (value === "nao") {
      setText17("Preenche o requisito");
    } else if (value === "sim") {
      setText17("Não preenche o requisito");
    }
  };
  const [text18, setText18] = useState("Preenche o requisito");
  const handleRadio18Change = (value) => {
    if (value === "nao") {
      setText18("Preenche o requisito");
    } else if (value === "sim") {
      setText18("Não preenche o requisito");
    }
  };
  const [text19, setText19] = useState("Preenche o requisito");
  const handleRadio19Change = (value) => {
    if (value === "nao") {
      setText19("Preenche o requisito");
    } else if (value === "sim") {
      setText19("Não preenche o requisito");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="qtdModFiscais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. de mód. fiscais do imóvel</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="0.323" {...field} disabled />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="qtdFmpAdquirida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. FMP da área a ser adquirida</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Acima da fração mínima do parcelamento"
                    {...field}
                    disabled
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
          name="limiteModFiscais"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Limite de 4 mod. Fiscais para a ser área adquirida
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Sem impedimento - Área a ser adquirida abaixo de 4 módulos fiscais"
                  {...field}
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
          name="valorTotalImovelRelTetoPNCF"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Valor total do imóvel em relação ao teto de R$ 4.500.000,00 do
                PNCF
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Elaborar o Laudo de Avaliação na modalidade simples"
                  {...field}
                  disabled
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-20 align-middle items-center justify-between ">
          <FormField
            control={form.control}
            name="17-radioGroupJaFoiBeneficiario"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  17. O candidato ou conjuge/companheira(o) já foi (foram)
                  beneficiário(s) do PNCF ou de projeto de Reforma Agrária?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRadio17Change(value);
                    }}
                    defaultValue="nao"
                    className="flex flex-row space-x-1"
                    disabled={formDisabled}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={
              text17 === "Preenche o requisito" ? "outline" : "destructive"
            }
            disabled
          >
            {text17}
          </Button>
        </div>
        <div className="flex flex-row space-x-20 align-middle items-center justify-between ">
          <FormField
            control={form.control}
            name="18-radioGroupServidorPublico"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  18. O candidato ou conjuge/companheira(o) exerce cargo
                  eletivo/servidor público?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRadio18Change(value);
                    }}
                    defaultValue="nao"
                    disabled={formDisabled}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={
              text18 === "Preenche o requisito" ? "outline" : "destructive"
            }
            disabled
          >
            {text18}
          </Button>
        </div>
        <div className="flex flex-row space-x-20 align-middle items-center justify-between ">
          <FormField
            control={form.control}
            name="19-radioGroupIndigena"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  19. O imóvel é confinante com terra indígena ou território
                  quilombola?
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleRadio19Change(value);
                    }}
                    defaultValue="nao"
                    disabled={formDisabled}
                    className="flex flex-row space-x-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="sim" />
                      </FormControl>
                      <FormLabel className="font-normal">Sim</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="nao" />
                      </FormControl>
                      <FormLabel className="font-normal">Não</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={
              text19 === "Preenche o requisito" ? "outline" : "destructive"
            }
            disabled
          >
            {text19}
          </Button>
        </div>
        <div className="flex flex-row space-x-20 justify-between">
          <FormField
            control={form.control}
            name="rendaFamiliarCompativel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  O candidato tem a renda familiar anual compatível com a linha
                  de financiamento?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={text19 === "Preenche o requisito" ? "outline" : "outline"}
            disabled
          >
            Renda de acesso ao PNCF SOCIAL
          </Button>
        </div>
        <div className="flex flex-row space-x-20 justify-between">
          <FormField
            control={form.control}
            name="patrimonioCompativel"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>
                  O candidato tem patrimônio compatível com a linha de
                  financiamento?
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={text19 === "Preenche o requisito" ? "outline" : "outline"}
            disabled
          >
            Patrimônio de acesso ao PNCF SOCIAL
          </Button>
        </div>
        <div className="flex flex-row space-x-20 align-middle items-center justify-between ">
          <FormField
            control={form.control}
            name="20-idadeProtocoloObterCredito"
            render={({ field }) => (
              <FormItem className="grid grid-row-4 items-center">
                <FormLabel className="col-span-3">
                  20. Idade na data do protocolo no Obter Crédito? (em anos)
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="32"
                    {...field}
                    disabled
                    className="col-span-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={
              text18 === "Preenche o requisito" ? "outline" : "destructive"
            }
            disabled
          >
            {text18}
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <FormField
              control={form.control}
              name="21-agenteFinanceiro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>21. Agente Financeiro</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={formDisabled}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Banco do Brasil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="banco-do-brasil">
                        Banco do Brasil
                      </SelectItem>
                      <SelectItem value="caixa-economica">
                        Caixa Econômica Federal
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    * Esta pré-analise não dispensa as analises Estadual e
                    Federal no SITEMA OBTER CRÉDITO e a análise no Agente
                    Financeiro
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="22-agenciaInteresse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>22. Agência de interesse</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="1100122"
                    disabled={formDisabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
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
