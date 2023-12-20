"use client";
import { WorkspaceType } from "@/lib/supabase/supabase.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Logo from "@/assets/images/logo-upload.png";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
  workspace: WorkspaceType;
  onClick?: (workspace: WorkspaceType) => void;
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
      className="flex flex-row items-center w-full gap-2 px-4 py-2 transition-all duration-500 rounded-md cursor-pointer hover:bg-muted"
    >
      <Image
        src={logo}
        alt="workspace logo"
        width={26}
        height={26}
        className="object-cover object-center rounded-full"
      />

      <p className="overflow-hidden text-sm overflow-ellipsis whitespace-nowrap">
        {workspace.title}
      </p>
    </Link>
  );
};

export default SelectedWorkspace;
