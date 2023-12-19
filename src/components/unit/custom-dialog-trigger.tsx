import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  header?: string;
  content?: React.ReactNode;
  description?: string;
  footer?: string;
  className?: string;
};

const CustomDialogTrigger: React.FC<Props> = ({
  children,
  content,
  description,
  header,
  className,
  footer,
}) => {
  return (
    <Dialog>
      <DialogTrigger className={cn("text-sm", className)}>
        {children}
      </DialogTrigger>
      <DialogContent className="h-screen block sm:h-[440px] overflow-auto w-full">
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialogTrigger;
