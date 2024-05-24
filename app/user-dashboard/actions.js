"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function completeProfile(formData) {
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

  await completeProfile(formData);

  formData.forEach((value, key) => {
    if (key.startsWith("8-doc")) {
      const checkboxNumber = key.replace("8-doc", "");
      if (value === "on") {
        if (checkboxNumber === "18") {
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

  const { error } = await supabase
    .from("enquadramento_forms")
    .insert(formValues);
  if (error) {
    return redirect("/error?message=" + error.message);
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
  const supabase = createClient();
  let { data: user_roles, error } = await supabase
    .from("user_roles")
    .select("*")
    // Filters
    .eq("user_id", id);
  console.log(user_roles);
  return user_roles;
}
