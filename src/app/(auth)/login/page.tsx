"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Loader from "@/components/unit/loader";
import { LoginSchema, type LoginSchemaType } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm<LoginSchemaType>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginSchemaType) => {};

  return (
    <Form {...form}>
      <form
        onChange={() => submitError && setSubmitError("")}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center gap-8 px-6"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <Link
            href={"/"}
            className="rounded-full p-[1px] text-2xl dark:bg-gradient-to-r dark:from-brand-secondaryBlue dark:to-brand-secondaryPurple w-fit"
          >
            <p className="px-3 py-1 rounded-full dark:bg-black">Notepedia</p>
          </Link>
          <FormDescription className="">
            An all-In-One Collaboration and Productivity Platform
          </FormDescription>
        </div>

        <div className="flex flex-col items-center justify-center w-full gap-3">
          {submitError && <FormMessage>{submitError}</FormMessage>}
          <FormField
            name="email"
            disabled={isSubmitting}
            control={form.control}
            render={(field) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            disabled={isSubmitting}
            control={form.control}
            render={(field) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          size={"default"}
          className=""
        >
          {isSubmitting ? <Loader /> : "Login"}
        </Button>
      </form>
    </Form>
  );
};

export default Page;
