"use server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { LoginSchemaType, RegisterSchemaType } from "../validations/auth";
import { cookies } from "next/headers";

export async function login({ email, password }: LoginSchemaType) {
  const client = createRouteHandlerClient({ cookies });
  const res = await client.auth.signInWithPassword({
    email,
    password,
  });
  return res;
}

export async function signUp({
  email,
  password,
  confirmPassword,
}: RegisterSchemaType) {
  const client = createRouteHandlerClient({ cookies });
  const { data } = await client.from("users").select("*").eq("email", email);

  if (data?.length! > 0)
    return {
      error: {
        message: "Email already exists",
        data,
      },
    };

  const isPasswordMatch = password === confirmPassword;
  if (!isPasswordMatch)
    return {
      error: {
        message: "Password does not match",
      },
    };

  const res = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  return res;
}
