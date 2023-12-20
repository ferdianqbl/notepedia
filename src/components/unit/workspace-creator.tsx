"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { UserType, WorkspaceType } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lock, Plus, Share } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { v4 } from "uuid";
import { addCollaborators, createWorkspace } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import CollaboratorSearch from "./collaborator-search";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permissions, setPermissions] = useState<string>("private");
  const [title, setTitle] = useState<string>("");
  const [collaborators, setCollaborators] = useState<UserType[]>([]);

  const addCollaborator = (user: UserType) =>
    setCollaborators([...collaborators, user]);

  const removeCollaborator = (user: UserType) =>
    setCollaborators(
      collaborators.filter((collaborator) => collaborator.id !== user.id)
    );

  const createItem = async () => {
    setIsLoading(true);
    const id = v4();
    if (user?.id) {
      const newWorkspace: WorkspaceType = {
        id,
        data: null,
        title,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        workspaceOwner: user.id,
        iconId: "😀",
        inTrash: "",
        logo: "",
        bannerUrl: "",
      };
      if (permissions === "shared") await addCollaborators(collaborators, id);
      await createWorkspace(newWorkspace);
      toast({ title: "Success", description: "Created the workspace" });
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center justify-center w-full gap-4 mt-4">
        <Input
          type="text"
          placeholder="Workspace Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Select
          onValueChange={(val) => setPermissions(val)}
          defaultValue={permissions}
        >
          <SelectTrigger className="w-full h-fit">
            <SelectValue placeholder="Select a permission" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="">
              <SelectItem value="private">
                <div className="flex items-center justify-center gap-4 p-2 ">
                  <Lock />
                  <article className="flex flex-col text-left">
                    <span>Private</span>
                    <p>
                      Your workspace is private to you. You can choose to share
                      it later.
                    </p>
                  </article>
                </div>
              </SelectItem>
              <SelectItem value="shared">
                <div className="flex items-center justify-center gap-4 p-2">
                  <Share />
                  <article className="flex flex-col text-left">
                    <span>Shared</span>
                    <span>You can invite collaborators.</span>
                  </article>
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {permissions === "shared" && (
          <div className="flex flex-col items-start w-full gap-2">
            <CollaboratorSearch
              existingCollaborators={collaborators}
              getCollaborator={(user) => {
                addCollaborator(user);
              }}
            >
              <Button type="button" className="mt-4 text-sm">
                <Plus />
                Add Collaborators
              </Button>
            </CollaboratorSearch>
            <div className="w-full">
              <span className="text-sm text-muted-foreground">
                {collaborators.length || ""} Collaborators
              </span>
              <ScrollArea
                className="
              h-[200px]
              overflow-y-auto
              rounded-md
              border
              border-muted-foreground/20"
              >
                {collaborators.length ? (
                  collaborators.map((c) => (
                    <div
                      className="flex items-center justify-center w-full gap-4 p-4"
                      key={c.id}
                    >
                      <div className="flex items-center w-full gap-4">
                        <Avatar>
                          <AvatarImage src="/avatars/7.png" />
                          <AvatarFallback>PJ</AvatarFallback>
                        </Avatar>
                        <div className="gap-2 overflow-hidden text-sm text-muted-foreground overflow-ellipsis ">
                          {c.email}
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        onClick={() => removeCollaborator(c)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center ">
                    <span className="text-sm text-muted-foreground">
                      You have no collaborators
                    </span>
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
        )}

        <Button
          type="button"
          disabled={
            !title ||
            (permissions === "shared" && collaborators.length === 0) ||
            isLoading
          }
          variant={"secondary"}
          className="w-full"
          onClick={createItem}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceCreator;
