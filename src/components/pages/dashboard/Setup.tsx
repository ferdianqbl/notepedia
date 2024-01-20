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
import { SubscriptionType, WorkspaceType } from "@/lib/supabase/supabase.types";
import {
  WorkspaceSchemaType,
  workspaceSchema,
} from "@/lib/validations/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthUser } from "@supabase/supabase-js";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LogoUpload from "@/assets/images/logo-upload.png";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { v4 } from "uuid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/supabase/queries";
import { useAppState } from "@/lib/providers/state-provider";

type Props = {
  user: AuthUser;
  subscription: SubscriptionType | null;
};

const Setup: React.FC<Props> = ({ subscription, user }) => {
  const supabase = createClientComponentClient();
  const { dispatch } = useAppState();
  const router = useRouter();
  const { toast } = useToast();
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

  const onSubmit: SubmitHandler<WorkspaceSchemaType> = async (value) => {
    const file = value.logo?.[0];
    let filePath = null;
    const workspaceUUID = v4();

    if (file) {
      try {
        const { data, error } = await supabase.storage
          .from("workspace-logos")
          .upload(`workspaceLogo.${workspaceUUID}`, file, {
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error(`${error}`);
        filePath = data.path;
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error! Could not upload your workspace logo",
        });
      }
    }
    try {
      const newWorkspace: WorkspaceType = {
        data: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        iconId: selectedEmoji,
        id: workspaceUUID,
        inTrash: "",
        title: value.name,
        workspaceOwner: user.id,
        logo: filePath || null,
        bannerUrl: "",
      };
      // console.log({ newWorkspace });
      const { data, error: createError } = await createWorkspace(newWorkspace);
      if (createError) {
        throw new Error(`${{ createError }}`);
      }
      dispatch({
        type: "ADD_WORKSPACE",
        payload: { ...newWorkspace, folders: [] },
      });

      toast({
        title: "Workspace Created",
        description: `${newWorkspace.title} has been created successfully.`,
      });

      router.replace(`/dashboard/${newWorkspace.id}`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Could not create your workspace",
        description:
          "Oops! Something went wrong, and we couldn't create your workspace. Try again or come back later.",
      });
    } finally {
      reset();
      setImageUrl(LogoUpload);
    }
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col w-full gap-1">
              <div className="mx-auto">
                <Label
                  htmlFor="logo"
                  // className={`${
                  //   isSubmitting || subscription?.status !== "active"
                  //     ? "cursor-not-allowed bg-gray-200"
                  //     : "cursor-pointer"
                  // }`}
                  className="cursor-pointer"
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
                    className="mx-auto rounded-full"
                  />
                </Label>
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  placeholder="Workspace Logo"
                  // disabled={isSubmitting || subscription?.status !== "active"}
                  className="invisible w-0 h-0"
                  {...register("logo", {
                    onChange: handleChange,
                  })}
                />
                {subscription?.status !== "active" && (
                  <small className="block text-muted-foreground">
                    To customize your workspace, you need to be on a Pro Plan
                  </small>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <div className="flex items-center w-full gap-3">
                <EmojiPicker getValue={(value) => setSelectedEmoji(value)}>
                  {selectedEmoji}
                </EmojiPicker>
                <Input
                  id="name"
                  type="text"
                  placeholder="Workspace Name"
                  disabled={isSubmitting}
                  {...register("name")}
                />
              </div>
              {errors?.name && (
                <small className="text-red-500">{errors?.name?.message}</small>
              )}
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              size={"sm"}
              className="ml-auto text-sm"
            >
              {!isSubmitting ? "Create Workspace" : <Loader />}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Setup;
