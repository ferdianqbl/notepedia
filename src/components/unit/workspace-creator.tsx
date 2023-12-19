"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { UserType } from "@/lib/supabase/supabase.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Label } from "../ui/label";

const WorkspaceCreator = () => {
  const { user } = useSupabaseUser();
  const router = useRouter();
  const [permissions, setPermissions] = useState<string>("private");
  const [title, setTitle] = useState<string>("");
  const [collaborators, setCollaborators] = useState<UserType[]>([]);

  const addCollaborator = (user: UserType) =>
    setCollaborators([...collaborators, user]);

  const removeCollaborator = (user: UserType) =>
    setCollaborators(
      collaborators.filter((collaborator) => collaborator.id !== user.id)
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        <Label htmlFor="name" className="text-sm text-muted-foreground">
          Name
        </Label>
      </div>
    </div>
  );
};

export default WorkspaceCreator;
