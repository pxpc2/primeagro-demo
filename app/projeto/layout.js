import { createClient } from "@/utils/supabase/server";
import Head from "next/head";
import { redirect } from "next/navigation";

export const metadata = {
  title: "ConfidensAgro - Projeto",
  description: "Consultoria e Crédito Rural",
};

export default async function Layout({ children }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  /**
   * @TODO verificar se usuário já está em etapa de projeto
   */
  if (!user) {
    return redirect("/login");
  }
  return (
    <>
      <main className="w-full h-full">{children}</main>
    </>
  );
}
