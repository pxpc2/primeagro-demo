"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 *
 * @todo deve buscar todos os dados obrigatórios que já tenha no banco (por ex: dados básicos)
 *
 * Buscar todos os dados do projeto do usuário em questão antes de abrir /projeto.
 * RLS configurado para retornar somente os seus dados, exceto se for usuário gerente/técnico.
 */
export async function getProjetoFormsData() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const formData = {};

  formData.aba_preanalise = await getPreAnalise();
  formData.aba_identificacao_beneficiario =
    await getIdentificacaoBeneficiario();
  formData.aba_inventario = {};
  formData.aba_inventario.benfeitoriasImovel =
    await getInventarioBenfeitoriasImovel();

  formData.aba_dadosImovel = {};

  return formData;
}

async function getIdentificacaoBeneficiario() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  let { data: aba_identificacao_beneficiario, err } = await supabase
    .from("aba_identificacao_beneficiario")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  if (aba_identificacao_beneficiario.length === 0) {
    let { data: cl, err } = await supabase
      .from("clientes")
      .select()
      .eq("authuser_id", user.id);
    const dadosCliente = cl[0];
    const dadosClienteParsed = {
      campo1: `${dadosCliente.primeiro_nome} ${dadosCliente.sobrenome}`,
      campo2: dadosCliente.cpf,
      campo3: dadosCliente.rg,
      campo4: dadosCliente.orgao_expedidor,
      campo6: dadosCliente.genero,
      campo7: dadosCliente.etnia,
      campo8: dadosCliente.estado_civil,
      campo9: dadosCliente.naturalidade,
      campo10: dadosCliente.endereco,
      campo11: dadosCliente.cep,
      campo13: dadosCliente.bairro,
      campo14: dadosCliente.uf,
      campo16: dadosCliente.telefone,
      campo17: dadosCliente.email,
    };
    return dadosClienteParsed;
  } else {
    return aba_identificacao_beneficiario;
  }
}

async function getPreAnalise() {
  const supabase = createClient();
  let { data: aba_preanalise, err } = await supabase
    .from("aba_preanalise")
    .select("*");
  return aba_preanalise;
}

async function getInventarioBenfeitoriasImovel() {
  const supabase = createClient();
  let { data: aba_inventario_benfeitoriasImovel, err } = await supabase
    .from("aba_inventario_benfeitoriasImovel")
    .select("*");
  if (err) {
    console.log(err);
    return undefined;
  }
  return aba_inventario_benfeitoriasImovel;
}

export async function submitPreAnaliseForm({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUserID = user.id;
  const mappedData = {};

  Object.entries(formData).forEach(([key, value]) => {
    const match = key.match(/^(\d+)-/);
    if (match && value !== undefined) {
      const newKey = `campo_${match[1]}`;
      mappedData[newKey] = value;
    } else if (value !== undefined) {
      mappedData[key] = value;
    }
  });
  const { error } = await supabase
    .from("aba_preanalise")
    .upsert([{ ...mappedData, authuser_id: authUserID }], {
      onConflict: ["authuser_id"],
    });
  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function submitIdentificacaoBeneficiarioForm({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const authUserID = user.id;

  const { error } = await supabase
    .from("aba_identificacao_beneficiario")
    .upsert([{ ...formData, authuser_id: authUserID }], {
      onConflict: ["authuser_id"],
    });
  if (error) {
    return redirect("/error?message=" + error.message);
  }
}

export async function submitDadosImovelForm({ formData }) {
  console.log(formData);
}

export async function submitBenfeitoriaImovel({ tableData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authUserID = user.id;

  // separar novos de antigos (com ou sem ID)
  const newEntries = tableData.filter((entry) => !entry.id);
  const existingEntries = tableData.filter((entry) => entry.id);

  const newEntriesWithAuthUser = newEntries.map((entry) => ({
    ...entry,
    authuser_id: authUserID,
  }));

  // update existentes
  if (existingEntries.length > 0) {
    let { error } = await supabase
      .from("aba_inventario_benfeitoriasImovel")
      .upsert(existingEntries, { onConflict: ["id"] });
    if (error) {
      console.log(error);
      return redirect("/error?message=" + error.message);
    }
  }

  // inserir novos
  if (newEntriesWithAuthUser.length > 0) {
    let { error } = await supabase
      .from("aba_inventario_benfeitoriasImovel")
      .insert(newEntriesWithAuthUser);
    if (error) {
      console.log(error);
      return redirect("/error?message=" + error.message);
    }
  }
}
