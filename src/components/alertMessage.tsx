import { RocketIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

interface AlertMessageProps {
  title: string;
  msg: string;
}

export function AlertMessage({ title, msg }: AlertMessageProps) {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{msg}</AlertDescription>
    </Alert>
  );
}
