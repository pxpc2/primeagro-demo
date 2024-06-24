"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function completeProfile(
  formValues,
  aprovadoStatus,
  authuser_id,
  user_email
) {
  const clienteData = {};

  Object.entries(formValues).forEach(([key, value]) => {
    if (key === "primeiroNome") {
      clienteData["primeiro_nome"] = value;
    } else if (key === "orgaoExpedidor") {
      clienteData["orgao_expedidor"] = value;
    } else if (key === "estadoCivil") {
      clienteData["estado_civil"] = value;
    } else if (key === "enderecoLinha") {
      clienteData["endereco"] = value;
    } else {
      if (!key.startsWith("campo") && key !== "docs") clienteData[key] = value;
    }
  });

  clienteData["authuser_id"] = authuser_id;
  clienteData["email"] = user_email;
  clienteData["status_enquadramento"] = aprovadoStatus;
  clienteData["status_pagamento"] = false;
  clienteData["status_documentos"] = false;

  const supabase = createClient();
  const { error } = await supabase.from("clientes").insert(clienteData);
  if (error) {
    return redirect("/error?message=" + error.message);
  }
  return redirect("/user-dashboard");
}

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

  const fullData = {};
  const enquadramentoValues = {};
  const erradas = [];
  let aprovadoStatus = true;

  Object.entries(formData).forEach(([key, value]) => {
    fullData[key] = value;
    let docs = [],
      i = 0;
    if (key.startsWith("campo")) enquadramentoValues[key] = value;
    if (key === "campo3" && value === "nao") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo4" && value === "nao") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo7" && value === "renda-acima") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo5" && value === "sim") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "campo8" && value === "sim") {
      aprovadoStatus = false;
      erradas.push(key);
    } else if (key === "docs") {
      let flag = false;
      Object.entries(formData[key]).forEach(([k, v]) => {
        if (v) {
          flag = true;
          docs[i++] = k;
        }
      });
      if (!flag) {
        erradas.push(key);
        aprovadoStatus = false;
      }
      enquadramentoValues["docs"] = docs;
    }
  });
  enquadramentoValues["authuser_id"] = user.id;
  enquadramentoValues["erradas"] = erradas;

  const { error } = await supabase
    .from("enquadramento_forms")
    .insert(enquadramentoValues);
  if (error) {
    return redirect("/error?message=" + error.message);
  }

  return await completeProfile(fullData, aprovadoStatus, user.id, user.email);
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
  data.forEach((doc) => {
    nomesExistentes.push(doc.name);
  });
  return nomesExistentes;
}
