import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z
    .string()
    .describe("Password")
    .min(6, "Password at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().describe("Email").email({ message: "Invalid Email" }),
    password: z
      .string()
      .describe("Password")
      .min(6, "Password at least 6 characters"),
    confirmPassword: z
      .string()
      .describe("Password Confirmation")
      .min(6, "Password at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
