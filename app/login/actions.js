"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect } from "next/navigation";

export async function signIn(formData) {
  const supabase = createClient();

  const loginData = {
    email: formData.email,
    password: formData.password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    return redirect(
      `/login?message=${
        error.message === "Email not confirmed"
          ? "Por favor, confirme seu email para completar o registro."
          : "Por favor, verifique se os dados de acesso se encontram corretos."
      }`
    );
  }
  revalidatePath("/", "layout");
  return redirect("/user-dashboard");
}

export async function signUp(formData) {
  const supabase = createClient();
  console.log(formData);
  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    redirect("/error?message=" + error.message);
  }

  revalidatePath("/", "layout");
  redirect(
    "/login?successmsg=Por favor, verifique seu email para completar o registro.",
    RedirectType.replace
  );
}
