"use client";
import { Progress } from "@/components/ui/progress";
import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-provider";
import { SubscriptionType } from "@/lib/supabase/supabase.types";
import { Gem } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  foldersLength: number;
  subscription: SubscriptionType | null;
};

const PlanUsage: React.FC<Props> = ({ foldersLength, subscription }) => {
  const { workspaceId, state } = useAppState();
  const [usagePercentage, setUsagePercentage] = useState<number>(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    )?.folders.length;
    if (stateFoldersLength === undefined) return;
    setUsagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);

  return (
    <article className="flex flex-col items-start gap-3">
      {subscription?.status !== "active" && (
        <div className="w-full flex items-center justify-between text-muted-foreground">
          <p>
            <Gem className="inline-block text-primary w-5 h-5" /> Free Plan
          </p>
          <small>{usagePercentage.toFixed(0)}% / 100%</small>
        </div>
      )}
      {subscription?.status !== "active" && (
        <Progress className="h-1 w-full" value={usagePercentage} />
      )}
    </article>
  );
};

export default PlanUsage;
