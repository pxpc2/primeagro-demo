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
import { useEffect, useState } from "react";
import Heading from "./Header";
import { submitPreAnaliseForm } from "@/app/projeto/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const getFieldNameByNumber = (number) => {
  const fieldNames = {
    1: "protocoloObterCredito",
    2: "dataProtocolo",
    3: "municipioImovel",
    4: "nomeImovel",
    5: "areaTotalImovel",
    6: "valorTotalImovel",
    7: "areaSerAdquirida",
    8: "linhaPNCF",
    9: "candidato",
    10: "nomeSocial",
    11: "dataNascimento",
    12: "tempoExerc",
    13: "rendaFamiliarAnual",
    14: "patrimonio",
    15: "numeroDoLote",
    16: "numeroTotalLotes",
    17: "radioGroupJaFoiBeneficiario",
    18: "radioGroupServidorPublico",
    19: "radioGroupIndigena",
    20: "idadeProtocoloObterCredito",
    21: "agenteFinanceiro",
    22: "agenciaInteresse",
  };
  return fieldNames[number];
};

const parseFormData = (defaultValues) => {
  const transformed = {};
  for (const key in defaultValues) {
    if (key.startsWith("campo_")) {
      const numberPart = key.split("_")[1];
      const formFieldKey = `${numberPart}-${getFieldNameByNumber(numberPart)}`;
      transformed[formFieldKey] = defaultValues[key];
    }
  }
  return transformed;
};

export default function PreAnaliseTab({ defaultValues }) {
  const [formsDisabled, setFormsDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const parsed = parseFormData(defaultValues[0]);
  const [text17, setText17] = useState(
    parsed["17-radioGroupJaFoiBeneficiario"] === "nao"
      ? "Preenche o requisito"
      : "Não preenche o requisito"
  );
  const [text18, setText18] = useState(
    parsed["18-radioGroupServidorPublico"] === "nao"
      ? "Preenche o requisito"
      : "Não preenche o requisito"
  );
  const [text19, setText19] = useState(
    parsed["19-radioGroupIndigena"] === "nao"
      ? "Preenche o requisito"
      : "Não preenche o requisito"
  );
  const form = useForm({
    defaultValues: parsed,
  });

  const handleRadioChange = (value, setText) => {
    if (value === "nao") {
      setText("Preenche o requisito");
    } else if (value === "sim") {
      setText("Não preenche o requisito");
    }
  };

  useEffect(() => {
    if (defaultValues) {
      const parsed = parseFormData(defaultValues[0]);
      form.reset(parsed);
      setText17(
        parsed["17-radioGroupJaFoiBeneficiario"] === "nao"
          ? "Preenche o requisito"
          : parsed["17-radioGroupJaFoiBeneficiario"] === "sim"
          ? "Não preenche o requisito"
          : ""
      );
      setText18(
        parsed["18-radioGroupServidorPublico"] === "nao"
          ? "Preenche o requisito"
          : parsed["18-radioGroupServidorPublico"] === "sim"
          ? "Não preenche o requisito"
          : ""
      );
      setText19(
        parsed["19-radioGroupIndigena"] === "nao"
          ? "Preenche o requisito"
          : parsed["19-radioGroupIndigena"] === "sim"
          ? "Não preenche o requisito"
          : ""
      );
    }
  }, [defaultValues, form]);

  const onEdit = () => setFormsDisabled(false);
  const onSave = () => {
    setLoading(true);
    form.handleSubmit(async (data) => {
      await submitPreAnaliseForm({ formData: data });
      setFormsDisabled(true);
      setLoading(false);
    })();
  };
  const handleCancel = () => {
    setFormsDisabled(true);
  };
  return (
    <div className="p-4 bg-white">
      <Heading
        tabName={"Pré Análise"}
        onEdit={onEdit}
        onSave={onSave}
        isEditing={!formsDisabled}
        isLoading={loading}
        onCancel={handleCancel}
      />
      <div className=" w-full flex flex-row justify-evenly">
        <div className="w-full p-4  gap-4">
          <div className="p-4 bg-gray-50 shadow-sm">
            <InformacoesIniciaisForm form={form} formDisabled={formsDisabled} />
          </div>
        </div>
        <div className="w-full  p-4 gap-4">
          <div className="p-4 bg-gray-50 h-full shadow-sm">
            <PreAnaliseForm
              form={form}
              formDisabled={formsDisabled}
              text17={text17}
              text18={text18}
              text19={text19}
              setText17={setText17}
              setText18={setText18}
              setText19={setText19}
              handleRadioChange={handleRadioChange}
            />
          </div>
        </div>
      </div>
      <div className="p-4 m-4 bg-gray-50 shadow-md border">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Data de elaboração</TableHead>
              <TableHead className="text-black">CREA/CFTA</TableHead>
              <TableHead className="text-black">
                Engenheiro responsável
              </TableHead>
              <TableHead className="text-black">Entidade de ATER</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">
                Contato do(a) técnico(a) responsável
              </TableHead>
              <TableHead className="text-black">
                E-mail do responsável
              </TableHead>
              <TableHead className="text-black">
                Data de validade do certificado CET
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
              <TableCell>
                <Input disabled={formsDisabled} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
                  {...field}
                  disabled={formDisabled}
                  value={field.value || ""}
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
                  <Input
                    type="date"
                    {...field}
                    disabled={formDisabled}
                    value={field.value || ""}
                  />
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
                        <SelectValue />
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
                    disabled
                    value={field.value || ""}
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
                  {...field}
                  disabled={formDisabled}
                  value={field.value || ""}
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
                    disabled={formDisabled}
                    value={field.value || ""}
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
                    disabled={formDisabled}
                    value={field.value || ""}
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
                    disabled={formDisabled}
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                  {...field}
                  disabled={formDisabled}
                  value={field.value || ""}
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
                <Input
                  type="text"
                  {...field}
                  disabled={formDisabled}
                  value={field.value || ""}
                />
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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
                    value={field.value || ""}
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

function PreAnaliseForm({
  formDisabled,
  form,
  text17,
  text18,
  text19,
  handleRadioChange,
  setText17,
  setText18,
  setText19,
}) {
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
            name="qtdFmpAdquirida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qtd. FMP da área a ser adquirida</FormLabel>
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
                      handleRadioChange(value, setText17);
                    }}
                    className="flex flex-row space-x-1"
                    disabled={formDisabled}
                    value={field.value || ""}
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
              text17 === "Preenche o requisito"
                ? "outline"
                : text17 === ""
                ? "ghost"
                : "destructive"
            }
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
                      handleRadioChange(value, setText18);
                    }}
                    disabled={formDisabled}
                    value={field.value || ""}
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
              text18 === "Preenche o requisito"
                ? "outline"
                : text18 === ""
                ? "ghost"
                : "destructive"
            }
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
                      handleRadioChange(value, setText19);
                    }}
                    value={field.value || ""}
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
              text19 === "Preenche o requisito"
                ? "outline"
                : text19 === ""
                ? "ghost"
                : "destructive"
            }
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
                    {...field}
                    disabled={formDisabled}
                    className="col-span-1"
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button variant={"outline"} disabled>
            Preenche o requisito
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
                    disabled={formDisabled}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
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
                    disabled={formDisabled}
                    value={field.value || ""}
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
