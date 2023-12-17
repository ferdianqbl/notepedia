"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  RegisterSchema,
  type RegisterSchemaType,
} from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { Loader, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [submitError, setSubmitError] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const form = useForm<RegisterSchemaType>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const codeExchangeError = useMemo(() => {
    if (!searchParams) return "";
    return searchParams.get("error_description");
  }, [searchParams]);

  const confirmationAndErrorStyles = useMemo(
    () =>
      clsx("bg-primary", {
        "bg-red-500/10": codeExchangeError,
        "border-red-500/50": codeExchangeError,
        "text-red-700": codeExchangeError,
      }),
    [codeExchangeError]
  );

  const onSubmit = async (data: RegisterSchemaType) => {
    // const res = await login(data);
    // if (res?.error) {
    //   reset();
    //   setSubmitError(res.error.message.toString());
    // } else console.log(res);
  };

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

        {!confirmation && !codeExchangeError && (
          <>
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
                        {...register("email")}
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
                        {...register("password")}
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
              <FormField
                name="confirmPassword"
                disabled={isSubmitting}
                control={form.control}
                render={(field) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        {...register("confirmPassword")}
                        type="password"
                        id="confirmPassword"
                        placeholder="Password Confirmation"
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
              {isSubmitting ? <Loader /> : "Create Account"}
            </Button>
          </>
        )}

        {submitError && <FormMessage>{submitError}</FormMessage>}
        <span className="">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login
          </Link>
        </span>
        {(confirmation || codeExchangeError) && (
          <>
            <Alert className={confirmationAndErrorStyles}>
              {!codeExchangeError && <MailCheck className="w-4 h-4" />}
              <AlertTitle>
                {codeExchangeError ? "Invalid Link" : "Check your email."}
              </AlertTitle>
              <AlertDescription>
                {codeExchangeError || "An email confirmation has been sent."}
              </AlertDescription>
            </Alert>
          </>
        )}
      </form>
    </Form>
  );
};

export default Page;
