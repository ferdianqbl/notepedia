"use client";
import { useAppState } from "@/lib/providers/state-provider";
import { SubscriptionType } from "@/lib/supabase/supabase.types";

type Props = {
  foldersLength: number;
  subscription: SubscriptionType | null;
};

const PlanUsage: React.FC<Props> = ({ foldersLength, subscription }) => {
  const { workspaceId, state } = useAppState();
  return <div>PlanUsage</div>;
};

export default PlanUsage;
