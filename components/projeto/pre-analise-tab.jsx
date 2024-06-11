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
        <div className="p-4 bg-gray-50">
          <InformacoesIniciaisForm />
        </div>
      </div>
      <div className="w-full h-full p-4 gap-4">
        <div className="p-4 bg-gray-50">
          <PreAnaliseForm />
        </div>
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
          name="1-protocoloObterCredito"
          render={({ field }) => (
            <FormItem>
              <FormLabel>1. Número Protocolo Obter Crédito</FormLabel>
              <FormControl>
                <Input type="text" placeholder="15337531" {...field} />
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
                  <Input type="date" {...field} />
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
            name="4-codigoIBGE"
            render={({ field }) => (
              <FormItem>
                <FormLabel>4. Código IBGE</FormLabel>
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
          name="5-nomeImovel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>5. Nome do imóvel</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Boa Vista" {...field} />
              </FormControl>
              <FormDescription>Nome de documentação do imóvel.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="6-areaTotalImovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>6. Área total (ha)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="19.3932" />
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
            name="7-valorTotalImovel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>7. Valor total do imóvel (R$)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="500,000.00" />
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
            name="8-areaSerAdquirida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>8. Área a ser adquirida (ha)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="9.6966" />
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
            name="9-linhaPNCF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>9. Linha de financiamento</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="PNCF SOCIAL" />
                </FormControl>
                <FormDescription>Linha de crédito do PNCF.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="10-candidato"
          render={({ field }) => (
            <FormItem>
              <FormLabel>10. Nome candidato(a)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="ZACARIAS ENZO FERRARI DE LIMA"
                  {...field}
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
          name="11-nomeSocial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>11. Nome social</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>Nome social do beneficiário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="12-dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>12. Data de nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} placeholder="9.6966" />
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
            name="13-tempoExerc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  13. Tempo de exerc. na ativ. agropecuária (ano)
                </FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="5" />
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
            name="14-rendaFamiliarAnual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>14. Renda familiar anual (R$)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="8,560.00" />
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
            name="15-patrimonio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>15. Patrimônio</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="25,000.00" />
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
            name="16-numeroDoLote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>16. Número do lote a ser adquirido</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="1" />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="17-numeroTotalLotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>17. Número total de lotes do imóvel</FormLabel>
                <FormControl>
                  <Input type="text" {...field} placeholder="2" />
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

function PreAnaliseForm() {
  const form = useForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="18-qtdModFiscais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>18. Qtd. de mód. fiscais do imóvel</FormLabel>
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
            name="19-qtdModFiscais"
            render={({ field }) => (
              <FormItem>
                <FormLabel>19. Qtd. FMP da área a ser adquirida</FormLabel>
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
