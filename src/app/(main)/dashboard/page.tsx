import Setup from "@/components/pages/dashboard/Setup";
import db from "@/lib/supabase/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getDataUser = async (id: string) => {
  const workspace = await db.query.workspaces.findFirst({
    where: (workspace, { eq }) => eq(workspace.workspaceOwner, id),
  });

  if (!workspace) return;
  return workspace;
};

const Page = async () => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) return;

  const workspace = await getDataUser(user.id);
  if (!workspace)
    return (
      <div className="flex items-center w-screen min-h-screen justify-center">
        <Setup user={user} subscription={{}} />
      </div>
    );

  redirect(`/dashboard/${workspace.id}`);
};

export default Page;
