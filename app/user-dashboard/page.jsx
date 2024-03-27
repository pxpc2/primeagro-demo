import { createClient } from "@/utils/supabase/server";
import UserDashboardPage from "./dashboard";
import { redirect } from "next/navigation";

export default async function UserProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return <UserDashboardPage />;
}
