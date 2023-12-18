"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthUser } from "@supabase/supabase-js";

type Props = {
  user: AuthUser;
  subscription: {} | null;
};

const Setup: React.FC<Props> = ({ subscription, user }) => {
  return (
    <Card className="max-w-[800px]">
      <CardHeader className="flex flex-col gap-2 items-center justify-center">
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription className="">
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => {}}></form>
      </CardContent>
    </Card>
  );
};

export default Setup;
