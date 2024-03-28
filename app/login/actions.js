"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData) {
  const supabase = createClient();

  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    return redirect(
      "/login?message=Falha ao autenticar usuário. Por favor, verifique seu email e senha."
    );
  }
  revalidatePath("/", "layout");
  return redirect("/user-dashboard");
}

/**
 *@todo FALTA ADICIONAR MENSAGEM DE AVISO PARA VERIFICAR O EMAIL...
 * @param {*} formData é para ter mais parametros do que o form de login
 * é para criar um registro novo na tabela "clientes" apontando para o userID.
 */
export async function signUp(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    /*redirect(
      "/login?message=Falha ao cadastrar usuário. Por favor, tente novamente ou entre em contato."
    );*/
    redirect("/error");
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
  return true;
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
