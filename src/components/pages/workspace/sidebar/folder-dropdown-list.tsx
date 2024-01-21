"use client";
import { Accordion } from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import CustomTooltip from "@/components/unit/custom-tooltip";
import { useAppState } from "@/lib/providers/state-provider";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { createFolder } from "@/lib/supabase/queries";
import { FolderType } from "@/lib/supabase/supabase.types";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import Dropdown from "./dropdown";

type Props = {
  workspaceFolders: FolderType[] | [];
  workspaceId: string;
};

const FolderDropdownList: React.FC<Props> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch, folderId } = useAppState();
  const [folders, setFolders] = useState<FolderType[] | []>(workspaceFolders);
  const { subscription } = useSupabaseUser();

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceFolders, workspaceId]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
      toast({
        title: "Error",
        variant: "destructive",
        description:
          "You need to subscribe to create more than 3 folders in a workspace.",
      });
      return;
    }
    const newFolder: FolderType = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "Untitled",
      iconId: "📄",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
      updatedAt: new Date().toISOString(),
    };

    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);

    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create the folder",
      });
    } else {
      toast({
        title: "Success",
        description: "Created folder.",
      });
    }
  };

  return (
    <>
      <div className="flex sticky z-20 top-0 bg-background w-full h-10 group/title justify-between items-center pr-4 text-basic-8">
        <span
          className="text-basic-8 
        font-bold 
        text-xs"
        >
          FOLDERS
        </span>
        <CustomTooltip message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="cursor-pointer hover:dark:text-white"
          />
        </CustomTooltip>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || ""]}
        className="pb-20"
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <Dropdown
              key={folder.id}
              title={folder.title}
              listType="folder"
              id={folder.id}
              iconId={folder.iconId}
            />
          ))}
      </Accordion>
    </>
  );
};

export default FolderDropdownList;
