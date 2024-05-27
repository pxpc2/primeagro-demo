"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function completeProfile(formData, enquadramentoStatus) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const clienteData = {
    primeiro_nome: formData.get("first-name"),
    ultimo_nome: formData.get("last-name"),
    estado: formData.get("state"),
    cidade: formData.get("city"),
    codigo_postal: formData.get("postal-code"),
    authuser_id: user.id,
    email: user.email,
    endereco: formData.get("street-address"),
    status_enquadramento: enquadramentoStatus,
    status_documentos: false,
    status_pagamento: false,
  };

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
export async function submitEnquadramentoForm(formData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const formValues = {};
  const checkboxValues = [];

  // definir status com base nos formValues
  let aprovadoStatus = true;

  formData.forEach((value, key) => {
    if (key.startsWith("8-doc")) {
      const checkboxNumber = key.replace("8-doc", "");
      if (value === "on") {
        if (checkboxNumber === "18") {
          aprovadoStatus = false;
          checkboxValues.push("nenhum_documento");
        } else {
          checkboxValues.push(`documento${checkboxNumber}`);
        }
      }
    } else if (!isNaN(parseInt(key[0]))) {
      formValues[key] = value;
    }
  });
  formValues["8"] = checkboxValues;
  formValues["authuser_id"] = user.id;

  for (let key in formValues) {
    if (!aprovadoStatus) break;
    if (key === "3" && formValues[key] === "Nao") {
      aprovadoStatus = false;
    } else if (key === "4" && formValues[key] === "Nao") {
      aprovadoStatus = false;
    } else if (
      key === "5" &&
      formValues[key] === "renda anual acima de R$ 299,890,63"
    ) {
      aprovadoStatus = false;
    } else if (key === "6" && formValues[key] === "Sim") {
      aprovadoStatus = false;
    } else if (key === "7" && formValues[key] === "Sim") {
      aprovadoStatus = false;
    }
  }

  formValues["aprovado"] = aprovadoStatus;

  const { error } = await supabase
    .from("enquadramento_forms")
    .insert(formValues);
  if (error) {
    return redirect("/error?message=" + error.message);
  }

  return await completeProfile(formData, aprovadoStatus);
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
