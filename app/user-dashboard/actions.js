"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function completeProfile(formData) {
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

  const { error } = await supabase.from("cliente").insert(clienteData);
  if (error) {
    return redirect("/error?message=" + error.message);
  }
  return redirect("/user-dashboard");
}
