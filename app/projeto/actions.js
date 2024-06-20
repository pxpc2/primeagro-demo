"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

/**
 * Buscar todos os dados do projeto do usuário em questão antes de abrir /projeto.
 * RLS configurado para retornar somente os seus dados, exceto se for usuário gerente/técnico.
 */
export async function getProjetoFormsData() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // fazer um loop por cada tabela de aba
  const formData = {};

  let { data: aba_preanalise, err } = await supabase
    .from("aba_preanalise")
    .select("*");
  formData.aba_preanalise = aba_preanalise;

  return formData;
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
