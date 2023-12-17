import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const reqUrl = new URL(req.url);
  const code = reqUrl.searchParams.get("code");

  if (code) {
    const supabaseClient = createRouteHandlerClient({ cookies });
    await supabaseClient.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(`${reqUrl.origin}/dashboard`);
}
