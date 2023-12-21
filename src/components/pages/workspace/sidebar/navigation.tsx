import { cn } from "@/lib/utils";
import { Home, Settings, Trash } from "lucide-react";
import Link from "next/link";

type Props = {
  workspaceId: string;
  className?: React.ReactNode;
};

const Navigation: React.FC<Props> = ({ workspaceId, className }) => {
  return (
    <nav className={cn("", className)}>
      <ul className="flex flex-col gap-2">
        <li>
          <Link
            className="hover:text-primary-blue-800 flex items-center text-basic-7 transition-all gap-2"
            href={`/dashboard/${workspaceId}`}
          >
            <Home className="w-5 h-5" />
            <span>My Workspace</span>
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-primary-blue-800 flex items-center text-basic-7 transition-all gap-2"
            href={`/dashboard/${workspaceId}`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-primary-blue-800 flex items-center text-basic-7 transition-all gap-2"
            href={`/dashboard/${workspaceId}`}
          >
            <Trash className="w-5 h-5" />
            <span>Trash</span>
          </Link>
        </li>

        {/* <Settings>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
            cursor-pointer
          "
          >
            <CypressSettingsIcon />
            <span>Settings</span>
          </li>
        </Settings> */}

        {/* <Trash>
          <li
            className="group/native
            flex
            text-Neutrals/neutrals-7
            transition-all
            gap-2
          "
          >
            <CypressTrashIcon />
            <span>Trash</span>
          </li>
        </Trash> */}
      </ul>
    </nav>
  );
};

export default Navigation;
