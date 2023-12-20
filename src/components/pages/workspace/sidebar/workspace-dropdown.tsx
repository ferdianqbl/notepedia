"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { WorkspaceType } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";
import CustomDialogTrigger from "@/components/unit/custom-dialog-trigger";
import WorkspaceCreator from "@/components/unit/workspace-creator";
import { PlusIcon } from "lucide-react";

type Props = {
  defaultValue: WorkspaceType | undefined;
  privateWorkspaces: WorkspaceType[] | [];
  sharedWorkspaces: WorkspaceType[] | [];
  collaboratingWorkspaces: WorkspaceType[] | [];
};

const WorkspaceDropdown: React.FC<Props> = ({
  defaultValue,
  privateWorkspaces,
  sharedWorkspaces,
  collaboratingWorkspaces,
}) => {
  const { state, dispatch } = useAppState();
  const [selectedWorkspace, setSelectedWorkspace] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!state.workspaces.length) {
      dispatch({
        type: "SET_WORKSPACES",
        payload: {
          workspaces: [
            ...privateWorkspaces,
            ...sharedWorkspaces,
            ...collaboratingWorkspaces,
          ].map((workspace) => ({
            ...workspace,
            folders: [],
          })),
        },
      });
    }
  }, [
    privateWorkspaces,
    sharedWorkspaces,
    collaboratingWorkspaces,
    state,
    dispatch,
  ]);

  const selectHandler = (workspace: WorkspaceType) => {
    setSelectedWorkspace(workspace);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full text-left">
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`block w-full${isOpen && " mb-3"}`}
      >
        {selectedWorkspace ? (
          <SelectedWorkspace
            workspace={selectedWorkspace}
            onClick={selectHandler}
          />
        ) : (
          "Select a Workspace"
        )}
      </span>
      {isOpen && (
        <div className="origin-top-right absolute rounded-md shadow-md z-50 max-h-[190px] bg-black/10 backdrop-blur-lg overflow-auto group border-[1px] border-muted w-full">
          <div className="flex flex-col gap-3 rounded-md">
            <div className="px-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="pt-2 text-sm text-muted-foreground">Private</p>
                  <hr className="mb-2" />
                  {privateWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="pt-2 text-sm text-muted-foreground">Shared</p>
                  <hr className="mb-2" />
                  {sharedWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className="pt-2 text-sm text-muted-foreground">
                    Collaborating
                  </p>
                  <hr className="mb-2" />
                  {collaboratingWorkspaces.map((workspace) => (
                    <SelectedWorkspace
                      key={workspace.id}
                      workspace={workspace}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
            </div>
            <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div className="flex items-center justify-center border-t-[1px] w-full gap-2 p-2 transition-all hover:bg-muted">
                <article className="flex items-center justify-center w-4 h-4 rounded-full text-slate-500 bg-slate-800">
                  <PlusIcon size={12} />
                </article>
                Create workspace
              </div>
            </CustomDialogTrigger>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
