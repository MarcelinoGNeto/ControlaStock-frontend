import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { FormProduto } from "./formProduto";
import { useState } from "react"


export function DialogButton() {
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
        <Plus className="w-4 h-4 mr-2" />
        Entrada
      </DialogTrigger>
      {isModalOpen && (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Preencha as informações abaixo</DialogTitle>
          <FormProduto closeModal={closeModal} />
        </DialogHeader>
        
      </DialogContent>

      )}
    </Dialog>
  );
}
