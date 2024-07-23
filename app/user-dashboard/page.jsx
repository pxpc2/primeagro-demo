import { createClient } from "@/utils/supabase/server";
import UserDashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import ProfileCreationPage from "../../components/profile-creation";
import { getAplicacoes, getDadosEnquadramentoForm } from "./actions";
import { isAdminUser } from "../projeto/actions";

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
  const isAdmin = await isAdminUser();

  return (
    <UserDashboardPage
      cliente={cliente}
      aplicacoes={aps}
      dadosEnquadramento={dadosEnquadramento}
      isAdmin={isAdmin}
    />
  );
}
