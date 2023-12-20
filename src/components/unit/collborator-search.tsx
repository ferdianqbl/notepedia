import { UserType } from "@/lib/supabase/supabase.types";

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
  return <div>CollaboratorSearch</div>;
};

export default CollaboratorSearch;
