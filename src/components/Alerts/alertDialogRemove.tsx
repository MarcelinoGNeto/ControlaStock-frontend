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
    title?: string;
    contentTitle?: string;
    contentDescription?: string;
  }
  
  export function AlertDialogRemove({removeProduct, title, contentTitle, contentDescription}: IRemove) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="destructive"
            className="inline-flex items-center justify-center w-auto mx-2"
            >
            { title }
            <TrashIcon className="w-5 h-5"/>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{contentTitle ? contentTitle : "Você tem certeza que deseja remover o item?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {contentDescription ? contentDescription : `Ao clicar em "Sim" o item será removido permanentemente, mas poderá acrescentar novos.`}
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
  