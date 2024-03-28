import { createClient } from "@/utils/supabase/server";
import UserDashboardPage from "./dashboard";
import { redirect } from "next/navigation";
import ProfileCreationPage from "./profile-creation";

export default async function UserProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  let { data: cliente, error } = await supabase
    .from("cliente")
    .select()
    .eq("authuser_id", user.id);

  if (cliente[0] === undefined) {
    return <ProfileCreationPage authID={user.id} />;
  }

  return <UserDashboardPage cliente={cliente} />;
}
