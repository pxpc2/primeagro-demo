"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signIn(formData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return redirect(
      "/login?message=Falha ao autenticar usuário. Por favor, verifique seu email e senha."
    );
  } else {
    console.log(await supabase.auth.getSession());
  }
  revalidatePath("/", "layout");
  return redirect("/user-dashboard");
}
