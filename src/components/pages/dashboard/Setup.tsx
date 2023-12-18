"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmojiPicker from "@/components/unit/emoji-picker";
import { SubscriptionType } from "@/lib/supabase/supabase.types";
import {
  WorkspaceSchemaType,
  workspaceSchema,
} from "@/lib/validations/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUser } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LogoUpload from "@/assets/images/logo-upload.png";

type Props = {
  user: AuthUser;
  subscription: SubscriptionType | null;
};

const Setup: React.FC<Props> = ({ subscription, user }) => {
  const [selectedEmoji, setSelectedEmoji] = useState("😀");
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WorkspaceSchemaType>({
    mode: "onChange",
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      logo: "",
      name: "",
    },
  });
  const [imageUrl, setImageUrl] = useState<any>(LogoUpload);
  const handleChange = (e: any) => {
    const img = e.target.files[0];
    setImageUrl(URL.createObjectURL(img));
  };

  return (
    <Card className="w-full md:max-w-[800px] lg:max-w-[500px]">
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription className="text-center">
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => {}}>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <div className="mx-auto form-img-upload">
                <Label
                  htmlFor="logo"
                  className={`${
                    isSubmitting || subscription?.status !== "active"
                      ? "cursor-not-allowed bg-gray-200"
                      : "cursor-pointer"
                  }`}
                >
                  <Image
                    src={imageUrl}
                    alt="upload"
                    width={100}
                    height={100}
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      aspectRatio: "1/1",
                    }}
                    className="rounded-full"
                  />
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  placeholder="Workspace Logo"
                  disabled={isSubmitting || subscription?.status !== "active"}
                  className="invisible w-0 h-0"
                  {...register("logo", {
                    onChange: handleChange,
                  })}
                />
              </div>
            </div>
            <div className="flex w-full gap-3">
              <EmojiPicker getValue={(value) => setSelectedEmoji(value)}>
                {selectedEmoji}
              </EmojiPicker>
              <div className="flex flex-col w-full gap-1">
                <Input
                  id="name"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isSubmitting}
                />
                {errors?.name && (
                  <span className="text-red-500">{errors?.name?.message}</span>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Setup;
