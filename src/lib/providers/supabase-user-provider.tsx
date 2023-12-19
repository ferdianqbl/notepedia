"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SubscriptionType } from "../supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthUser } from "@supabase/supabase-js";
import { getUserSubscriptionStatus } from "../supabase/queries";
import { useToast } from "@/components/ui/use-toast";

type SupabaseUserContextType = {
  user: AuthUser | null;
  subscription: SubscriptionType | null;
};

const SupabaseUserContext = createContext<SupabaseUserContextType>({
  user: null,
  subscription: null,
});

export const useSupabaseUser = () => {
  const context = useContext(SupabaseUserContext);
  if (!context)
    throw new Error(
      "useSupabaseUser must be used within a SupabaseUserProvider"
    );

  return context;
};

type Props = {
  children: React.ReactNode;
};

const SupabaseUserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionType | null>(
    null
  );
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error } = await getUserSubscriptionStatus(user.id);

        if (error)
          toast({
            title: "Unexpected Error",
            description: "Oppse! Something went wrong. Please try again later.",
          });
        if (data) setSubscription(data);
      }
    };

    getUser();
  }, [supabase, toast]);

  return (
    <SupabaseUserContext.Provider value={{ user, subscription }}>
      {children}
    </SupabaseUserContext.Provider>
  );
};

export default SupabaseUserProvider;
