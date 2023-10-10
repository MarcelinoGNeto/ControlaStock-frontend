import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface IMessage {
    title: string;
    description: string;
}

export function AlertSuccess({title, description}: IMessage) {
  return (
    <Alert className="bg-green-600">
      <RocketIcon className="h-5 w-5" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        {description}
      </AlertDescription>
    </Alert>
  )
}
