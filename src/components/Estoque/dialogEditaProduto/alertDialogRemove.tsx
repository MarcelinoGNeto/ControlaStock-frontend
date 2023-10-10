import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { TrashIcon } from "@radix-ui/react-icons";

  interface IRemove {
    removeProduct: any;
  }
  
  export function AlertDialogRemove({removeProduct}: IRemove) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive"
            className="inline-flex items-center justify-center w-36 h-10"
            >
            Remover
            <TrashIcon className="w-5 h-5 m-2"/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza que deseja remover o produto?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao clicar em "Sim" o produto será removido permanentemente, mas poderá acrescentar novos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Não</AlertDialogCancel>
            <AlertDialogAction onClick={removeProduct}>Sim</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  