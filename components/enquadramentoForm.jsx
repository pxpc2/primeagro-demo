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

export default function EnquadramentoForm({ authID, onClose, msg }) {
  /* se chegou até aqui, é porque a conta está cadastrada E logada, MAS os dados básicos
   do perfil ainda não foram preenchidos */
  const form = useForm();
  return (
    <div className="fixed inset-x-0 inset-y-0 w-full bg-gray-50 bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full h-full flex items-center justify-center ">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white  shadow-2xl p-8 sm:p-16  h-full overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 gap-4 flex flex-col">
            <h1 className="text-2xl font-bold">Formulário de Enquadramento</h1>
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
                                  </SelectItem>
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
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
                          name="rg"
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
                      <div className="grid grid-cols-5 gap-4 pb-8">
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
                          name="municipio"
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <FormLabel>Município</FormLabel>
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
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
                          name="uf"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>UF</FormLabel>
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
                                  <SelectItem value="banco-do-brasil">
                                    Banco do Brasil
                                  </SelectItem>
                                  <SelectItem value="caixa-economica">
                                    Caixa Econômica Federal
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
                    <div className="pt-8">fields do pncf</div>
                  </div>
                  <DialogFooter className="pt-12">
                    <SubmitButton>Enviar</SubmitButton>
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
