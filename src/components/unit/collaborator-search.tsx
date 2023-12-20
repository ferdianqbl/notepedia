"use client";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { UserType } from "@/lib/supabase/supabase.types";
import { useEffect, useRef, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { getUsersFromSearch } from "@/lib/supabase/queries";

type Props = {
  existingCollaborators: UserType[] | [];
  getCollaborator: (collaborator: UserType) => void;
  children: React.ReactNode;
};

const CollaboratorSearch: React.FC<Props> = ({
  children,
  existingCollaborators,
  getCollaborator,
}) => {
  const { user } = useSupabaseUser();
  const [results, setResults] = useState<UserType[] | []>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const users = await getUsersFromSearch(e.target.value);
      setResults(users);
    }, 450);
  };

  const addCollaborator = (userCollaborator: UserType) => {
    getCollaborator(userCollaborator);
    setResults(
      results.filter(
        (result) => result.id !== userCollaborator.id && result.id !== user?.id
      )
    );
  };

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Search for a collaborator</SheetTitle>
          <SheetDescription>
            <p className="text-sm text-muted">
              You can also remove collaborators after adding the settings tab.
            </p>
          </SheetDescription>
        </SheetHeader>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Search />
          <Input
            name="name"
            type="text"
            placeholder="Email"
            className="p-2 dark:bg-background"
            onChange={onChangeHandler}
          />
        </div>
        <ScrollArea className="w-full mt-6 overflow-auto rounded-md">
          {results
            ?.filter(
              (result) =>
                !existingCollaborators.some(
                  (collaborator) => collaborator.id === result.id
                )
            )
            .filter((result) => result.id !== user?.id)
            .map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/avatars/7.png" />
                    <AvatarFallback>CP</AvatarFallback>
                  </Avatar>
                  <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => addCollaborator(user)}
                >
                  Add
                </Button>
              </div>
            ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default CollaboratorSearch;
