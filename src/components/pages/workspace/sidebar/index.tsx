import {
  getCollaboratingWorkspaces,
  getFolders,
  getPrivateWorkspaces,
  getSharedWorkspaces,
  getUserSubscriptionStatus,
} from "@/lib/supabase/queries";
import { cn } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import WorkspaceDropdown from "./workspace-dropdown";
import PlanUsage from "./plan-usage";

type Props = {
  params: { workspaceId: string };
  className?: string;
};

const Sidebar: React.FC<Props> = async ({ params, className }) => {
  const supabase = createServerComponentClient({ cookies });

  // user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  // subscription and folders
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);
  const { data: folderData, error: folderError } = await getFolders(
    params.workspaceId
  );

  if (subscriptionError || folderError) redirect("/dashboard");

  // get All Workspaces
  const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);

  return (
    <aside
      className={cn(
        "hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 justify-between",
        className
      )}
    >
      <WorkspaceDropdown
        defaultValue={[
          ...privateWorkspaces.data,
          ...collaboratingWorkspaces.data,
          ...sharedWorkspaces.data,
        ].find((workspace) => workspace.id === params.workspaceId)}
        privateWorkspaces={privateWorkspaces.data}
        collaboratingWorkspaces={collaboratingWorkspaces.data}
        sharedWorkspaces={sharedWorkspaces.data}
      />
      <PlanUsage
        foldersLength={folderData?.length || 0}
        subscription={subscriptionData}
      />
    </aside>
  );
};

export default Sidebar;
