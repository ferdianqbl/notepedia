import { Accordion } from "@/components/ui/accordion";
import { useAppState } from "@/lib/providers/state-provider";
import { FolderType } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";

type Props = {
  workspaceFolders: FolderType[] | [];
  workspaceId: string;
};

const FolderDropdownList: React.FC<Props> = ({
  workspaceFolders,
  workspaceId,
}) => {
  const { state, dispatch } = useAppState();
  const [folders, setFolders] = useState<FolderType[] | []>(workspaceFolders);

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
  }, [workspaceFolders, workspaceId, state]);

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <div className="flex sticky z-20 top-0 bg-background w-full h-10 group/title justify-between items-center pr-4 text-Neutrals/neutrals-8">
        <span
          className="text-Neutrals-8 
        font-bold 
        text-xs"
        >
          FOLDERS
        </span>
        {/* <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="group-hover/title:inline-block
            hidden 
            cursor-pointer
            hover:dark:text-white
          "
          />
        </TooltipComponent> */}
      </div>
      {/* <Accordion
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
      </Accordion> */}
    </>
  );
};

export default FolderDropdownList;
