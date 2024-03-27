import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const origin = searchParams.origin;

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/user-dashboard`);
}
