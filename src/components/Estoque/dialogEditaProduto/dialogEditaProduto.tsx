import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEditaProduto } from "./formEditaProduto";
import { useState } from "react"

interface DialogEditaProdutoProps {
  id: string;
}

export function DialogEditaProduto(props: DialogEditaProdutoProps) {
  const { id } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Dialog>
      <DialogTrigger onClick={openModal}
        className="
      inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
      w-44 mr-4
      bg-primary text-primary-foreground shadow hover:bg-primary/90
      h-10 rounded-md px-8
      "
      >
        Editar
      </DialogTrigger>
      {isModalOpen && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preencha as informações abaixo</DialogTitle>
          <FormEditaProduto id={id} closeModal={closeModal} />
        </DialogHeader>
        
      </DialogContent>

      )}
    </Dialog>
  );
}
