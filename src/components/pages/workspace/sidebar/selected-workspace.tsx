"use client";
import { WorkspaceType } from "@/lib/supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Logo from "@/assets/images/logo-upload.png";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  workspace: WorkspaceType;
  onClick?: (option: WorkspaceType) => void;
};

const SelectedWorkspace: React.FC<Props> = ({ workspace, onClick }) => {
  const supabase = createClientComponentClient();
  const [logo, setLogo] = useState<string | StaticImageData>(Logo);

  useEffect(() => {
    if (workspace.logo) {
      const path = supabase.storage
        .from("workspace-logos")
        .getPublicUrl(workspace.logo)?.data.publicUrl;
      setLogo(path);
    }
  }, [workspace, supabase]);

  const clickHandler = () => onClick && onClick(workspace);

  return (
    <Link
      href={`/dashboard/${workspace.id}`}
      onClick={clickHandler}
      className="flex flex-row items-center justify-center gap-4 p-2 my-2 transition-all rounded-md cursor-pointer hover:bg-muted"
    >
      <Image
        src={logo}
        alt="workspace logo"
        width={26}
        height={26}
        className="object-cover object-center rounded-full"
      />
      <div className="flex flex-col">
        <p
          className="text-base 
        w-[170px] 
        overflow-hidden 
        overflow-ellipsis 
        whitespace-nowrap"
        >
          {workspace.title}
        </p>
      </div>
    </Link>
  );
};

export default SelectedWorkspace;
