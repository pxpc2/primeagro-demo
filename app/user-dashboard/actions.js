"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Cria uma nova entrada na tabela dos formulários de enquadramento relacionada a um authuser_id
 *
 * @param {*} formData dados do formulário
 * @returns redirecionamento p/ dashboard com msg
 */
export async function submitEnquadramentoForm({ formData }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let { data: cliente, err } = await supabase
    .from("clientes")
    .select("*")
    .eq("authuser_id", user.id);

  const dadosEnquadramento = {
    campo1: formData.campo1,
    campo2: formData.campo2,
    campo3: formData.campo3,
    campo4: formData.campo4,
    campo5: formData.campo5,
    campo6: formData.campo6,
    campo7: formData.campo7,
    campo8: formData.campo8,
    docs: formData.docs,
    cliente_id: cliente[0].id,
  };

  const enquadramentoValues = { ...dadosEnquadramento };
  const erradas = [];
  let aprovadoStatus = true;

  Object.entries(dadosEnquadramento).forEach(([key, value]) => {
    if (key === "campo3" && value === "Não") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo4" && value === "Não") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo5" && value === "Sim") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (
      key === "campo7" &&
      value ===
        "Tenho renda anual acima de R$ 299,890,63 - Não me enquadro em nenhuma das opções."
    ) {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo8" && value === "Sim") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo6" && value === "Não") {
      aprovadoStatus = false;
      erradas.push(key);
    }
  });

  if (!Object.values(dadosEnquadramento.docs).some((doc) => doc)) {
    erradas.push("docs");
    aprovadoStatus = false;
  }

  enquadramentoValues["docs"] = Object.entries(dadosEnquadramento.docs)
    .filter(([k, v]) => v)
    .map(([k, v]) => k);

  enquadramentoValues["authuser_id"] = user.id;
  enquadramentoValues["erradas"] = erradas;

  const { error } = await supabase
    .from("enquadramento_forms")
    .insert(enquadramentoValues);
  if (error) {
    return redirect("/error?message=" + error.message);
  } else {
    if (enquadramentoValues.erradas.length > 0) {
    }
    return redirect("/user-dashboard");
  }
}

export async function getAllClients() {
  const supabase = createClient();
  let { data: clientes, error } = await supabase.from("clientes").select("*");
  return clientes;
}

export async function submitProfileForm({ dados }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const dadosBasicos = {
    nome_completo: dados.nome_completo,
    cpf: dados.cpf,
    rg: dados.rg,
    orgaoExpedidor: dados.orgaoExpedidor,
    genero: dados.genero,
    etnia: dados.etnia,
    estadoCivil: dados.estadoCivil,
    naturalidade: dados.naturalidade,
    telefone: dados.telefone,
    enderecoLinha: dados.enderecoLinha,
    bairro: dados.bairro,
    uf: dados.uf,
  };

  return await completeProfile(dadosBasicos, undefined, user.id, user.email);
}

export async function completeProfile(
  dadosBasicos,
  aprovadoStatus,
  authuser_id,
  user_email
) {
  const clienteData = {
    nome_completo: dadosBasicos.nome_completo,
    cpf: dadosBasicos.cpf,
    rg: dadosBasicos.rg,
    orgao_expedidor: dadosBasicos.orgaoExpedidor,
    genero: dadosBasicos.genero,
    etnia: dadosBasicos.etnia,
    estado_civil: dadosBasicos.estadoCivil,
    naturalidade: dadosBasicos.naturalidade,
    telefone: dadosBasicos.telefone,
    endereco: dadosBasicos.enderecoLinha,
    bairro: dadosBasicos.bairro,
    uf: dadosBasicos.uf,
    authuser_id: authuser_id,
    email: user_email,
    status_enquadramento: aprovadoStatus,
    status_pagamento: false,
    status_documentos: false,
  };

  const supabase = createClient();
  const { error } = await supabase.from("clientes").insert(clienteData);
  if (error) {
    return redirect("/error?message=" + error.message);
  }
  return redirect("/user-dashboard");
}

export async function deleteEnquadramento() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase
    .from("enquadramento_forms")
    .delete()
    .eq("authuser_id", user.id);
  if (error) {
    console.log(error);
    return false;
  }

  return redirect("/user-dashboard");
}

/**
 * se for usuario admin, vai retornar todas.
 * se for usuario normal, vai retornar só a sua própria.
 */
export async function getAplicacoes() {
  const supabase = createClient();
  let { data: aplicacoes, error } = await supabase
    .from("aplicacoes")
    .select("*");
  return aplicacoes;
}

export async function getUserRole(id) {
  console.log("user id: " + id);
  const supabase = createClient();
  let { data: user_roles, error } = await supabase
    .from("user_roles")
    .select("*")
    // Filters
    .eq("user_id", id);
  console.log(user_roles);
  return user_roles;
}

export async function getDadosEnquadramentoForm() {
  const supabase = createClient();
  let { data: dados, error } = await supabase
    .from("enquadramento_forms")
    .select("*");
  return dados;
}

/**
 * @todo função a ser chamada para VERIFICAR DOCUMENTOS do cliente
 *  e atribuir status aos documentos na lista de constantes com base nisso
 */
export async function getDocuments(authuser_id) {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("Documentos")
    .list(authuser_id);
  if (error) {
    return redirect("/error?message=" + error.message);
  }
  let nomesExistentes = [];
  data.forEach(async (doc) => {
    nomesExistentes.push(doc.name);
  });
  return nomesExistentes;
}

export async function downloadDoc(authuser_id, docName) {
  const supabase = createClient();
  const docPath = `${authuser_id}/${docName}`;

  const { data, error } = await supabase.storage
    .from("Documentos")
    .createSignedUrl(docPath, 60); // signed url válida por 60 seg

  if (error) {
    throw new Error("Erro ao gerar URL de download de PDF: " + error.message);
  }

  return data.signedUrl;
}

export async function deleteDoc(authuser_id, docName) {
  const supabase = createClient();
  const docPath = `${authuser_id}/${docName}`;

  const { error } = await supabase.storage.from("Documentos").remove([docPath]);

  if (error) {
    throw new Error("Erro ao deletar o documento: " + error.message);
  }

  return true;
}
