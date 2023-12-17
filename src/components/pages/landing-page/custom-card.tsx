import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ComponentProps, FC, ReactNode } from "react";

type Props = ComponentProps<typeof Card> & {
  header?: ReactNode;
  cardContent?: ReactNode;
  footer?: ReactNode;
};

const CustomCard: FC<Props> = ({
  cardContent,
  footer,
  header,
  className,
  ...props
}) => {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>{header}</CardHeader>
      <CardContent>{cardContent}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
};

export default CustomCard;
