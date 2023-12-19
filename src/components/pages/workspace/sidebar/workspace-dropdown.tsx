"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { WorkspaceType } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";
import SelectedWorkspace from "./selected-workspace";

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
  const [selectedOption, setSelectedOption] = useState(defaultValue);
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

  const selectHandler = (option: WorkspaceType) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <span onClick={() => setIsOpen(!open)}>
        {selectedOption ? (
          <SelectedWorkspace
            workspace={selectedOption}
            // onClick={selectHandler}
          />
        ) : (
          "Select a Workspace"
        )}
      </span>
      {isOpen && (
        <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
          <div className="flex flex-col rounded-md">
            <div className="!p-2">
              {!!privateWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Private</p>
                  <hr></hr>
                  {privateWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
              {!!sharedWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Shared</p>
                  <hr />
                  {sharedWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
              {!!collaboratingWorkspaces.length && (
                <>
                  <p className="text-muted-foreground">Collaborating</p>
                  <hr />
                  {collaboratingWorkspaces.map((option) => (
                    <SelectedWorkspace
                      key={option.id}
                      workspace={option}
                      onClick={selectHandler}
                    />
                  ))}
                </>
              )}
            </div>
            {/* <CustomDialogTrigger
              header="Create A Workspace"
              content={<WorkspaceCreator />}
              description="Workspaces give you the power to collaborate with others. You can change your workspace privacy settings after creating the workspace too."
            >
              <div className="flex items-center justify-center w-full gap-2 p-2 transition-all hover:bg-muted">
                <article className="flex items-center justify-center w-4 h-4 rounded-full text-slate-500 bg-slate-800">
                  +
                </article>
                Create workspace
              </div>
            </CustomDialogTrigger> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDropdown;
