"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { WorkspaceType } from "@/lib/supabase/supabase.types";
import { useEffect, useState } from "react";

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
  }, [privateWorkspaces, sharedWorkspaces, collaboratingWorkspaces]);
  return <div>WorkspaceDropdown</div>;
};

export default WorkspaceDropdown;
