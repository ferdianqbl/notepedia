import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().describe("Email").email({ message: "Invalid Email" }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
