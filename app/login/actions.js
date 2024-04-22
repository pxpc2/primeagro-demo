"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export async function signIn(formData) {
  const supabase = createClient();

  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    return redirect(
      `/login?message=${
        error.message === "Email not confirmed"
          ? "Por favor, verifique seu email para completar o registro."
          : "Credenciais inválidas. Por favor verifique o email e a senha."
      }`
    );
  }
  revalidatePath("/", "layout");
  return redirect("/user-dashboard");
}

export async function signUp(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    /*redirect(
      "/login?message=Falha ao cadastrar usuário. Por favor, tente novamente ou entre em contato."
    );*/
    redirect("/error?message=" + error.message);
  }

  /*const clienteData = {
    firstName: formData.get("first-name"),
    lastName: formData.get("last-name"),
    email: formData.get("email"),
    state: formData.get("state"),
    address: formData.get("street-address"),
    city: formData.get("city"),
    postalCode: formData.get("postal-code"),
    authuser_id: data.user.id,
  };*/

  revalidatePath("/", "layout");
  redirect(
    "/login?successmsg=Por favor, verifique seu email para completar o registro.",
    RedirectType.replace
  );
}

/**
 * @todo CRIAR FUNCAO PARA GERAR NOVA APLICACAO NO BANCO DE DADOS
 *
 * @param {} formData
 */
export async function createAplicacao(formData) {
  const supabase = createClient();

  const data = {};
}

/*export async function criarUsuario(dados) {
  const { data, error } = await supabase
    .from("cliente")
    .insert([clienteData])
    .select();
  if (error) {
    console.log(error.message);
    redirect("/error");
  } else {
    console.log("cliente salvo na tabela com sucesso...");
  }
}*/
