"use server";

import { createClient } from "@/utils/supabase/server";

export default async function userHasFilledProfileBasicInfo(id) {
  const supabase = createClient();
  console.log("id que passei: " + id);

  let { data: cliente, error } = await supabase
    .from("cliente")
    .select("authuser_id");

  console.log("cliente log: " + cliente);
}
