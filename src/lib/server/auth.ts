"use server";

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { LoginSchemaType } from "../validations/auth";
import { cookies } from "next/headers";
export async function login({ email, password }: LoginSchemaType) {
  try {
    const client = createRouteHandlerClient({ cookies });
    const res = await client.auth.signInWithPassword({
      email,
      password,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}
