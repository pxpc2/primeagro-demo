import { createClient } from "@/utils/supabase/server";
import UserDashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import ProfileCreationPage from "../../components/profile-creation";
import {
  getAplicacoes,
  getDadosEnquadramentoForm,
  getUserRole,
} from "./actions";

export default async function UserProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let { data: cliente, error } = await supabase
    .from("clientes")
    .select()
    .eq("authuser_id", user.id);

  if (cliente[0] === undefined) return <ProfileCreationPage authID={user.id} />;

  const aps = await getAplicacoes();
  const dadosEnquadramento = await getDadosEnquadramentoForm();

  //const userRole = await getUserRole();
  // invés de pegar userRole, a gente tem que simplesmente só permitir as coisas de acordo com as policies

  //ou seja, na userdashboardpage, a gente mostra tudo... mas só vai aparecer oq o seu user for permitido.

  //console.log(userRole);

  return (
    <UserDashboardPage
      cliente={cliente}
      aplicacoes={aps}
      dadosEnquadramento={dadosEnquadramento}
    />
  );
}
